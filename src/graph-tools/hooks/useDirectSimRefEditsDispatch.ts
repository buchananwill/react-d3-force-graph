import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {NodeDispatchContext} from "@/graph-tools/contexts/genericNodeContextCreator";
import {LinkDispatchContext} from "@/graph-tools/contexts/genericLinkContextCreator";
import {Dispatch, MutableRefObject, SetStateAction, useCallback, useContext, useMemo} from "react";
import {useGraphDispatch, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {resetLinks} from "@/graph-tools/editing/functions/resetLinks";
import {Simulation} from "d3";
import {GraphSelectiveContextKeys} from "@/graph-tools/hooks/graphSelectiveContextKeys";

import {useGraphRefs} from "@/graph-tools/hooks/useGraphRefs";

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
    const {currentState} = useGraphListener<MutableRefObject<Simulation<any, any>> | null>(GraphSelectiveContextKeys.sim, listenerKey, null);
    const incrementSimVersion = useCallback(() => {
        // console.log('incrementing version!')
        if (nodeListRef?.current && linkListRef?.current && currentState?.current && updateNodes && updateLinks) {
            currentState.current.stop()
            const resetLinksWithIdNotReferences = resetLinks(linkListRef.current);

            updateNodes(nodeListRef.current);
            updateLinks(resetLinksWithIdNotReferences);
            dispatchUnsavedGraph(true);
        }
    }
    ,[dispatchUnsavedGraph, linkListRef, nodeListRef, updateLinks, updateNodes, currentState])
    return {incrementSimVersion, nodeListRef, linkListRef};
}