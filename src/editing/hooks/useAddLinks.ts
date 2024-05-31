import { useGraphController, useGraphEditHooks } from "../../hooks";
import { useMemo } from "react";

import { createLinks } from "../functions/createLinks";
import { DataLink, HasNumberId } from "../../types";
import { GraphSelectiveContextKeys } from "../../literals";
import { useEffectSyncToMemo } from "./useEffectSyncToMemo";

const addLinksController = "add-links-controller";

export function useAddLinks<T extends HasNumberId>() {
  const {
    linkListRef,
    nodeListRef,
    getNextLinkId,
    setTransientLinkIds,
    dispatchNextSimVersion,
  } = useGraphEditHooks<T>(addLinksController);

  const memoizedAddLinks = useMemo(() => {
    const addLinks = (nodeIdList: string[]) => {
      if (nodeListRef === null || linkListRef === null) return;
      const nodesFilteredForSelectionAndSortedByListOrder = nodeListRef.current
        .filter((n) => nodeIdList.includes(n.id))
        .sort((n1, n2) => {
          return nodeIdList.indexOf(n1.id) - nodeIdList.indexOf(n2.id);
        });

      const parent = nodesFilteredForSelectionAndSortedByListOrder.slice(0, 1);
      const children = nodesFilteredForSelectionAndSortedByListOrder.slice(1);

      let allNewLinks = [] as DataLink<T>[];
      let allLinks = linkListRef.current;
      for (const child of children) {
        const singleton = [child];
        const { newLinks, allLinksUpdated } = createLinks({
          references: parent,
          newNodes: singleton,
          allLinks: allLinks,
          getNextLinkId,
          relation: "child",
        });
        allNewLinks = [...allNewLinks, ...newLinks];
        allLinks = allLinksUpdated;
      }

      const newLinkIds = allNewLinks.map((l) => l.id);

      setTransientLinkIds((transientLinkIds) => [
        ...transientLinkIds,
        ...newLinkIds,
      ]);

      dispatchNextSimVersion(nodeListRef.current, allLinks);
    };
    return { memoizedFunction: addLinks };
  }, [
    dispatchNextSimVersion,
    linkListRef,
    nodeListRef,
    getNextLinkId,
    setTransientLinkIds,
  ]);

  const { dispatch } = useGraphController(
    GraphSelectiveContextKeys.addLinks,
    memoizedAddLinks,
  );
  useEffectSyncToMemo(dispatch, memoizedAddLinks);
}
