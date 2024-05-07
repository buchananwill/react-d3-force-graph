'use client';

import React, {ReactElement, useContext, useMemo} from 'react';
import {useNodeInteractionContext} from './NodeInteractionContext';
import {useGraphRefs} from './genericNodeContextCreator';

import {useGraphName} from "@/graph-tools/graph/graphContextCreator";
import {HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {SvgTransitionWrapper} from "@/graph-tools/components/SvgTransitionWrapper";
import {LeftCtrlListener} from "@/graph-tools/components/key-listener-context/keyListenerContextCreator";

export default function NodeText<T extends HasNumberId>({
  textIndex,
  children
}: {
  textIndex: number;
  children?: ReactElement<SVGElement>;
}) {
  const leftCtrlHeld = useContext(LeftCtrlListener);
  const uniqueGraphName = useGraphName()
  const { nodeListRef } = useGraphRefs();
  const listenerKey = useMemo(
    () => `node-text-${textIndex}-${uniqueGraphName}`,
    [textIndex, uniqueGraphName]
  );
  const { selected, hover } = useNodeInteractionContext();

  useGraphListener<number>('node-positions-key', listenerKey, 0)

  const { currentState: pinTextToSelected } = useGraphListener(
    'lock-text-with-select',
    listenerKey,
    false
  );

  if (nodeListRef?.current === undefined) {
    return null;
  }

  const updatedData = nodeListRef.current[textIndex];

  const { id } = updatedData;
  const show = leftCtrlHeld || hover === id || selected.includes(id);
  return (
    <SvgTransitionWrapper trigger={show}>
      {(style) => (
        <g
          style={{
            ...style,
            fontFamily: 'Century Gothic', // Spread other props?
            fontSize: '8',
            transitionProperty: 'opacity'
          }}
          transform={`translate(${updatedData.x}, ${updatedData.y})`}
          pointerEvents="none"
        >
          <circle
            cx={0}
            cy={0}
            r={20}
            strokeWidth={2}
            className={`fill-white stroke-emerald-200 opacity-50 `}
          ></circle>
          <circle
            cx={0}
            cy={0}
            r={6}
            className={`${
              selected.includes(id)
                ? 'fill-red-500'
                : hover === id
                ? 'fill-blue-500'
                : 'fill-gray-500'
            } transition-colors`}
          ></circle>

          <g>
            {(hover === id ||
              leftCtrlHeld ||
              (selected.includes(id) && pinTextToSelected)) &&
              children &&
              children}
          </g>
        </g>
      )}
    </SvgTransitionWrapper>
  );
}
