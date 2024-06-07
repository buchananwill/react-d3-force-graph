import { useMemo } from "react";

import {
  useGraphController,
  useGraphEditHooks,
  useGraphListener,
} from "../../hooks";

import { createNodes } from "../functions/createNodes";
import { createLinks } from "../functions/createLinks";
import {
  AddNodesParams,
  DataLink,
  DataNode,
  HasNumberId,
  MemoizedFunction,
  Relation,
} from "../../types";
import { GraphSelectiveContextKeys, undefinedCloneNode } from "../../literals";
import { useEffectSyncToMemo } from "./useEffectSyncToMemo";

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

  const { currentState: templateNode } = useGraphListener<
    DataNode<T> | undefined
  >(GraphSelectiveContextKeys.templateNode, addNodesController, undefined);
  const { currentState: templateLink } = useGraphListener<
    DataLink<T> | undefined
  >(GraphSelectiveContextKeys.templateLink, addNodesController, undefined);

  const handleCreateNodes = useMemo(
    () =>
      (
        sourceNodes: DataNode<T>[],
        relation: Relation,
        allNodes: DataNode<T>[],
        allLinks: DataLink<T>[],
      ): [DataNode<T>[], DataLink<T>[], DataNode<T>[], DataLink<T>[]] => {
        if (templateNode === undefined)
          throw Error("No template node defined.");
        const templates = sourceNodes.length > 0 ? sourceNodes : [templateNode];
        const { allNodes: allNodesUpdate, createdNodes } = createNodes({
          getNextNodeId, // Use a private scoped variable to make this function re-render-proof
          sourceNodes: templates,
          allNodes,

          relation,
          cloneFunction: memoizedFunction,
        });

        const { allLinksUpdated, newLinks } = createLinks<T>({
          references: templates,
          newNodes: createdNodes,
          allLinks,
          getNextLinkId,
          relation: relation,
          templateLink,
        });

        return [allNodesUpdate, allLinksUpdated, createdNodes, newLinks];
      },
    [memoizedFunction, getNextLinkId, getNextNodeId],
  );

  const addNodes = useMemo(() => {
    const add = ({ sourceNodeIdList, relation }: AddNodesParams) => {
      if (nodeListRef === null || linkListRef === null) return;

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
