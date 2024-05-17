import { OrganizationDto } from "@/app/demo/types/OrganizationDto";
import {
  ArrowDownOnSquareStackIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { useGraphListener } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { MemoizedFunction } from "@/graph-tools/types/types";
import { AddNodesParams } from "@/graph-tools/flow-node-editing/buttons/useAddNodes";
import { usePopoverFix } from "@/app/demo/react-flow/components/nodes/usePopoverFix";

const undefinedAddNodes = {
  memoizedFunction: () => {
    throw Error("Add nodes function has not been defined.");
  },
};

function OrganizationNode({
  data,
  isConnectable,
  xPos,
  yPos,
}: NodeProps<OrganizationDto>) {
  const {
    currentState: { memoizedFunction },
  } = useGraphListener(
    GraphSelectiveContextKeys.addNodes,
    `node:${data.id}`,
    undefinedAddNodes as MemoizedFunction<AddNodesParams, void>,
  );
  const fixProps = usePopoverFix();

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#0000cc" }}
        onConnect={(params) => console.log(params)}
        isConnectable={isConnectable}
      />
      <div className="border border-black p-2 rounded-md bg-white flex flex-col relative gap-1">
        <div className={"flex justify-between items-center gap-2"}>
          {data.name}
          <Popover
            {...fixProps}
            placement={"right"}
            triggerScaleOnOpen
            updatePositionDeps={[xPos, yPos]}
            triggerType={"menu"}
          >
            <PopoverTrigger>
              <Button size={"sm"} className={"p-1"} isIconOnly>
                <PlusCircleIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className={"grid grid-cols-1 gap-1"}>
                <Button
                  isIconOnly
                  className={"p-1"}
                  onPress={() => {
                    console.log("Adding sibling.");
                    memoizedFunction({
                      sourceNodeIdList: [`${data.id}`],
                      relation: "sibling",
                    });
                  }}
                >
                  <ArrowDownOnSquareStackIcon className={"-rotate-90"} />
                </Button>
                <Button
                  isIconOnly
                  className={"p-1"}
                  onPress={() =>
                    memoizedFunction({
                      sourceNodeIdList: [`${data.id}`],
                      relation: "child",
                    })
                  }
                >
                  <ArrowDownOnSquareStackIcon />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Popover>
          <PopoverTrigger>
            <Button size={"sm"}>Details</Button>
          </PopoverTrigger>
          <PopoverContent>{data.type.name}</PopoverContent>
        </Popover>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#cc0000" }}
        onConnect={(params) => console.log(params)}
        isConnectable={isConnectable}
      />
    </>
  );
}

export default React.memo(OrganizationNode);
