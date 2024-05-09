'use client';


import SvgGraphViewBox from './SvgGraphViewBox';
import React, {PropsWithChildren, useMemo, useReducer, useState} from 'react';
import {
    ForceGraphDraggable,
    ForceGraphDraggableContext,
    ForceGraphDraggableDispatch,
    ForceGraphMouseButtonEventsContext,
    ForceGraphMouseButtonEventsDispatch
} from '../force-graph-dnd/mouseEventContextCreator';
import {useGraphEditController} from '../hooks/useGraphEditController';

import {ForceGraphMouseActionReducer} from '../force-graph-dnd/forceGraphMouseActionReducer';
import {GraphDto, HasNumberId} from "@/graph-tools/types/types";
import {Tab, Tabs} from "@nextui-org/tabs";
import {NodeEditorPanel} from "@/graph-tools/nodes/NodeEditorPanel";
import GraphForceSliders from "@/graph-tools/components/GraphForceSliders";
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {ShowForceAdjustmentsKey} from "@/graph-tools/graph/ShowForceAdjustments";
import {useGraphName} from "@/graph-tools/graph/graphContextCreator";
import NodeDetails from "@/graph-tools/components/NodeDetails";
import GraphViewOptions from "@/graph-tools/components/GraphViewOptions";

const listenerKey = 'graph-viewer';

export function InteractiveGraphView({
                                                                children,
                                                                sidePanel = true
                                                            }: { sidePanel?: boolean } & PropsWithChildren) {
    const [mouseActionContext, reducer] = useReducer(
        ForceGraphMouseActionReducer,
        {leftMouseDown: false, rightMouseDown: false}
    );
    const [forceGraphDraggable, setForceGraphDraggable] =
        useState<ForceGraphDraggable>({});

    const {currentState: showNodeEditing} = useGraphListener(
        GraphSelectiveKeys.showNodeEditing,
        listenerKey,
        false
    );

    const {currentState: showForceEditing} = useGraphListener(
        GraphSelectiveKeys.showForceEditing,
        listenerKey,
        false
    );

    const disabledTabKeys = useMemo(() => {
        const disabledTabKeys = [];
        if (!showNodeEditing) disabledTabKeys.push(GraphSelectiveKeys.showNodeEditing)
        if (!showForceEditing) disabledTabKeys.push(GraphSelectiveKeys.showForceEditing)
        return disabledTabKeys
    }, [showForceEditing, showNodeEditing]);


    return (
        // <DraggableToTranslate>
        <ForceGraphDraggableContext.Provider value={forceGraphDraggable}>
            <ForceGraphDraggableDispatch.Provider value={setForceGraphDraggable}>
                <ForceGraphMouseButtonEventsContext.Provider
                    value={mouseActionContext}
                >
                    <ForceGraphMouseButtonEventsDispatch.Provider value={reducer}>
                        <div className={'flex'}>
                            <div className={'relative justify-center m-2 gap-2 h-fit w-fit bg-white'}>
                                <SvgGraphViewBox/>
                                <div
                                    className={
                                        'absolute w-fit h-fit top-4 right-4 z-10 flex flex-col gap-1 items-end'
                                    }
                                >
                                    <GraphViewOptions/>
                                </div>
                            </div>
                            {sidePanel && <div
                                className={
                                    'flex flex-col overflow-y-scroll border-slate-600 border-2 rounded-lg p-2 mt-2 relative'
                                }
                                style={{height: '600px'}}
                            >
                                <Tabs aria-label={'graph options'} disabledKeys={disabledTabKeys}>
                                    <Tab key={'node-details'} title={'Node Details'}>
                                        <NodeDetails/>
                                    </Tab>
                                    <Tab key={GraphSelectiveKeys.showNodeEditing} title={'Edit Nodes'}
                                         disabled={!showNodeEditing}>
                                        <NodeEditorPanel/>
                                    </Tab>
                                    <Tab key={GraphSelectiveKeys.showForceEditing} title={'Edit Forces'}>
                                        <GraphForceSliders/>
                                    </Tab>
                                </Tabs>
                            </div>}
                        </div>
                        {children}

                    </ForceGraphMouseButtonEventsDispatch.Provider>
                </ForceGraphMouseButtonEventsContext.Provider>
            </ForceGraphDraggableDispatch.Provider>
        </ForceGraphDraggableContext.Provider>
        // </DraggableToTranslate>
    );
}
