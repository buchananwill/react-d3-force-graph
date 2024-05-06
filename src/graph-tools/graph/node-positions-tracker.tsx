'use client';

import { NodePositionsKey } from '../graph-types/organization/curriculum-delivery-graph';
import { useGraphName } from './graph-context-creator';
import {useGlobalController} from "selective-context";

const listenerKey = 'update-counter';
export default function NodePositionsTracker() {
  let contextKey = useNodePositionsKey();
  const {} = useGlobalController({
    contextKey: contextKey,
    listenerKey: listenerKey,
    initialValue: 0
  });
  return <></>;
}

export function useNodePositionsKey() {
  let graphName = useGraphName();
  return `${graphName}:${NodePositionsKey}`
}