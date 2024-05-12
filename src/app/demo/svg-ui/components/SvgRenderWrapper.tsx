'use client';

import React, {ReactNode} from 'react';

import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";

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
