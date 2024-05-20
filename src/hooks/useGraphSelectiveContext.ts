import {
  useGlobalController,
  useGlobalDispatch,
  useGlobalDispatchAndListener,
  useGlobalListener,
} from "selective-context";
import { useContext, useMemo } from "react";

import { GraphSelectiveContextKey } from "../literals";
import { GraphContext } from "../contexts/graphContextCreator";

export function useGraphSelectiveContextKey(
  contextKey: GraphSelectiveContextKey,
) {
  const { uniqueGraphName } = useContext(GraphContext);
  return useMemo(() => {
    return `${uniqueGraphName}:${contextKey}`;
  }, [uniqueGraphName, contextKey]);
}

export function useGraphDispatch<T>(contextKey: GraphSelectiveContextKey) {
  const selectiveContextKey = useGraphSelectiveContextKey(contextKey);

  return useGlobalDispatch<T>(selectiveContextKey);
}

export function useGraphDispatchAndListener<T>(
  contextKey: GraphSelectiveContextKey,
  listenerKey: string,
  initialValue: T,
) {
  const contextKeyConcat = useGraphSelectiveContextKey(contextKey);
  const { currentState, dispatchWithoutControl } =
    useGlobalDispatchAndListener<T>({
      contextKey: contextKeyConcat,
      listenerKey,
      initialValue,
    });

  return {
    currentState,
    dispatchWithoutControl,
    contextKey,
    listenerKey,
  };
}

export function useGraphController<T>(
  contextKey: GraphSelectiveContextKey,
  initialValue: T,
  listenerKey = "controller",
) {
  const contextKeyConcat = useGraphSelectiveContextKey(contextKey);
  const { currentState, dispatch } = useGlobalController<T>({
    contextKey: contextKeyConcat,
    listenerKey: listenerKey,
    initialValue,
  });

  return {
    currentState,
    dispatch,
    contextKey,
    listenerKey,
  };
}

export function useGraphListener<T>(
  contextKey: GraphSelectiveContextKey,
  listenerKey: string,
  initialValue: T,
) {
  const contextKeyConcat = useGraphSelectiveContextKey(contextKey);

  return useGlobalListener<T>({
    contextKey: contextKeyConcat,
    listenerKey,
    initialValue,
  });
}
