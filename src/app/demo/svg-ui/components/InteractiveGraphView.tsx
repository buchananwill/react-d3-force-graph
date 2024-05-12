'use client';


import SvgGraphViewBox from './SvgGraphViewBox';
import React, {PropsWithChildren, useMemo, useReducer, useState} from 'react';
import {
    ForceGraphDraggable,
    ForceGraphDraggableContext,
    ForceGraphDraggableDispatch,
    ForceGraphMouseButtonEventsContext,
    ForceGraphMouseButtonEventsDispatch
} from '@/app/demo/svg-ui/force-graph-dnd/mouseEventContextCreator';

import {ForceGraphMouseActionReducer} from '@/app/demo/svg-ui/force-graph-dnd/forceGraphMouseActionReducer';
import {Tab, Tabs} from "@nextui-org/tabs";
import {NodeEditorPanel} from "@/app/demo/components/NodeEditorPanel";
import GraphForceSliders from "@/app/demo/components/GraphForceSliders";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import NodeDetails from "@/app/demo/components/NodeDetails";
import GraphViewOptions from "@/app/demo/svg-ui/components/GraphViewOptions";
import {GraphSelectiveContextKeys} from "@/graph-tools/hooks/graphSelectiveContextKeys";
import {NodeComponentContext} from "@/app/demo/svg-ui/context/nodeComponentContextCreator";
import {LinkComponentContext} from "@/app/demo/svg-ui/context/linkComponentContextCreator";
import NodeDetailsComponentContextProvider
    from "@/app/demo/components/details-component-context/DetailsComponentContextProvider";
import NodeInteractionProvider from "@/app/demo/svg-ui/context/NodeInteractionContext";
import {SquareNode} from "@/app/demo/svg-ui/components/SquareNode";
import CurvedLinkComponent from "@/app/demo/svg-ui/components/CurvedLinkComponent";

const listenerKey = 'svg-graph-viewer';
const defaultNodeSvg = {component: SquareNode}
const defaultLinkSvg = {component: CurvedLinkComponent}

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
        GraphSelectiveContextKeys.showNodeEditing,
        listenerKey,
        false
    );

    const {currentState: showForceEditing} = useGraphListener(
        GraphSelectiveContextKeys.showForceEditing,
        listenerKey,
        false
    );

    const disabledTabKeys = useMemo(() => {
        const disabledTabKeys = [];
        if (!showNodeEditing) disabledTabKeys.push(GraphSelectiveContextKeys.showNodeEditing)
        if (!showForceEditing) disabledTabKeys.push(GraphSelectiveContextKeys.showForceEditing)
        return disabledTabKeys
    }, [showForceEditing, showNodeEditing]);


    return (
        // <DraggableToTranslate>
        <NodeComponentContext.Provider value={defaultNodeSvg}>
            <LinkComponentContext.Provider value={defaultLinkSvg}>
                <NodeDetailsComponentContextProvider>
                    <NodeInteractionProvider>


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
                                                    <Tab key={GraphSelectiveContextKeys.showNodeEditing}
                                                         title={'Edit Nodes'}
                                                         disabled={!showNodeEditing}>
                                                        <NodeEditorPanel/>
                                                    </Tab>
                                                    <Tab key={GraphSelectiveContextKeys.showForceEditing}
                                                         title={'Edit Forces'}>
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
                    </NodeInteractionProvider>

                </NodeDetailsComponentContextProvider>
            </LinkComponentContext.Provider>
        </NodeComponentContext.Provider>
        // </DraggableToTranslate>
    );
}
