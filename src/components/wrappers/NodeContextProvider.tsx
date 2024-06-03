"use client";

import React, { Dispatch, SetStateAction } from "react";
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
      <NodeDispatchContext.Provider
        value={
          setNodeState as Dispatch<SetStateAction<DataNode<HasNumberId>[]>>
        }
      >
        {children}
      </NodeDispatchContext.Provider>
    </NodeContext.Provider>
  );
};
