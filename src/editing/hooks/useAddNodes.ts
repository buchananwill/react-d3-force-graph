import { useMemo } from "react";

import {
  useGraphController,
  useGraphEditHooks,
  useGraphListener,
} from "../../hooks";

import { createNodes } from "../functions/createNodes";
import { createLinks } from "../functions/createLinks";
import { DataLink, DataNode, HasNumberId, MemoizedFunction } from "../../types";
import { GraphSelectiveContextKeys, undefinedCloneNode } from "../../literals";
import { dispatch } from "d3";
import { useEffectSyncToMemo } from "./useEffectSyncToMemo";

export type Relation = "sibling" | "child";

const addNodesController = `add-nodes-controller`;

export function useAddNodes<T extends HasNumberId>() {
  const {
    nodeListRef,
    linkListRef,
    dispatchNextSimVersion,
    setTransientNodeIds,
    setTransientLinkIds,
    getNextLinkId,
    getNextNodeId,
  } = useGraphEditHooks<T>(addNodesController);
  const {
    currentState: { memoizedFunction },
  } = useGraphListener<MemoizedFunction<DataNode<T>, DataNode<T>>>(
    GraphSelectiveContextKeys.nodeCloneFunction,
    addNodesController,
    undefinedCloneNode,
  );

  const handleCreateNodes = useMemo(
    () =>
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
          cloneFunction: memoizedFunction,
        });

        const { allLinksUpdated, newLinks } = createLinks<T>({
          references: sourceNodes,
          newNodes: createdNodes,
          allLinks,
          getNextLinkId,
          relation: relation,
        });

        return [allNodesUpdate, allLinksUpdated, createdNodes, newLinks];
      },
    [memoizedFunction, getNextLinkId, getNextNodeId],
  );

  const addNodes = useMemo(() => {
    const add = ({ sourceNodeIdList, relation }: AddNodesParams) => {
      console.log(nodeListRef, linkListRef);
      if (nodeListRef === null || linkListRef === null) return;
      console.log("Adding Nodes");

      const sourceNodes = nodeListRef.current.filter((n) =>
        sourceNodeIdList.includes(n.id),
      );

      const [allNodes, allLinks, newNodes, newLinks] = handleCreateNodes(
        sourceNodes,
        relation,
        nodeListRef.current,
        linkListRef.current,
      );

      setTransientNodeIds((transientNodeIds) => [
        ...transientNodeIds,
        ...newNodes.map((n) => n.id),
      ]);
      setTransientLinkIds((transientLinkIds) => [
        ...transientLinkIds,
        ...newLinks.map((l) => l.id),
      ]);

      console.log("before dispatching next version:", linkListRef, nodeListRef);
      dispatchNextSimVersion(allNodes, allLinks);
    };
    return { memoizedFunction: add };
  }, [
    dispatchNextSimVersion,
    nodeListRef,
    linkListRef,
    handleCreateNodes,
    setTransientNodeIds,
    setTransientLinkIds,
  ]);

  const { dispatch } = useGraphController(
    GraphSelectiveContextKeys.addNodes,
    addNodes,
  );

  useEffectSyncToMemo(dispatch, addNodes);
}

export interface AddNodesParams {
  sourceNodeIdList: string[];
  relation: Relation;
}
