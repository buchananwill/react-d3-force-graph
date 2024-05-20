import {
  MemoizedFunction,
  DataNode,
  HasNumberId,
} from "../types";
import { useGraphController } from "./useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "../literals";

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
