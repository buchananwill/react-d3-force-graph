import React, { useMemo } from 'react';

import { useGraphEditHooks } from '../../hooks/useGraphEditHooks';
import { GraphEditButton } from './GraphEditButton';

import { createNodes } from '../functions/createNodes';
import { createLinks } from '../functions/createLinks';
import {CloneFunction, DataNode, HasNumberId} from "@/graph-tools/types/types";

export type Relation = 'sibling' | 'child';

const addNodesButton = `add-nodes-button`;

export function AddNodesButton<T extends HasNumberId>({
  children,
  relation,
  cloneFunction
}: {
  relation: Relation;
  children: string;
  cloneFunction: CloneFunction<DataNode<T>>;
}) {
  const buttonListenerKey = useMemo(() => {
    return `${addNodesButton}:${relation}`;
  }, [relation]);
  const {
    nodeListRef,
    linkListRef,
    selected,
    incrementSimVersion,
    setTransientNodeIds,
    transientNodeIds,
    setTransientLinkIds,
    transientLinkIds,
    checkForSelectedNodes,
    noNodeSelected,
    deBouncing,
    deBounce,
    getNextLinkId,
    getNextNodeId
  } = useGraphEditHooks<T>(buttonListenerKey);

  if (nodeListRef === null || linkListRef === null) return <></>;

  const handleAddNode = () => {
    if (!checkForSelectedNodes()) return;

    const refNodes = nodeListRef.current.filter((n) => selected.includes(n.id));

    const nextNodeToSubmit = getNextNodeId();
    const { allNodes, createdNodes } = createNodes({
      startIdAt: nextNodeToSubmit,
      targetNodes: refNodes,
      allNodes: nodeListRef.current,
      relation,
      cloneFunction
    });

    setTransientNodeIds([
      ...transientNodeIds,
      ...createdNodes.map((n) => n.id)
    ]);

    const nextLinkIdToSubmit = getNextLinkId();

    const { allUpdatedLinks, newLinks } = createLinks<T>({
      references: refNodes,
      newNodes: createdNodes,
      allLinks: linkListRef.current,
      linkIdSequenceStart: nextLinkIdToSubmit,
      relation: relation
    });

    const newLinkIds = newLinks.map((l) => l.id);

    setTransientLinkIds([...transientLinkIds, ...newLinkIds]);

    deBounce();

    // linkListRef.current = resetLinks(allUpdatedLinks);
    linkListRef.current = [...allUpdatedLinks];
    nodeListRef.current = allNodes;

    incrementSimVersion();
  };

  return (
    <GraphEditButton
      onClick={handleAddNode}
      disabled={deBouncing}
      noNodeSelected={noNodeSelected}
    >
      {children}
    </GraphEditButton>
  );
}
