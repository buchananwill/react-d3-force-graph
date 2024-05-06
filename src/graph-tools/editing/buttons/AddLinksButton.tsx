import { useGraphEditHooks } from '../../hooks/useGraphEditHooks';
import React, { useMemo } from 'react';
import { GraphEditButton } from './GraphEditButton';

import { createLinks } from '../functions/createLinks';
import {DataLink, HasNumberId} from "@/graph-tools/types/types";
const joinNodes = 'join-nodes';
export default function AddLinksButton<T extends HasNumberId>({
  children
}: {
  children: string;
}) {
  const buttonListenerKey = useMemo(() => {
    return joinNodes;
  }, []);
  const {
    selected,
    linkListRef,
    nodeListRef,
    getNextLinkId,
    setTransientLinkIds,
    transientLinkIds,
    noNodeSelected,
    checkForSelectedNodes,
    deBounce,
    deBouncing,
    incrementSimVersion
  } = useGraphEditHooks<T>(buttonListenerKey);

  if (nodeListRef === null || linkListRef === null) return <></>;

  const handleAddLinks = () => {
    if (!checkForSelectedNodes(2)) return;
    const nodesFilteredForSelectionAndSortedByDepth = nodeListRef.current
      .filter((n) => selected.includes(n.id))
      .sort((n1, n2) => {
        const depthComparison = n1.distanceFromRoot - n2.distanceFromRoot;
        if (depthComparison !== 0) return depthComparison;
        else return n1.id - n2.id;
      });

    const parent = nodesFilteredForSelectionAndSortedByDepth.slice(0, 1);
    const children = nodesFilteredForSelectionAndSortedByDepth.slice(1);

    let nextLinkId = getNextLinkId();
    let allNewLinks = [] as DataLink<T>[];
    let allLinks = linkListRef.current;
    for (let child of children) {
      const singleton = [child];
      const { newLinks, allUpdatedLinks } = createLinks({
        references: parent,
        newNodes: singleton,
        allLinks: allLinks,
        linkIdSequenceStart: nextLinkId,
        relation: 'child'
      });
      nextLinkId = nextLinkId + newLinks.length;
      allNewLinks = [...allNewLinks, ...newLinks];
      allLinks = allUpdatedLinks;
    }

    const newLinkIds = allNewLinks.map((l) => l.id);

    setTransientLinkIds([...transientLinkIds, ...newLinkIds]);
    nodeListRef.current = [...nodeListRef.current];
    // linkListRef.current = resetLinks([...allLinks]);
    linkListRef.current = [...allLinks];
    incrementSimVersion();

    deBounce();
  };

  return (
    <GraphEditButton
      noNodeSelected={noNodeSelected}
      onClick={handleAddLinks}
      disabled={deBouncing}
    >
      {children}
    </GraphEditButton>
  );
}
