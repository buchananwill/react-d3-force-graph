import { GraphEditButton } from "./GraphEditButton";
import { useGraphEditHooks } from "../../hooks/useGraphEditHooks";
import React from "react";
import { deleteLinks } from "../functions/deleteLinks";
import { HasNumberId } from "@/graph-tools/types/types";

const deleteLinksKey = "delete-links";

export function DeleteLinksButton<T extends HasNumberId>({
  children,
}: {
  children: string;
}) {
  const {
    nodeListRef,
    linkListRef,
    dispatchNextSimVersion,
    deBounce,
    deBouncing,
    checkForSelectedNodes,
    noNodeSelected,
    selected,
    deletedLinkIds,
    setDeletedLinkIds,
  } = useGraphEditHooks<T>(deleteLinksKey);

  if (linkListRef === null) return <></>;

  const handleDeleteLinks = () => {
    if (nodeListRef === undefined || nodeListRef === null) return;
    if (!checkForSelectedNodes(1)) return;
    const mode = selected.length === 1 ? "any" : "all";
    const { toDelete, remainingLinks } = deleteLinks(
      linkListRef.current,
      selected,
      mode,
    );
    setDeletedLinkIds([...deletedLinkIds, ...toDelete]);
    deBounce();
    nodeListRef.current = [...nodeListRef.current];
    // linkListRef.current = resetLinks(remainingLinks);
    linkListRef.current = [...remainingLinks];
    dispatchNextSimVersion();
  };
  return (
    <GraphEditButton
      noNodeSelected={noNodeSelected}
      onClick={handleDeleteLinks}
      disabled={deBouncing}
    >
      {children}
    </GraphEditButton>
  );
}
