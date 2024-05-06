import {CachedFunction, DataNode, HasNumberId} from '@/graph-tools/types/types';
import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";

export function useNodeCloneFunctionController<T extends HasNumberId>(
  initialValue: CachedFunction<DataNode<T>, DataNode<T>>
) {
  return useGraphController('node-clone-function', 'clone-controller', initialValue)
}
