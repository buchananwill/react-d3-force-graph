import {
    useGlobalController,
    useGlobalDispatch,
    useGlobalDispatchAndListener,
    useGlobalListener
} from "selective-context";
import {useContext} from "react";
import {GraphContext} from "@/graph-tools/graph/graphContextCreator";

export type GraphSelectiveContext =
    | 'version'
    | 'transient-node-ids'
    | 'transient-link-ids'
    | 'next-node-id'
    | 'next-link-id'
    | 'debouncing'
    | 'no-node-selected'
    | 'deleted-link-ids'
    | 'deleted-node-ids'
    | 'dimensions'
    | 'show-node-editing'
    | 'node-clone-function'
    | 'show-force-adjustments'
    | 'zoom';

export function useGraphSelectiveContextKey(
    contextKey: GraphSelectiveContext
) {
    const {uniqueGraphName} = useContext(GraphContext);
    return `${uniqueGraphName}:${contextKey}`
}

export function useGraphDispatch<T>(
    contextKey: GraphSelectiveContext
) {
    let selectiveContextKey = useGraphSelectiveContextKey(contextKey);
    return useGlobalDispatch<T>(selectiveContextKey)
}

export function useGraphDispatchAndListener<T>(
    contextKey: GraphSelectiveContext,
    listenerKey: string,
    initialValue: T
) {
    const contextKeyConcat = useGraphSelectiveContextKey(contextKey);
    const {currentState, dispatchWithoutControl} = useGlobalDispatchAndListener<T>({
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
    const {currentState, dispatch} = useGlobalController<T>({
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