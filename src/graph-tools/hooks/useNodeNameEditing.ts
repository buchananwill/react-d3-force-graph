import { useDirectSimRefEditsDispatch } from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import {
  DataNode,
  HasName,
  HasNumberId,
  MemoizedFunction,
} from "@/graph-tools/types/types";
import { useGlobalController } from "selective-context";
import { useCallback } from "react";
import { useGraphListener } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";

export const undefinedEditNodeData = {
  memoizedFunction: () => {
    throw Error("Edit node data function has not been defined.");
  },
};

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

  const {
    currentState: { memoizedFunction: updateData },
  } = useGraphListener(
    GraphSelectiveContextKeys.editNodeData,
    `${componentListenerKey}:rename`,
    undefinedEditNodeData as MemoizedFunction<T, void>,
  );

  useDirectSimRefEditsDispatch<T>(componentListenerKey);
  const handleConfirmRename = useCallback(() => {
    updateData({ ...node.data, name: currentState });
  }, [node, updateData, currentState]);

  const handleCancelRename = useCallback(() => {
    dispatchUpdate(node.data.name);
  }, [dispatchUpdate, node]);

  return {
    handleConfirmRename,
    handleCancelRename,
    contextKey,
  };
}
