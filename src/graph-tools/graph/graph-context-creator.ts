import {createContext, useContext} from 'react';
import {useGlobalController, useGlobalDispatchAndListener, useGlobalListener} from "selective-context";

export type GraphSelectiveContext =
  | 'version'
  | 'transientNodeIds'
  | 'transientLinkIds'
  | 'nextNodeId'
  | 'nextLinkId'
  | 'debouncing'
  | 'noNodeSelected'
  | 'deletedLinkIds'
  | 'deletedNodeIds'
  | 'dimensions';
export interface GraphContextInterface {
  uniqueGraphName: string;
}

export const GraphContext = createContext<GraphContextInterface>({
  uniqueGraphName: 'default'
});

export function useGraphName() {
  const { uniqueGraphName } = useContext(GraphContext);
  return uniqueGraphName;
}

export function useGraphSelectiveContextKey(
    contextKey: GraphSelectiveContext
) {
  const { uniqueGraphName } = useContext(GraphContext);
  return `${uniqueGraphName}:${contextKey}`
}

export function useGraphDispatchAndListener<T>(
    contextKey: GraphSelectiveContext,
    listenerKey: string,
    initialValue: T
) {
  const contextKeyConcat = useGraphSelectiveContextKey(contextKey);
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener<T>({
    contextKey: contextKeyConcat,
    listenerKey,
    initialValue
  });

  return {
    currentState,
    dispatchWithoutControl,
    contextKey,
    listenerKey
  };
}

export function useGraphController<T>(
    contextKey: GraphSelectiveContext,
    listenerKey: string,
    initialValue: T
) {
  const contextKeyConcat = useGraphSelectiveContextKey(contextKey);
  const { currentState, dispatch } = useGlobalController<T>({
    contextKey: contextKeyConcat,
    listenerKey: listenerKey,
    initialValue
  });

  return {
    currentState,
    dispatch,
    contextKey,
    listenerKey
  };
}

export function useGraphListener<T>(
    contextKey: GraphSelectiveContext,
    listenerKey: string,
    initialValue: T
) {
  const contextKeyConcat = useGraphSelectiveContextKey(contextKey);

  return useGlobalListener<T>(
      {
        contextKey: contextKeyConcat,
        listenerKey,
        initialValue
      }
  );
}

export function useGraphNumberDispatch(
  contextKey: GraphSelectiveContext,
  listenerKey: string,
  initialValue: number
) {
  return useGraphDispatchAndListener<number>(contextKey, listenerKey, initialValue)

}
