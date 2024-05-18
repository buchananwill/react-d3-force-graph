import {
  ArrowDownOnSquareStackIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import {
  useGraphDispatch,
  useGraphListener,
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import {
  GenericDivProps,
  HasNumberId,
  MemoizedFunction,
} from "@/graph-tools/types/types";
import { AddNodesParams } from "@/graph-tools/flow-node-editing/hooks/useAddNodes";
import { usePopoverFix } from "@/app/demo/react-flow/components/nodes/usePopoverFix";
import { TrashIcon } from "@heroicons/react/16/solid";
import {
  undefinedAddNodes,
  undefinedDeleteNodes,
  undefinedLabelAccessor,
} from "@/app/demo/react-flow/components/nodes/undefinedFunctionErrors";

function BaseNode<T extends HasNumberId>({
  data,
  isConnectable,
  xPos,
  yPos,
  type,
  children,
  className,
  style,
}: NodeProps<T> & Pick<GenericDivProps, "children" | "className" | "style">) {
  const { dispatchWithoutListen: toggleDetailsModal } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeDetailsModalOpen,
  );
  const listenerKey = `node:${data.id}`;
  const { dispatchWithoutListen: sendNodeData } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeInModal,
  );

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
  const {
    currentState: { memoizedFunction: labelAccessor },
  } = useGraphListener(
    GraphSelectiveContextKeys.nodeLabelAccessor,
    listenerKey,
    undefinedLabelAccessor as MemoizedFunction<[T, string], string>,
  );
  const fixAddProps = usePopoverFix();
  const fixDeleteProps = usePopoverFix();

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#0000cc" }}
        isConnectable={isConnectable}
      />
      <div className={className} style={style}>
        <div className={"flex items-center justify-between gap-2"}>
          {labelAccessor([data, type])}
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
          <Button
            size={"sm"}
            className={"grow"}
            onPress={() => {
              sendNodeData(structuredClone(data));
              toggleDetailsModal((isOpen: boolean) => !isOpen);
            }}
          >
            Details
          </Button>
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
        {children}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#cc0000" }}
        isConnectable={isConnectable}
      />
    </>
  );
}

export default React.memo(BaseNode);
