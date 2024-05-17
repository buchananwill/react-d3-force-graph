import { useGraphEditHooks } from "../../hooks/useGraphEditHooks";
import { useMemo } from "react";
import { GraphEditButton } from "./GraphEditButton";

import { deleteLinks, isNotNull } from "../functions/deleteLinks";

import { DataNode, HasNumberId } from "@/graph-tools/types/types";

const deleteNodesKey = "delete-nodes";

export function deleteNodes<T extends HasNumberId>(
  selected: number[],
  current: DataNode<T>[],
) {
  const selectedNodeIdSet = new Set(selected);
  const nodesForDeletion: number[] = [];
  const remainingNodes = current
    .map((n) => {
      if (selectedNodeIdSet.has(n.id)) {
        nodesForDeletion.push(n.id);
        return null;
      } else {
        return n;
      }
    })
    .filter(isNotNull);
  return { nodesForDeletion, remainingNodes };
}

export function DeleteNodesButton<T extends HasNumberId>({
  children,
}: {
  children: string;
}) {
  const deleteNodesMemoKey = useMemo(() => {
    return deleteNodesKey;
  }, []);
  const {
    deBouncing,
    dispatchNextSimVersion,
    deBounce,
    deletedNodeIds,
    deletedLinkIds,
    setDeletedLinkIds,
    linkListRef,
    selected,
    checkForSelectedNodes,
    noNodeSelected,
    nodeListRef,
    setDeletedNodeIds,
  } = useGraphEditHooks<T>(deleteNodesMemoKey);

  if (nodeListRef?.current == null || linkListRef?.current == null)
    return <></>;

  const handleDeleteNodes = () => {
    if (!checkForSelectedNodes(1)) return;
    const { remainingNodes, nodesForDeletion } = deleteNodes(
      selected,
      nodeListRef.current,
    );
    let linksToDelete: number[] = [];
    let linkCache = [...linkListRef.current];
    for (let number of nodesForDeletion) {
      const { remainingLinks, toDelete } = deleteLinks<T>(
        linkCache,
        [number],
        "any",
      );
      linksToDelete = [...linksToDelete, ...toDelete];
      linkCache = remainingLinks;
    }
    setDeletedNodeIds([...deletedNodeIds, ...nodesForDeletion]);
    setDeletedLinkIds([...deletedLinkIds, ...linksToDelete]);
    deBounce();
    // linkListRef.current = resetLinks(linkCache);
    linkListRef.current = [...linkCache];
    nodeListRef.current = remainingNodes;
    dispatchNextSimVersion();
  };

  return (
    <GraphEditButton
      noNodeSelected={noNodeSelected}
      disabled={deBouncing}
      onClick={handleDeleteNodes}
    >
      {children}
    </GraphEditButton>
  );
}
