'use client';

import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {NodePositionsKey} from "@/graph-tools/constants";

const listenerKey = 'update-counter';
export default function NodePositionsTracker() {

  useGraphController<number>(
    NodePositionsKey,
    listenerKey,
    0
  );
  return null;
}
