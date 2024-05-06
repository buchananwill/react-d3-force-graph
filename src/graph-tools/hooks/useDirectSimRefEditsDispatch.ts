import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGenericGraphRefs, useGenericNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {useGenericLinkContext} from "@/graph-tools/links/genericLinkContextCreator";
import {MutableRefObject, useCallback, useMemo} from "react";
import {
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

    const {dispatch: updateNodes} = useGenericNodeContext();
    const {dispatch: updateLinks} = useGenericLinkContext();

    const {dispatchWithoutListen: dispatchUnsavedGraph} =
        useGraphDispatch<boolean>(
            "unsaved-node-data"
        );

    const {dispatchWithoutControl} =
        useGraphDispatchAndListener<number>(
            'version',
            listenerKey,
            0
        );

    const {nodeListRef, linkListRef} = useGenericGraphRefs<T>();
    const {currentState} = useGraphListener<MutableRefObject<Simulation<any, any>> | null>('sim', listenerKey, null);
        // useCallback(() => {
    const incrementSimVersion = () => {
        console.log('will it increment?', nodeListRef, linkListRef, currentState?.current)
        if (nodeListRef && linkListRef && currentState?.current) {
            currentState.current.stop()
            console.log(nodeListRef.current)
            console.log(linkListRef.current)
            const resetLinksWithNumberIds = resetLinks(linkListRef.current);
            const safeCopyOfNodes = nodeListRef.current.map(
                (n) => ({...n}) as DataNode<T>
            );
            const safeCopyOfLinks = resetLinksWithNumberIds.map(
                (l) =>
                    ({
                        ...l
                    }) as DataLink<T>
            );

            console.log(
                'nodes: ', nodeListRef.current,
                'links', linkListRef.current,
                'reset links', resetLinksWithNumberIds)

            updateNodes(safeCopyOfNodes);
            updateLinks(safeCopyOfLinks);
            dispatchUnsavedGraph(true);

            // linkListRef.current = resetLinksWithNumberIds

        }
    }
    // ,[dispatchUnsavedGraph, dispatchWithoutControl, linkListRef, nodeListRef, updateLinks, updateNodes, currentState])
    return {incrementSimVersion, nodeListRef, linkListRef};
}