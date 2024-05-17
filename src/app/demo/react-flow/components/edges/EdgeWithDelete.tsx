import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "reactflow";
import { useGraphListener } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { undefinedDeleteLinks } from "@/graph-tools/flow-node-editing/buttons/useAddLinks";
import { MemoizedFunction } from "@/graph-tools/types/types";
import { TrashIcon } from "@heroicons/react/16/solid";

export interface Coordinate {
  x: number;
  y: number;
}

export default function EdgeWithDelete({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const {
    currentState: { memoizedFunction },
  } = useGraphListener(
    GraphSelectiveContextKeys.deleteLinks,
    `edge:${id}`,
    undefinedDeleteLinks as MemoizedFunction<string[], void>,
  );

  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,

    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={path} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan bg-default-300 z-10 rounded-lg transition-opacity text-default-600 hover:opacity-100 opacity-0 duration-500"
          onClick={() => {
            memoizedFunction([id]);
          }}
          // isIconOnly
          // size={"sm"}
        >
          <TrashIcon className={"w-6 h-6 p-1"} />
        </button>
        <div
          className={
            "rounded-full bg-default-400 w-1 h-1 z-0 pointer-events-none"
          }
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
        ></div>
      </EdgeLabelRenderer>
    </>
  );
}
