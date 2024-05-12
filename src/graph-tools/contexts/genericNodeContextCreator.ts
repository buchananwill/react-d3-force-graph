import React, {createContext, Dispatch, MutableRefObject, SetStateAction, useContext} from 'react';
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {LinkRefContext} from "@/graph-tools/contexts/linkRefContextCreator";

export interface NodeContextInterface<T extends HasNumberId> {
  nodes: DataNode<T>[];
}

export const NodeContext = createContext<
  NodeContextInterface<any> | undefined
>(undefined);

export const NodeDispatchContext = createContext<
  Dispatch<SetStateAction<DataNode<any>[]>> | undefined
>(undefined);

export function useNodeContext<T extends HasNumberId>() {
  const context = useContext(
    NodeContext as React.Context<
      NodeContextInterface<T> | undefined
    >
  );
  const dispatch = useContext(
    NodeDispatchContext as React.Context<
      Dispatch<SetStateAction<DataNode<T>[]>> | undefined
    >
  );

  if (context === undefined || dispatch === undefined) {
    throw new Error('useGenericArrayContext must be used within a Provider');
  }

  return { ...context, dispatch };
}

export const NodeRefContext = createContext<MutableRefObject<
  DataNode<any>[]
> | null>(null);

export function useGraphRefs<T extends HasNumberId>() {
  const nodeListRef = useContext(
    NodeRefContext as React.Context<React.MutableRefObject<
      DataNode<T>[]
    > | null>
  );
  const linkListRef = useContext(
    LinkRefContext as React.Context<React.MutableRefObject<
      DataLink<T>[]
    > | null>
  );
  return { nodeListRef, linkListRef };
}
