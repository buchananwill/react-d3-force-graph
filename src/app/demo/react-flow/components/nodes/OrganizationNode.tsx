import { OrganizationDto } from "@/app/demo/types/OrganizationDto";
import {
  ArrowDownOnSquareStackIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { useGraphListener } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { MemoizedFunction } from "@/graph-tools/types/types";
import { AddNodesParams } from "@/graph-tools/flow-node-editing/hooks/useAddNodes";
import { usePopoverFix } from "@/app/demo/react-flow/components/nodes/usePopoverFix";
import { TrashIcon } from "@heroicons/react/16/solid";

const undefinedAddNodes = {
  memoizedFunction: () => {
    throw Error("Add nodes function has not been defined.");
  },
};
const undefinedDeleteNodes = {
  memoizedFunction: () => {
    throw Error("Delete nodes function has not been defined.");
  },
};

function OrganizationNode({
  data,
  isConnectable,
  xPos,
  yPos,
}: NodeProps<OrganizationDto>) {
  const listenerKey = `node:${data.id}`;

  const {
    currentState: { memoizedFunction },
  } = useGraphListener(
    GraphSelectiveContextKeys.addNodes,
    listenerKey,
    undefinedAddNodes as MemoizedFunction<AddNodesParams, void>,
  );
  const {
    currentState: { memoizedFunction: memoizedDeleteNodes },
  } = useGraphListener<MemoizedFunction<string[], void>>(
    GraphSelectiveContextKeys.deleteNodes,
    listenerKey,
    undefinedDeleteNodes,
  );
  const fixAddProps = usePopoverFix();
  const fixDeleteProps = usePopoverFix();

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
            {...fixAddProps}
            placement={"right"}
            triggerScaleOnOpen
            updatePositionDeps={[xPos, yPos]}
            triggerType={"menu"}
          >
            <PopoverTrigger>
              <Button size={"sm"} className={"p-1.5"} isIconOnly>
                <PlusCircleIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className={"grid grid-cols-1 gap-1"}>
                <Button
                  isIconOnly
                  className={"p-1.5"}
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
                  className={"p-1.5"}
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
        <div className={" flex gap-1"}>
          <Popover>
            <PopoverTrigger>
              <Button size={"sm"} className={"grow"}>
                Details
              </Button>
            </PopoverTrigger>
            <PopoverContent>{data.type.name}</PopoverContent>
          </Popover>
          <Popover
            {...fixDeleteProps}
            placement={"right"}
            triggerScaleOnOpen
            updatePositionDeps={[xPos, yPos]}
            triggerType={"menu"}
          >
            <PopoverTrigger>
              <Button size={"sm"} className={"p-1.5"} isIconOnly>
                <MinusCircleIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className={"grid grid-cols-1 gap-1"}>
                <Button
                  isIconOnly
                  className={"p-2"}
                  onPress={() => {
                    memoizedDeleteNodes([`${data.id}`]);
                  }}
                >
                  <TrashIcon />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
