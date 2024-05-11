'use client';
import React, {PropsWithChildren} from 'react';

import GraphContextProvider from './graph/GraphContextProvider';
import {NodeContextProvider} from './nodes/NodeContextProvider';
import {LinkContextProvider} from './links/LinkContextProvider';

import MountedTracker from './graph/MountedTracker';
import NodePositionsTracker from './graph/NodePositionsTracker';
import {ShowForceAdjustments} from './graph/ShowForceAdjustments';
import {ShowNodeEditing, useShowNodeEditing} from './ShowNodeEditing';
import {DataNode, GraphDto, HasNumberId} from "@/graph-tools/types/types";
import {NodeComponentContext} from "@/graph-tools/nodes/nodeComponentContextCreator";
import {CircleNode} from "@/graph-tools/ui-defaults/svg/CircleNode";
import {SquareNode} from "@/graph-tools/ui-defaults/svg/SquareNode";
import {LinkComponentContext} from "@/graph-tools/links/linkComponentContextCreator";
import CurvedLinkComponent from "@/graph-tools/ui-defaults/svg/CurvedLinkComponent";
import {InteractiveGraphView} from "@/graph-tools/graph/InteractiveGraphView";
import {NodeLinkRefWrapper} from "@/graph-tools/graph/NodeLinkRefWrapper";
import {NodeDetailsComponentContext} from "@/graph-tools/contexts/details-component/nodeDetailsComponentContextCreator";
import NodeDetailsComponentContextProvider
    from "@/graph-tools/contexts/details-component/DetailsComponentContextProvider";
import ForceSimEngine from "@/graph-tools/graph/ForceSimEngine";
import GraphForceAdjuster from "@/graph-tools/components/GraphForceAttributes";
import {useGraphEditController} from "@/graph-tools/hooks/useGraphEditController";
import GraphEditController from "@/graph-tools/graph/GraphEditController";
import NodeInteractionProvider from "@/graph-tools/nodes/NodeInteractionContext";
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";

const defaultNodeSvg = {component: SquareNode}
const defaultLinkSvg = {component: CurvedLinkComponent}

export interface ForceGraphPageAllProps<T extends HasNumberId> extends PropsWithChildren {
    dataGraph: GraphDto<T>;
    graphName: string;
    options?: Partial<ForceGraphPageOptionProps>
}

export interface ForceGraphPageOptionProps {
    nodeEditing: boolean;
    forceEditing: boolean;
    sidePanel: boolean;
    defaultInteractiveViewer: boolean;
    useInternalSimEngine: boolean
}

export interface NodePayload<T extends HasNumberId> {
    node: DataNode<T>;
    payload?: React.JSX.Element;
}

export default function ForceGraphPage<T extends HasNumberId>({
                                                                  dataGraph: graphDto,
                                                                  graphName,
                                                                  options,
                                                                  children
                                                              }: ForceGraphPageAllProps<T>) {
    const {nodes, closureDtos} = graphDto;

    return (
        <div className={'flex'}>
            <GraphContextProvider uniqueGraphName={graphName}>
                <NodeContextProvider nodes={nodes}>
                    <LinkContextProvider links={closureDtos}>
                        <NodeLinkRefWrapper>
                            <NodeComponentContext.Provider value={defaultNodeSvg}>
                                <LinkComponentContext.Provider value={defaultLinkSvg}>
                                    <NodeDetailsComponentContextProvider>
                                        <NodeInteractionProvider>
                                        <GraphEditController/>
                                        <MountedTracker/>
                                        <NodePositionsTracker/>
                                        <ShowForceAdjustments/>
                                        <ShowNodeEditing/>
                                        <GraphForceAdjuster/>
                                            {options?.useInternalSimEngine && <ForceSimEngine/>}

                                            {children}

                                        </NodeInteractionProvider>

                                    </NodeDetailsComponentContextProvider>
                                </LinkComponentContext.Provider>
                            </NodeComponentContext.Provider>
                        </NodeLinkRefWrapper>
                    </LinkContextProvider>
                </NodeContextProvider>
            </GraphContextProvider>
        </div>
    );
}
