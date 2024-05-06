import {useDirectSimRefEditsDispatch} from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import {DataNode, HasName, HasNumberId} from "@/graph-tools/types/types";
import {useGlobalController} from "selective-context";
import {useCallback} from "react";

export function useNodeNameEditing<T extends HasNumberId & HasName>(
    node: DataNode<T>,
    componentListenerKey: string
) {


    const contextKey = `node:${node.id}:rename`;
    const {currentState, dispatch: dispatchUpdate} = useGlobalController<string>(
        {
            contextKey: contextKey,
            listenerKey: componentListenerKey,
            initialValue: node.data.name
        }
    );

    const {nodeListRef, incrementSimVersion, linkListRef} =
        useDirectSimRefEditsDispatch<T>();
    const handleConfirmRename = useCallback(() => {
        if (nodeListRef && linkListRef) {

            const currentElement = nodeListRef.current[node.index!];

            currentElement.data.name = currentState;

            incrementSimVersion();
        }


    }, [node, nodeListRef, linkListRef, currentState, incrementSimVersion])

    const handleCancelRename = useCallback(() => {
        dispatchUpdate(
            node.data.name
        );

    }, [dispatchUpdate, node]);



    return {
    handleConfirmRename, handleCancelRename, contextKey
    };
}