'use client';

import React from 'react';
import {
  NodeContext,
  NodeDispatchContext
} from './genericNodeContextCreator';

import { useGraphName } from '../graph/graphContextCreator';
import {DataNode, HasNumberId} from "@/graph-tools/types/types";

export const NodeContextProvider = <T extends HasNumberId>({
  children,
  nodes
}: {
  children: React.ReactNode;
  nodes: DataNode<T>[];
}) => {
  const [nodeState, setNodeState] = React.useState<DataNode<T>[]>(nodes);
  const uniqueGraphName = useGraphName();

  return (
    <NodeContext.Provider value={{ nodes: nodeState, uniqueGraphName }}>
      <NodeDispatchContext.Provider value={setNodeState}>
        {children}
      </NodeDispatchContext.Provider>
    </NodeContext.Provider>
  );
};
