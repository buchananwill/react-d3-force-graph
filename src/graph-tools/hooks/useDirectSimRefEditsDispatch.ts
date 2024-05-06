import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGenericGraphRefs, useGenericNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {useGenericLinkContext} from "@/graph-tools/links/genericLinkContextCreator";
import {useCallback, useMemo} from "react";
import {useGraphDispatch, useGraphDispatchAndListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {resetLinks} from "@/graph-tools/editing/functions/resetLinks";

export function useDirectSimRefEditsDispatch<T extends HasNumberId>() {

    const listenerKey = useMemo(() => {
            return crypto.randomUUID()

    },[])

    const {dispatch: updateNodes, nodes} = useGenericNodeContext();
    const {dispatch: updateLinks, links} = useGenericLinkContext();

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
    const incrementSimVersion = useCallback(() => {
        if (nodeListRef && linkListRef) {
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

            updateNodes(safeCopyOfNodes);
            updateLinks(safeCopyOfLinks);
            dispatchUnsavedGraph(true);
            dispatchWithoutControl(version => {
            console.log('incrementing ', version)
                return version + 1
            });
        }
    },[dispatchUnsavedGraph, dispatchWithoutControl, linkListRef, nodeListRef, updateLinks, updateNodes])
    return {incrementSimVersion, nodeListRef, linkListRef};
}