import { useGraphEditHooks } from "../../hooks/useGraphEditHooks";
import { useMemo } from "react";
import { GraphEditButton } from "./GraphEditButton";

import { deleteLinks } from "../functions/deleteLinks";

import { HasNumberId } from "@/graph-tools/types/types";
import { deleteNodes } from "@/graph-tools/flow-node-editing/buttons/deleteNodes";
import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";

const deleteNodesKey = "delete-nodes";

export function useDeleteNodes<T extends HasNumberId>({
  children,
}: {
  children: string;
}) {
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
  }, []);

  useGraphController(GraphSelectiveContextKeys.deleteNodes);
}
