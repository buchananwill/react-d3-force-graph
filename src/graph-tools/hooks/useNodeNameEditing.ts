import { useDirectSimRefEditsDispatch } from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import { DataNode, HasName, HasNumberId } from "@/graph-tools/types/types";
import { useGlobalController } from "selective-context";
import { useCallback } from "react";

export function useNodeNameEditing<T extends HasNumberId & HasName>(
  node: DataNode<T>,
  componentListenerKey: string,
) {
  const contextKey = `node:${node.id}:rename`;
  const { currentState, dispatch: dispatchUpdate } =
    useGlobalController<string>({
      contextKey: contextKey,
      listenerKey: componentListenerKey,
      initialValue: node.data.name,
    });

  const index = node.index;

  const { nodeListRef, dispatchNextSimVersion, linkListRef } =
    useDirectSimRefEditsDispatch<T>(componentListenerKey);
  const handleConfirmRename = useCallback(() => {
    if (nodeListRef && linkListRef && index !== undefined) {
      const currentElement = nodeListRef.current[index];
      if (currentElement && currentElement.data) {
        currentElement.data.name = currentState;
        dispatchNextSimVersion();
      }
    }
  }, [index, nodeListRef, linkListRef, currentState, dispatchNextSimVersion]);

  const handleCancelRename = useCallback(() => {
    dispatchUpdate(node.data.name);
  }, [dispatchUpdate, node]);

  return {
    handleConfirmRename,
    handleCancelRename,
    contextKey,
  };
}
