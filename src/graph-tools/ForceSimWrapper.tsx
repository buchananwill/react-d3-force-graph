'use client';

import React, {ReactNode, useCallback, useContext, useRef, useState} from 'react';
import {useD3ForceSimulation} from './hooks/useD3ForceSimulation';
import {GenericLinkRefContext} from './links/genericLinkContextCreator';
import {GenericNodeRefContext} from './nodes/genericNodeContextCreator';

import {useGraphDispatch, useGraphDispatchAndListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {NodePositionsKey} from "@/graph-tools/constants";

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

  let {dispatchWithoutControl} = useGraphDispatchAndListener<number>(NodePositionsKey, 'wrapper', 0);

  const lastRenderTimer = useRef(Date.now());

  const [simDisplaying, setSimDisplaying] = useState(false);



  const ticked = useCallback(() => {
    const elapsed = Date.now() - lastRenderTimer.current;
    if (elapsed >= 25) {
      lastRenderTimer.current = Date.now();
      dispatchWithoutControl(current => current + 1);
    }
    if (!simDisplaying) setSimDisplaying(true);
  }, [dispatchWithoutControl, simDisplaying]
)
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
