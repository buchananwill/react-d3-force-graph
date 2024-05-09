'use client';


import Graph from './Graph';
import React, {PropsWithChildren, useMemo, useReducer, useState} from 'react';
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
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {ShowForceAdjustmentsKey} from "@/graph-tools/graph/ShowForceAdjustments";
import {useGraphName} from "@/graph-tools/graph/graphContextCreator";
import NodeDetails from "@/graph-tools/components/NodeDetails";

const listenerKey = 'graph-viewer';

export function GraphViewer<T extends HasNumberId>({
                                                     children
                                                   }: {

} & PropsWithChildren) {
  const [mouseActionContext, reducer] = useReducer(
    ForceGraphMouseActionReducer,
    { leftMouseDown: false, rightMouseDown: false }
  );
  const [forceGraphDraggable, setForceGraphDraggable] =
    useState<ForceGraphDraggable>({});

  useGraphEditController();

  const {currentState: showNodeEditing} = useGraphListener(
      GraphSelectiveKeys.showNodeEditing,
      listenerKey,
      false
  );

  console.log(showNodeEditing)

  const {currentState: showForceEditing} = useGraphListener(
      GraphSelectiveKeys.showForceEditing,
      listenerKey,
      false
  );

  const graphName = useGraphName();

  const disabledTabKeys = useMemo(() => {
    const disabledTabKeys = [];
    if (!showNodeEditing) disabledTabKeys.push(GraphSelectiveKeys.showNodeEditing)
    if (!showForceEditing) disabledTabKeys.push(GraphSelectiveKeys.showForceEditing)
    return disabledTabKeys
  }, [showForceEditing, showNodeEditing]);
  console.log(graphName, disabledTabKeys)

  return (
    // <DraggableToTranslate>
      <ForceGraphDraggableContext.Provider value={forceGraphDraggable}>
        <ForceGraphDraggableDispatch.Provider value={setForceGraphDraggable}>
          <ForceGraphMouseButtonEventsContext.Provider
            value={mouseActionContext}
          >
            <ForceGraphMouseButtonEventsDispatch.Provider value={reducer}>
              <Graph >

                    <div
                        className={
                          'flex flex-col overflow-y-scroll border-slate-600 border-2 rounded-lg p-2 mt-2 relative'
                        }
                        style={{height: '600px'}}
                    >
                      <Tabs aria-label={'graph options'} disabledKeys={disabledTabKeys}>
                        <Tab key={'node-details'} title={'Node Details'}>
                          <NodeDetails/>
                        </Tab>
                        <Tab key={GraphSelectiveKeys.showNodeEditing} title={'Edit Nodes'} disabled={!showNodeEditing}>
                          <NodeEditorPanel/>
                        </Tab>
                        <Tab key={GraphSelectiveKeys.showForceEditing} title={'Edit Forces'}>
                          <GraphForceSliders/>
                        </Tab>
                      </Tabs>

                {children}
                    </div>
              </Graph>
            </ForceGraphMouseButtonEventsDispatch.Provider>
          </ForceGraphMouseButtonEventsContext.Provider>
        </ForceGraphDraggableDispatch.Provider>
      </ForceGraphDraggableContext.Provider>
    // </DraggableToTranslate>
  );
}
