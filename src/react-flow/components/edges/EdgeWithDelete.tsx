import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "reactflow";
import { useGraphListener } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { MemoizedFunction } from "@/graph-tools/types/types";
import { TrashIcon } from "@heroicons/react/16/solid";
import { undefinedDeleteLinks } from "@/graph-tools/literals/undefinedFunctionErrors";

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
          className="nodrag nopan z-10 rounded-lg bg-default-300 text-default-600 opacity-0 transition-opacity duration-500 hover:opacity-100"
          onClick={() => {
            memoizedFunction([id]);
          }}
          // isIconOnly
          // size={"sm"}
        >
          <TrashIcon className={"h-6 w-6 p-1"} />
        </button>
        <div
          className={
            "pointer-events-none z-0 h-1 w-1 rounded-full bg-default-400"
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