/* eslint-disable */
"use client";

import { useCallback } from "react";
import { useNodeCloneFunctionController } from "./useNodeCloneFunctionController";
import {
  EmptyArray,
  GraphSelectiveContextKeys,
  TransientIdOffset,
} from "../literals";
import {
  useGraphDispatchAndListener,
  useGraphListener,
} from "./useGraphSelectiveContext";
import {
  ClosureDto,
  DataLink,
  DataNode,
  DataNodeDto,
  GraphDto,
  GraphDtoPutRequestBody,
  HasNumberId,
  MemoizedFunction,
  UnsavedNodeChangesProps,
} from "../types";
import { useShowNodeEditing } from "./useShowNodeEditing";
import { useGraphRefs } from "./useGraphRefs";
import { getNumberFromStringId, isNotUndefined } from "../functions/utils";
import { mapLinkBackToClosureDto } from "../functions/mapLinkBackToClosureDto";

function removeTransientId(id: number) {
  return id < TransientIdOffset;
}

export function reMapNodeIdWithoutValidating<T extends HasNumberId>(
  node: DataNode<T>,
) {
  return {
    ...node,
    id: getNumberFromStringId(node.id),
  };
}

const listenerKey = "use-edit-component";

export function useNodeEditing<T extends HasNumberId>(
  cloneFunction: MemoizedFunction<DataNode<T>, DataNode<T>>,
  putUpdatedGraph?: (
    updatedGraph: GraphDtoPutRequestBody<T>,
  ) => Promise<unknown>,
  nodeDtoValidation?: (dataNode: DataNode<T>) => DataNodeDto<T> | undefined,
  closureDtoValidation?: (dataLink: DataLink<T>) => ClosureDto | undefined,
): UnsavedNodeChangesProps {
  const { dispatchWithoutControl, currentState } =
    useGraphDispatchAndListener<boolean>(
      "unsaved-node-data",
      listenerKey,
      false,
    );
  const { nodeListRef, linkListRef } = useGraphRefs<T>();

  useShowNodeEditing(true);
  useNodeCloneFunctionController(cloneFunction);

  const { currentState: deletedLinkIds } = useGraphListener(
    GraphSelectiveContextKeys.deletedLinkIds,
    listenerKey,
    EmptyArray,
  );
  const { currentState: deletedNodeIds } = useGraphListener(
    GraphSelectiveContextKeys.deletedNodeIds,
    listenerKey,
    EmptyArray,
  );

  const handleSaveGraph = useCallback(() => {
    if (!(nodeListRef && linkListRef && putUpdatedGraph)) return;
    const nodes = nodeListRef.current;
    const links = linkListRef.current;
    if (links && nodes) {
      const reMapLinks = closureDtoValidation ?? mapLinkBackToClosureDto;
      const reMapNodes = nodeDtoValidation ?? reMapNodeIdWithoutValidating;
      const linksWithNumberIdRefs = links
        .map(reMapLinks)
        .filter(isNotUndefined);
      const dataNodeDtoList = nodes.map(reMapNodes).filter(isNotUndefined);
      const updatedGraph: GraphDto<T> = {
        nodes: dataNodeDtoList,
        closureDtos: linksWithNumberIdRefs,
      };
      const deletedLinkNonTransientIds =
        deletedLinkIds.filter(removeTransientId);
      const deletedNodeNonTransientIds =
        deletedNodeIds.filter(removeTransientId);

      const request: GraphDtoPutRequestBody<T> = {
        graphDto: updatedGraph,
        deletedClosureIdList: deletedLinkNonTransientIds,
        deletedNodeIdList: deletedNodeNonTransientIds,
      };
      putUpdatedGraph(request).then((r) => {
        // if (r.status == 200) {
        // TODO: handle the happy and sad paths.
        // Would need a function parameter that can update the client state with the received data - effectively replacing the state, since we cannot provide any guarantees about matching up new entities with unknown IDs.
        // }
      });

      dispatchWithoutControl(false);
    }
  }, [
    deletedLinkIds,
    deletedNodeIds,
    linkListRef,
    nodeListRef,
    dispatchWithoutControl,
    putUpdatedGraph,
  ]);
  return {
    unsavedChanges: currentState,
    onConfirm: handleSaveGraph,
  };
}
