import {
    useGlobalController,
    useGlobalDispatch,
    useGlobalDispatchAndListener,
    useGlobalListener
} from "selective-context";
import {useContext, useMemo} from "react";
import {GraphContext} from "@/graph-tools/graph/graphContextCreator";

// Defining the GraphSelectiveKeys as a constant object
export const GraphSelectiveKeys = {
    arrowsToParents: 'arrows-to-parents',
    arrowsToChildren: 'arrows-to-children',
    highlightFromSource: 'highlight-from-source',
    highlightFromTarget: 'highlight-from-target',
    version: 'version',
    transientNodeIds: 'transient-node-ids',
    transientLinkIds: 'transient-link-ids',
    nextNodeId: 'next-node-id',
    nextLinkId: 'next-link-id',
    nodePositionsKey: 'node-positions-key',
    debouncing: 'debouncing',
    noNodeSelected: 'no-node-selected',
    deletedLinkIds: 'deleted-link-ids',
    deletedNodeIds: 'deleted-node-ids',
    dimensions: 'dimensions',
    mounted: 'mounted',
    showNodeEditing: 'show-node-editing',
    nodeCloneFunction: 'node-clone-function',
    showForceEditing: 'show-force-editing',
    unsavedNodeData: 'unsaved-node-data',
    lockTextWithSelect: 'lock-text-with-select',
    textSize: 'text-size',
    ready: 'ready',
    sim: 'simulationRef',
    zoom: 'zoom',
    svgScale: 'svg-scale'
} as const;

// Redefining the GraphSelectiveContext type to use the values of GraphSelectiveKeys
export type GraphSelectiveContext = typeof GraphSelectiveKeys[keyof typeof GraphSelectiveKeys];

export function useGraphSelectiveContextKey(
    contextKey: GraphSelectiveContext
) {
    const {uniqueGraphName} = useContext(GraphContext);
    return useMemo(() => {
        return `${uniqueGraphName}:${contextKey}`
    }, [uniqueGraphName, contextKey]);
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