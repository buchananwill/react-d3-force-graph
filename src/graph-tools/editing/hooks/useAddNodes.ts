import { useCallback, useMemo } from "react";

import { useGraphEditHooks } from "../../hooks/useGraphEditHooks";

import { createNodes } from "@/graph-tools/editing/functions/createNodes";
import { createLinks } from "@/graph-tools/editing/functions/createLinks";
import {
  DataLink,
  DataNode,
  HasNumberId,
  MemoizedFunction,
} from "@/graph-tools/types/util";
import {
  useGraphController,
  useGraphListener,
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { undefinedCloneNode } from "@/graph-tools/literals/undefinedFunctionErrors";

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

  const handleCreateNodes = useCallback(
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

  useGraphController(GraphSelectiveContextKeys.addNodes, addNodes);
}

export interface AddNodesParams {
  sourceNodeIdList: string[];
  relation: Relation;
}