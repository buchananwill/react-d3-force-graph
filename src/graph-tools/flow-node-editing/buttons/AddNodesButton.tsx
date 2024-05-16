import React, { useCallback, useMemo } from "react";

import { useGraphEditHooks } from "../../hooks/useGraphEditHooks";
import { GraphEditButton } from "./GraphEditButton";

import { createNodes } from "../functions/createNodes";
import { createLinks } from "../functions/createLinks";
import {
  CloneFunction,
  DataLink,
  DataNode,
  HasNumberId,
} from "@/graph-tools/types/types";

export type Relation = "sibling" | "child";

const addNodesButton = `add-nodes-button`;

export function useAddNodes<T extends HasNumberId>({
  children,
  cloneFunction,
}: {
  relation: Relation;
  children: string;
  cloneFunction: CloneFunction<DataNode<T>>;
}) {
  const buttonListenerKey = useMemo(() => {
    return `${addNodesButton}`;
  }, []);
  const {
    nodeListRef,
    linkListRef,
    incrementSimVersion,
    setTransientNodeIds,
    setTransientLinkIds,
    getNextLinkId,
    getNextNodeId,
  } = useGraphEditHooks<T>(buttonListenerKey);

  if (nodeListRef === null || linkListRef === null) return <></>;

  const handleAddNodes = useCallback(
    (
      sourceNodes: DataNode<T>[],
      relation: Relation,
      allNodes: DataNode<T>[],
      allLinks: DataLink<T>[],
    ): [DataNode<T>[], DataLink<T>[], DataNode<T>[], DataLink<T>[]] => {
      const { allNodes: allNodesUpdate, createdNodes } = createNodes({
        getNextNodeId, // Use a private scoped variable to make this function re-render-proof
        sourceNodes,
        allNodes,
        relation,
        cloneFunction,
      });

      const { allUpdatedLinks, newLinks } = createLinks<T>({
        references: sourceNodes,
        newNodes: createdNodes,
        allLinks,
        getNextLinkId,
        relation: relation,
      });

      return [allNodes, allUpdatedLinks, createdNodes, newLinks];
    },
    [],
  );

  const handleUpdateState = useCallback(
    (
      sourceNodes: DataNode<T>[],
      relation: Relation,
      allNodesCurrent: DataNode<T>[],
      allLinksCurrent: DataLink<T>[],
    ) => {
      const [allNodes, allLinks, newNodes, newLinks] = handleAddNodes(
        sourceNodes,
        relation,
        allNodesCurrent,
        allLinksCurrent,
      );

      setTransientNodeIds((transientNodeIds) => [
        ...transientNodeIds,
        ...newNodes.map((n) => n.id),
      ]);
      setTransientLinkIds((transientLinkIds) => [
        ...transientLinkIds,
        ...newLinks.map((l) => l.id),
      ]);

      linkListRef.current = [...allLinks];
      nodeListRef.current = allNodes;
      incrementSimVersion();
    },
    [],
  );
}
