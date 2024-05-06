'use client';

import React, {ReactNode, useContext, useRef, useState} from 'react';
import {useD3ForceSimulation} from './hooks/useD3ForceSimulation';
import {GenericLinkRefContext} from './links/genericLinkContextCreator';
import {GenericNodeRefContext} from './nodes/generic-node-context-creator';

import {NodePositionsKey} from '@/app/demo/graphs/organization/curriculum-delivery-graph';
import {useGraphDispatch} from "@/graph-tools/graph/useGraphSelectiveContext";

export default function ForceSimWrapper({
  linkElements,
  nodeElements,
  textElements,
  uniqueGraphName
}: {
  textElements: ReactNode[];
  nodeElements: ReactNode[];
  linkElements: ReactNode[];
  uniqueGraphName: string;
}) {
  const nodesRef = useContext(GenericNodeRefContext);
  const linksRef = useContext(GenericLinkRefContext);

  let {dispatchWithoutListen} = useGraphDispatch<number>(NodePositionsKey);

  const lastRenderTimer = useRef(Date.now());

  const [simDisplaying, setSimDisplaying] = useState(false);

  const ticked = () => {
    const elapsed = Date.now() - lastRenderTimer.current;
    if (elapsed >= 25) {
      lastRenderTimer.current = Date.now();
      dispatchWithoutListen(current => current + 1);
    }
    if (!simDisplaying) setSimDisplaying(true);
  };

  useD3ForceSimulation(nodesRef!, linksRef!, ticked, uniqueGraphName);

  return (
    <g>
      {simDisplaying && (
        <>
          <g>{...linkElements}</g>
          <g>{...nodeElements}</g>
          <g>{...textElements}</g>
        </>
      )}
    </g>
  );
}
