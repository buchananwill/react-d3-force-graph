'use client';

import {NodePositionsKey} from '@/app/demo/graphs/organization/curriculum-delivery-graph';
import {useGraphController} from "@/graph-tools/graph/useGraphSelectiveContext";

const listenerKey = 'update-counter';
export default function NodePositionsTracker() {

  useGraphController<number>(
    NodePositionsKey,
    listenerKey,
    0
  );
  return null;
}
