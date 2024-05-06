import { useGraphEditHooks } from '../../hooks/useGraphEditHooks';
import React from 'react';
import { GraphEditButton } from './GraphEditButton';
import { createLinks } from '../functions/createLinks';
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";

const InvertLinksKey = 'invert-links';

export default function InvertLinksButton<T extends HasNumberId>({
  children
}: {
  children: string;
}) {
  const {
    selected,
    linkListRef,
    nodeListRef,
    getNextLinkId,
    setTransientLinkIds,
    setDeletedLinkIds,
    deletedLinkIds,
    transientLinkIds,
    noNodeSelected,
    checkForSelectedNodes,
    deBounce,
    deBouncing,
    incrementSimVersion
  } = useGraphEditHooks<T>(InvertLinksKey);

  if (nodeListRef === null || linkListRef === null) return <></>;

  // Only operates on links where both nodes are selected.
  const handleInvertLinks = () => {
    if (!checkForSelectedNodes(2)) return;

    if (linkListRef.current.length == 0) return;

    const linksToKeep: DataLink<T>[] = [];
    const linksToInvert: DataLink<T>[] = [];

    linkListRef.current.forEach((l) => {
      if (
        selected.includes((l.source as DataNode<T>).id) &&
        selected.includes((l.target as DataNode<T>).id)
      ) {
        linksToInvert.push(l);
      } else {
        linksToKeep.push(l);
      }
    });

    let nextLinkId = getNextLinkId();

    const childToParent: DataNode<T>[] = [];
    const parentToChild: DataNode<T>[] = [];
    for (let link of linksToInvert) {
      const child = link.source as DataNode<T>;
      const parent = link.target as DataNode<T>;
      childToParent.push(child);
      parentToChild.push(parent);
    }

    const linksToDelete = linksToInvert.map((l) => l.id);

    const { newLinks, allUpdatedLinks } = createLinks({
      references: childToParent,
      newNodes: parentToChild,
      allLinks: linksToKeep,
      linkIdSequenceStart: nextLinkId,
      relation: 'child',
      templateLink: linkListRef.current[0]
    });

    const newLinkIds = newLinks.map((l) => l.id);
    setDeletedLinkIds([...deletedLinkIds, ...linksToDelete]);
    setTransientLinkIds([...transientLinkIds, ...newLinkIds]);
    nodeListRef.current = [...nodeListRef.current];
    // linkListRef.current = resetLinks([...allUpdatedLinks]);
    linkListRef.current = [...allUpdatedLinks];
    incrementSimVersion();

    deBounce();
  };

  return (
    <GraphEditButton
      noNodeSelected={noNodeSelected}
      onClick={handleInvertLinks}
      disabled={deBouncing}
    >
      {children}
    </GraphEditButton>
  );
}
