import {
  MemoizedFunction,
  DataNode,
  HasNumberId,
} from "@/graph-tools/types/util";
import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/literals/graphSelectiveContextKeys";

/**
 * The value passed for initial value must be defined outside of a function component scope, or memoized.
 * */
export function useNodeCloneFunctionController<T extends HasNumberId>(
  initialValue: MemoizedFunction<DataNode<T>, DataNode<T>>,
) {
  return useGraphController(
    GraphSelectiveContextKeys.nodeCloneFunction,
    initialValue,
  );
}
