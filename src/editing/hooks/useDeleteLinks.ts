import { useGraphEditHooks } from "../../hooks";
import { useMemo } from "react";
import { HasNumberId } from "../../types";
import { useGraphController } from "../../hooks";
import { GraphSelectiveContextKeys } from "../../literals";

import { useEffectSyncToMemo } from "./useEffectSyncToMemo";

const deleteLinksKey = "delete-links";

export function useDeleteLinks<T extends HasNumberId>() {
  const {
    nodeListRef,
    linkListRef,
    dispatchNextSimVersion,
    setDeletedLinkIds,
  } = useGraphEditHooks<T>(deleteLinksKey);

  const memoizedDelete = useMemo(() => {
    const deleteThem = (linksToDelete: string[]) => {
      if (nodeListRef === null || linkListRef === null) return;

      const remainingLinks = linkListRef.current.filter(
        (l) => !linksToDelete.includes(l.id),
      );

      setDeletedLinkIds((deletedLinkIds: string[]) => [
        ...deletedLinkIds,
        ...linksToDelete,
      ]);

      dispatchNextSimVersion(nodeListRef.current, remainingLinks);
    };
    return { memoizedFunction: deleteThem };
  }, [nodeListRef, linkListRef, dispatchNextSimVersion, setDeletedLinkIds]);

  const { dispatch } = useGraphController(
    GraphSelectiveContextKeys.deleteLinks,
    memoizedDelete,
  );

  useEffectSyncToMemo(dispatch, memoizedDelete);
}
