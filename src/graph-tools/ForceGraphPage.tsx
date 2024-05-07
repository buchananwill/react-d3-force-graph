'use client';
import React, { PropsWithChildren } from 'react';

import GraphContextProvider from './graph/GraphContextProvider';
import { NodeContextProvider } from './nodes/NodeContextProvider';
import { GenericLinkContextProvider } from './links/GenericLinkContextProvider';

import MountedTracker from './graph/MountedTracker';
import NodePositionsTracker from './graph/NodePositionsTracker';
import { ShowForceAdjustments } from './graph/ShowForceAdjustments';
import { ShowNodeEditing } from './ShowNodeEditing';
import {DataNode, GraphDto, HasNumberId} from "@/graph-tools/types/types";

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
          <GenericLinkContextProvider links={closureDtos}>
            <MountedTracker />
            <NodePositionsTracker />
            <ShowForceAdjustments />
            <ShowNodeEditing />
            {children}
          </GenericLinkContextProvider>
        </NodeContextProvider>
      </GraphContextProvider>
    </div>
  );
}
