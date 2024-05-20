"use client";

import React from "react";
import {
  NodeContext,
  NodeDispatchContext,
} from "../../contexts/genericNodeContextCreator";
import { DataNode, HasNumberId } from "../../types";

export const NodeContextProvider = <T extends HasNumberId>({
  children,
  nodes,
}: {
  children: React.ReactNode;
  nodes: DataNode<T>[];
}) => {
  const [nodeState, setNodeState] = React.useState<DataNode<T>[]>(nodes);

  return (
    <NodeContext.Provider value={{ nodes: nodeState }}>
      <NodeDispatchContext.Provider value={setNodeState}>
        {children}
      </NodeDispatchContext.Provider>
    </NodeContext.Provider>
  );
};
