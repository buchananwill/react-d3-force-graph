'use client';

import React from 'react';
import {
  GenericNodeContext,
  GenericNodeDispatchContext
} from './genericNodeContextCreator';

import { useGraphName } from '../graph/graphContextCreator';
import {DataNode, HasNumberId} from "@/graph-tools/types/types";

export const GenericNodeContextProvider = <T extends HasNumberId>({
  children,
  nodes
}: {
  children: React.ReactNode;
  nodes: DataNode<T>[];
}) => {
  const [nodeState, setNodeState] = React.useState<DataNode<T>[]>(nodes);
  const uniqueGraphName = useGraphName();

  return (
    <GenericNodeContext.Provider value={{ nodes: nodeState, uniqueGraphName }}>
      <GenericNodeDispatchContext.Provider value={setNodeState}>
        {children}
      </GenericNodeDispatchContext.Provider>
    </GenericNodeContext.Provider>
  );
};
