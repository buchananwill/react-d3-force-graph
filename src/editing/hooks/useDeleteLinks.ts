import { useGraphEditHooks } from "../../hooks";
import { useMemo } from "react";
import { HasNumberId } from "../../types";
import { useGraphController } from "../../hooks";
import { GraphSelectiveContextKeys } from "../../literals";
import { useEffectSyncToMemo } from "./useAddLinks";

const deleteLinksKey = "delete-links";

export function useDeleteLinks<T extends HasNumberId>() {
  const {
    nodeListRef,
    linkListRef,
    dispatchNextSimVersion,
    setDeletedLinkIds,
  } = useGraphEditHooks<T>(deleteLinksKey);

  const memoizedDelete = useMemo(() => {
    const deleteThem = (linksTodelete: string[]) => {
      if (nodeListRef === null || linkListRef === null) return;

      const remainingLinks = linkListRef.current.filter(
        (l) => !linksTodelete.includes(l.id),
      );

      setDeletedLinkIds((deletedLinkIds) => [
        ...deletedLinkIds,
        ...linksTodelete,
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
