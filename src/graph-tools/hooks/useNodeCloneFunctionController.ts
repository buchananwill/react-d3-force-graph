import {
  MemoizedFunction,
  DataNode,
  HasNumberId,
} from "@/graph-tools/types/types";
import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";

/**
 * The value passed for initial value must be defined outside of a function component scope, or memoized.
 * */
export function useNodeCloneFunctionController<T extends HasNumberId>(
  initialValue: MemoizedFunction<DataNode<T>, DataNode<T>>,
) {
  return useGraphController(
    "node-clone-function",
    "clone-controller",
    initialValue,
  );
}
