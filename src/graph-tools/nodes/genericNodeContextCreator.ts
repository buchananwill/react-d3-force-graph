import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext
} from 'react';

import { GenericLinkRefContext } from '../links/genericLinkContextCreator';
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";

export interface GenericNodeContextInterface<T extends HasNumberId> {
  nodes: DataNode<T>[];
  uniqueGraphName: string;
}

export const GenericNodeContext = createContext<
  GenericNodeContextInterface<any> | undefined
>(undefined);

export const GenericNodeDispatchContext = createContext<
  Dispatch<SetStateAction<DataNode<any>[]>> | undefined
>(undefined);

export function useGenericNodeContext<T extends HasNumberId>() {
  const context = useContext(
    GenericNodeContext as React.Context<
      GenericNodeContextInterface<T> | undefined
    >
  );
  const dispatch = useContext(
    GenericNodeDispatchContext as React.Context<
      Dispatch<SetStateAction<DataNode<T>[]>> | undefined
    >
  );

  if (context === undefined || dispatch === undefined) {
    throw new Error('useGenericArrayContext must be used within a Provider');
  }

  return { ...context, dispatch };
}

export const GenericNodeRefContext = createContext<MutableRefObject<
  DataNode<any>[]
> | null>(null);

export function useGenericGraphRefs<T extends HasNumberId>() {
  const nodeListRef = useContext(
    GenericNodeRefContext as React.Context<React.MutableRefObject<
      DataNode<T>[]
    > | null>
  );
  const linkListRef = useContext(
    GenericLinkRefContext as React.Context<React.MutableRefObject<
      DataLink<T>[]
    > | null>
  );
  return { nodeListRef, linkListRef };
}
