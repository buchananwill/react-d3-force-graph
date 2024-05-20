import { useGraphEditHooks } from "../../hooks";
import { useMemo } from "react";

import { deleteLinks } from "../functions/deleteLinks";

import { HasNumberId } from "../../types";
import { deleteNodes } from "../functions/deleteNodes";
import { useGraphController } from "../../hooks";
import { GraphSelectiveContextKeys } from "../../literals";

const deleteNodesKey = "delete-nodes";

export function useDeleteNodes<T extends HasNumberId>() {
  const deleteNodesMemoKey = useMemo(() => {
    return deleteNodesKey;
  }, []);
  const {
    dispatchNextSimVersion,
    setDeletedLinkIds,
    linkListRef,
    nodeListRef,
    setDeletedNodeIds,
  } = useGraphEditHooks<T>(deleteNodesMemoKey);

  const memoizedDeleteNodes = useMemo(() => {
    const handleDeleteNodes = (idList: string[]) => {
      if (nodeListRef === null || linkListRef === null) return;
      const { remainingNodes, nodesForDeletion } = deleteNodes(
        idList,
        nodeListRef.current,
      );

      const { remainingLinks, toDelete } = deleteLinks<T>(
        linkListRef.current,
        idList,
        "any",
      );

      setDeletedNodeIds((deletedNodeIds) => [
        ...deletedNodeIds,
        ...nodesForDeletion,
      ]);
      setDeletedLinkIds((deletedLinkIds) => [...deletedLinkIds, ...toDelete]);

      dispatchNextSimVersion(remainingNodes, remainingLinks);
    };

    return { memoizedFunction: handleDeleteNodes };
  }, [
    dispatchNextSimVersion,
    linkListRef,
    nodeListRef,
    setDeletedNodeIds,
    setDeletedLinkIds,
  ]);

  useGraphController(
    GraphSelectiveContextKeys.deleteNodes,
    memoizedDeleteNodes,
  );
}
