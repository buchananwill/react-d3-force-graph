'use client';
import React, { PropsWithChildren } from 'react';

import GraphContextProvider from './graph/GraphContextProvider';
import { NodeContextProvider } from './nodes/NodeContextProvider';
import { LinkContextProvider } from './links/LinkContextProvider';

import MountedTracker from './graph/MountedTracker';
import NodePositionsTracker from './graph/NodePositionsTracker';
import { ShowForceAdjustments } from './graph/ShowForceAdjustments';
import { ShowNodeEditing } from './ShowNodeEditing';
import {DataNode, GraphDto, HasNumberId} from "@/graph-tools/types/types";
import {NodeComponentContext} from "@/graph-tools/nodes/nodeComponentContextCreator";
import {CircleNode} from "@/graph-tools/ui-defaults/svg/CircleNode";
import {SquareNode} from "@/graph-tools/ui-defaults/svg/SquareNode";
import {LinkComponentContext} from "@/graph-tools/links/linkComponentContextCreator";
import CurvedLinkComponent from "@/graph-tools/ui-defaults/svg/CurvedLinkComponent";

const defaultNodeSvg = {component: SquareNode}
const defaultLinkSvg = {component: CurvedLinkComponent}

export interface NodePayload<T extends HasNumberId> {
  node: DataNode<T>;
  payload?: React.JSX.Element;
}
export default function ForceGraphPage<T extends HasNumberId>({
  dataGraph: graphDto,
  graphName,
  children
}: {
  dataGraph: GraphDto<T>;
  graphName: string;
} & PropsWithChildren) {
  const { nodes, closureDtos } = graphDto;

  return (
    <div className={'flex'}>
      <GraphContextProvider uniqueGraphName={graphName}>
        <NodeContextProvider nodes={nodes}>
          <LinkContextProvider links={closureDtos}>
           <NodeComponentContext.Provider value={defaultNodeSvg}>
               <LinkComponentContext.Provider value={defaultLinkSvg}>
            <MountedTracker />
            <NodePositionsTracker />
            <ShowForceAdjustments />
            <ShowNodeEditing />
            {children}
               </LinkComponentContext.Provider>
           </NodeComponentContext.Provider>
          </LinkContextProvider>
        </NodeContextProvider>
      </GraphContextProvider>
    </div>
  );
}
