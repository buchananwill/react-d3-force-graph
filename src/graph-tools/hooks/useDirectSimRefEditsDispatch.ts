import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {NodeDispatchContext, useGraphRefs, useNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {LinkDispatchContext, useLinkContext} from "@/graph-tools/links/genericLinkContextCreator";
import {Dispatch, MutableRefObject, SetStateAction, useCallback, useContext, useMemo} from "react";
import {
    GraphSelectiveKeys,
    useGraphDispatch,
    useGraphDispatchAndListener,
    useGraphListener
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {resetLinks} from "@/graph-tools/editing/functions/resetLinks";
import {Simulation} from "d3";

export function useDirectSimRefEditsDispatch<T extends HasNumberId>() {

    const listenerKey = useMemo(() => {
            return crypto.randomUUID()

    },[])

    const updateNodes = useContext<Dispatch<SetStateAction<DataNode<T>[]>>| undefined>(NodeDispatchContext);
    const updateLinks = useContext<Dispatch<SetStateAction<DataLink<T>[]>> | undefined>(LinkDispatchContext);

    const {dispatchWithoutListen: dispatchUnsavedGraph} =
        useGraphDispatch<boolean>(
            "unsaved-node-data"
        );


    useGraphListener<number>(
            'version',
            listenerKey,
            0
        );

    const {nodeListRef, linkListRef} = useGraphRefs<T>();
    const {currentState} = useGraphListener<MutableRefObject<Simulation<any, any>> | null>(GraphSelectiveKeys.sim, listenerKey, null);
    const incrementSimVersion = useCallback(() => {
        if (nodeListRef?.current && linkListRef?.current && currentState?.current && updateNodes && updateLinks) {
            currentState.current.stop()
            const resetLinksWithNumberIds = resetLinks(linkListRef.current);

            updateNodes(nodeListRef.current);
            updateLinks(resetLinksWithNumberIds);
            dispatchUnsavedGraph(true);
        }
    }
    ,[dispatchUnsavedGraph, linkListRef, nodeListRef, updateLinks, updateNodes, currentState])
    return {incrementSimVersion, nodeListRef, linkListRef};
}