'use client';

import React, {ReactNode, useCallback, useContext, useRef, useState} from 'react';
import {useD3ForceSimulation} from './hooks/useD3ForceSimulation';
import {LinkRefContext} from './links/genericLinkContextCreator';
import {NodeRefContext} from './nodes/genericNodeContextCreator';

import {useGraphDispatch, useGraphDispatchAndListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {NodePositionsKey} from "@/graph-tools/constants";
import {useGraphName} from "@/graph-tools/graph/graphContextCreator";

export default function ForceSimWrapper({
  linkElements,
  nodeElements,
  textElements,
}: {
  textElements: ReactNode[];
  nodeElements: ReactNode[];
  linkElements: ReactNode[];

}) {
  const nodesRef = useContext(NodeRefContext);
  const linksRef = useContext(LinkRefContext);


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
  useD3ForceSimulation(nodesRef!, linksRef!, ticked);

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
