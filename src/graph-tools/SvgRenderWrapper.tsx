'use client';

import React, {ReactNode, useCallback, useContext, useRef, useState} from 'react';
import {useD3ForceSimulationEffect} from './hooks/useD3ForceSimulationEffect';
import {LinkRefContext} from './links/genericLinkContextCreator';
import {NodeRefContext, useGraphRefs} from './nodes/genericNodeContextCreator';

import {
  useGraphDispatch,
  useGraphDispatchAndListener,
  useGraphListener
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {NodePositionsKey} from "@/graph-tools/constants";
import {useGraphName} from "@/graph-tools/graph/graphContextCreator";

export default function SvgRenderWrapper({
  linkElements,
  nodeElements,
  textElements,
}: {
  textElements: ReactNode[];
  nodeElements: ReactNode[];
  linkElements: ReactNode[];

}) {

  const {currentState: isReady} = useGraphListener('ready', 'svg-elements-wrapper', false);

  return (
    <g>
      {isReady && (
        <>
          <g>{...linkElements}</g>
          <g>{...nodeElements}</g>
          <g>{...textElements}</g>
        </>
      )}
    </g>
  );
}
