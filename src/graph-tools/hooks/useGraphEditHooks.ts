import {useNodeInteractionContext} from '../nodes/NodeInteractionContext';
import {useCallback, useMemo, useState} from 'react';

import {useGraphDispatchAndListener, useGraphNumberDispatch} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {useDirectSimRefEditsDispatch} from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import {HasNumberId} from "@/graph-tools/types/types";
import {EmptyArray, TransientIdOffset} from "@/graph-tools/constants";

export function useGraphEditHooks<T extends HasNumberId>(
    listenerKey: string
) {
    const {selected} = useNodeInteractionContext();

    const {incrementSimVersion, nodeListRef, linkListRef} =
        useDirectSimRefEditsDispatch<T>();

    const {currentState: nextNodeId, dispatchWithoutControl: setNextNodeId} =
        useGraphDispatchAndListener(
            "next-node-id",
            listenerKey,
            NaN
        );

    const {currentState: nextLinkId, dispatchWithoutControl: setNextLinkId} =
        useGraphNumberDispatch(
            'next-link-id',
            listenerKey,
            NaN
        );

    const {
        dispatchWithoutControl: setTransientNodeIds,
        currentState: transientNodeIds
    } = useGraphDispatchAndListener('transient-node-ids', listenerKey, EmptyArray);

    const {
        dispatchWithoutControl: setTransientLinkIds,
        currentState: transientLinkIds
    } = useGraphDispatchAndListener('transient-link-ids', listenerKey, EmptyArray);

    const {
        dispatchWithoutControl: setDeletedLinkIds,
        currentState: deletedLinkIds
    } = useGraphDispatchAndListener('deleted-link-ids', listenerKey, EmptyArray);
    const {
        dispatchWithoutControl: setDeletedNodeIds,
        currentState: deletedNodeIds
    } = useGraphDispatchAndListener('deleted-node-ids', listenerKey, EmptyArray);

    const [noNodeSelected, setNoNodeSelected] = useState(false);

    const [deBouncing, setDeBouncing] = useState<boolean>(false);

    const getNextNodeId = useCallback(() => {
        let responseId =
            // nextNodeId === undefined ? TransientIdOffset + 1 : nextNodeId;
            isNaN(nextNodeId) ? TransientIdOffset + 1 : nextNodeId;
        const nodeIdSet = new Set(transientNodeIds);
        while (nodeIdSet.has(responseId)) {
            responseId++;
        }
        setNextNodeId(responseId + 1);
        // setNextNodeId((prev) => responseId + 1);
        return responseId;
    }, [nextNodeId, transientNodeIds, setNextNodeId])
    const getNextLinkId = useCallback(() => {
        let responseId =
            // nextLinkId === undefined ? TransientIdOffset + 1 : nextLinkId;
            isNaN(nextLinkId) ? TransientIdOffset + 1 : nextLinkId;
        const linkIdSet = new Set(transientLinkIds);
        while (linkIdSet.has(responseId)) {
            responseId++;
        }
        setNextLinkId(responseId + 1);
        return responseId;
    }, [nextLinkId, transientLinkIds, setNextLinkId]);

    const checkForSelectedNodes = useCallback((minimum: number = 1) => {
        if (selected.length < minimum) {
            if (!noNodeSelected) {
                setNoNodeSelected(true);
                setTimeout(() => {
                    if (setNoNodeSelected) setNoNodeSelected(false);
                }, 2000);
            }
            return false;
        } else return true;
    }, [selected, noNodeSelected])

    const deBounce = () => {
        setDeBouncing(true);
        setTimeout(() => setDeBouncing(false), 250);
    };

    return {
        nodeListRef,
        linkListRef,
        selected,
        incrementSimVersion,
        setTransientNodeIds,
        transientNodeIds,
        setTransientLinkIds,
        transientLinkIds,
        checkForSelectedNodes,
        noNodeSelected,
        deBouncing,
        deBounce,
        getNextLinkId,
        getNextNodeId,
        setDeletedLinkIds,
        deletedLinkIds,
        setDeletedNodeIds,
        deletedNodeIds
    };
}
