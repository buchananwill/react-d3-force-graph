'use client';


import Graph from './Graph';
import React, { PropsWithChildren, useReducer, useState } from 'react';
import {
  ForceGraphDraggable,
  ForceGraphDraggableContext,
  ForceGraphDraggableDispatch,
  ForceGraphMouseButtonEventsContext,
  ForceGraphMouseButtonEventsDispatch
} from '../force-graph-dnd/mouseEventContextCreator';
import { useGraphEditController } from '../hooks/useGraphEditController';

import { ForceGraphMouseActionReducer } from '../force-graph-dnd/forceGraphMouseActionReducer';
import {GraphDto, HasNumberId} from "@/graph-tools/types/types";

export function GraphViewer<T extends HasNumberId>({
  textList,
  titleList,
  children
}: {
  graphDto?: GraphDto<T>;
  textList: string[];
  titleList: string[];
} & PropsWithChildren) {
  const [mouseActionContext, reducer] = useReducer(
    ForceGraphMouseActionReducer,
    { leftMouseDown: false, rightMouseDown: false }
  );
  const [forceGraphDraggable, setForceGraphDraggable] =
    useState<ForceGraphDraggable>({});

  useGraphEditController();

  return (
    // <DraggableToTranslate>
      <ForceGraphDraggableContext.Provider value={forceGraphDraggable}>
        <ForceGraphDraggableDispatch.Provider value={setForceGraphDraggable}>
          <ForceGraphMouseButtonEventsContext.Provider
            value={mouseActionContext}
          >
            <ForceGraphMouseButtonEventsDispatch.Provider value={reducer}>
              <Graph textList={textList} titleList={titleList}>
                {children}
              </Graph>
            </ForceGraphMouseButtonEventsDispatch.Provider>
          </ForceGraphMouseButtonEventsContext.Provider>
        </ForceGraphDraggableDispatch.Provider>
      </ForceGraphDraggableContext.Provider>
    // </DraggableToTranslate>
  );
}
