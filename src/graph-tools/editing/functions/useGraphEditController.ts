import {useGraphController} from "@/graph-tools/graph/useGraphSelectiveContext";
import {useDirectSimRefEditsController} from "@/graph-tools/editing/functions/useDirectSimRefEditsController";
import {EmptyArray, TransientIdOffset} from "@/graph-tools/constants";

const rootListenerKey = 'root-listener-key';
const dimensionsStaticArray: number[] = [1800, 1200];

export function useGraphEditController() {
  useGraphController('next-link-id', rootListenerKey, TransientIdOffset);
  useGraphController('next-node-id', rootListenerKey, TransientIdOffset);
  useGraphController<number[]>('transient-link-ids', rootListenerKey, EmptyArray);
  useGraphController('transient-node-ids', rootListenerKey, EmptyArray);
  useGraphController('deleted-link-ids', rootListenerKey, EmptyArray);
  useGraphController('deleted-node-ids', rootListenerKey, EmptyArray);
  useGraphController('dimensions', rootListenerKey, dimensionsStaticArray);


  useDirectSimRefEditsController();
}

