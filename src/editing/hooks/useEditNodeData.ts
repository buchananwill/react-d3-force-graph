import { useGraphController, useGraphEditHooks } from "../../hooks";
import { useMemo } from "react";
import { HasNumberId } from "../../types";
import { GraphSelectiveContextKeys } from "../../literals";
import { getAnyIdAsString } from "../../functions/utils";
import { useEffectSyncToMemo } from "./useEffectSyncToMemo";

export function useEditNodeData<T extends HasNumberId>() {
  const { nodeListRef, linkListRef, dispatchNextSimVersion } =
    useGraphEditHooks("edit-node-data-controller");

  const memoizedEditNodeData = useMemo(() => {
    const replaceNodeData = (data: T) => {
      if (nodeListRef === null || linkListRef === null) return;

      const nextNodeList = nodeListRef.current.map((n) => {
        if (n.id !== getAnyIdAsString(data)) return n;
        else return { ...n, data };
      });
      dispatchNextSimVersion(nextNodeList, linkListRef.current);
    };

    return { memoizedFunction: replaceNodeData };
  }, [nodeListRef, linkListRef, dispatchNextSimVersion]);

  const { dispatch } = useGraphController(
    GraphSelectiveContextKeys.editNodeData,
    memoizedEditNodeData,
  );

  useEffectSyncToMemo(dispatch, memoizedEditNodeData);
}
