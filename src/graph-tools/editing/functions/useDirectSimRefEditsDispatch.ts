import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGenericGraphRefs, useGenericNodeContext} from "@/graph-tools/nodes/generic-node-context-creator";
import {useGenericLinkContext} from "@/graph-tools/links/genericLinkContextCreator";
import {useCallback} from "react";
import {useGraphDispatch} from "@/graph-tools/graph/useGraphSelectiveContext";
import {resetLinks} from "@/graph-tools/editing/functions/resetLinks";

export function useDirectSimRefEditsDispatch<T extends HasNumberId>() {

    const {dispatch: updateNodes} = useGenericNodeContext();
    const {dispatch: updateLinks} = useGenericLinkContext();

    const {dispatchWithoutListen: dispatchUnsavedGraph} =
        useGraphDispatch<boolean>(
            "unsaved-node-data"
        );

    const {dispatchWithoutListen} =
        useGraphDispatch<number>(
            'version',
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
            dispatchWithoutListen(version => version + 1);
        }
    },[dispatchUnsavedGraph, dispatchWithoutListen])
    return {incrementSimVersion, nodeListRef, linkListRef};
}