import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {useDirectSimRefEditsController} from "@/graph-tools/hooks/useDirectSimRefEditsController";
import {EmptyArray, TransientIdOffset} from "@/graph-tools/constants";
import {useRef} from "react";
import {Simulation} from "d3";

const rootListenerKey = 'root-listener-key';
const dimensionsStaticArray: number[] = [1800, 1200];

export function useGraphEditController() {
  const sim = useRef<Simulation<any, any>>(null);

  useGraphController('next-link-id', rootListenerKey, TransientIdOffset);
  useGraphController('next-node-id', rootListenerKey, TransientIdOffset);
  useGraphController<number[]>('transient-link-ids', rootListenerKey, EmptyArray);
  useGraphController('transient-node-ids', rootListenerKey, EmptyArray);
  useGraphController('deleted-link-ids', rootListenerKey, EmptyArray);
  useGraphController('deleted-node-ids', rootListenerKey, EmptyArray);
  useGraphController('dimensions', rootListenerKey, dimensionsStaticArray);
  useGraphController('sim', rootListenerKey, sim)

  useDirectSimRefEditsController();
}

