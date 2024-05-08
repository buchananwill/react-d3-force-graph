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
import {Tab, Tabs} from "@nextui-org/tabs";
import {NodeEditorPanel} from "@/graph-tools/nodes/NodeEditorPanel";
import GraphForceSliders from "@/graph-tools/components/GraphForceSliders";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {ShowForceAdjustmentsKey} from "@/graph-tools/graph/ShowForceAdjustments";

const listenerKey = 'graph-viewer';

export function GraphViewer<T extends HasNumberId>({
  textList,
  titleList,
  children
}: {
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

  const {currentState: showNodeEditing} = useGraphListener(
      'show-node-editing',
      listenerKey,
      false
  );

  const {currentState: showForceEditing} = useGraphListener(
      ShowForceAdjustmentsKey,
      listenerKey,
      false
  );

  return (
    // <DraggableToTranslate>
      <ForceGraphDraggableContext.Provider value={forceGraphDraggable}>
        <ForceGraphDraggableDispatch.Provider value={setForceGraphDraggable}>
          <ForceGraphMouseButtonEventsContext.Provider
            value={mouseActionContext}
          >
            <ForceGraphMouseButtonEventsDispatch.Provider value={reducer}>
              <Graph textList={textList} titleList={titleList}>
                {showForceEditing || showNodeEditing ?
                    <div
                        className={
                          'flex flex-col overflow-y-scroll border-slate-600 border-2 rounded-lg p-2 mt-2 relative'
                        }
                        style={{height: '600px'}}
                    >
                      <Tabs aria-label={'graph options'}>
                        <Tab key={'node-editor'} title={'Edit Nodes'}>
                          <NodeEditorPanel/>
                        </Tab>
                        <Tab key={'force-editor'} title={'Edit Forces'}>
                          <GraphForceSliders/>
                        </Tab>
                        <Tab key={'node-details'} title={'Node Details'}>
                {children}
                        </Tab>
                      </Tabs>

                    </div> : null}
              </Graph>
            </ForceGraphMouseButtonEventsDispatch.Provider>
          </ForceGraphMouseButtonEventsContext.Provider>
        </ForceGraphDraggableDispatch.Provider>
      </ForceGraphDraggableContext.Provider>
    // </DraggableToTranslate>
  );
}
