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
  DataNode,
  GraphDto,
  GraphDtoPutRequestBody,
  HasNumberId,
  MemoizedFunction,
  UnsavedNodeChangesProps,
} from "../types";
import { useShowNodeEditing } from "./useShowNodeEditing";
import { useGraphRefs } from "./useGraphRefs";
import { getNumberFromStringId } from "../functions/utils";
import { mapLinksBackToClosureDtos } from "../functions/mapLinksBackToClosureDtos";

function removeTransientId(id: number) {
  return id < TransientIdOffset;
}

const listenerKey = "use-edit-component";

export function useNodeEditing<T extends HasNumberId>(
  cloneFunction: MemoizedFunction<DataNode<T>, DataNode<T>>,
  putUpdatedGraph?: (updatedGraph: GraphDtoPutRequestBody<T>) => Promise<any>,
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
      const linksWithNumberIdRefs = links.map(mapLinksBackToClosureDtos);
      const dataNodeDtoList = nodes.map((n) => ({
        ...n,
        id: getNumberFromStringId(n.id),
      }));
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
        if (r.status == 200) {
          // TODO: handle the happy and sad paths.
          // Would need a function parameter that can update the client state with the received data - effectively replacing the state, since we cannot provide any guarantees about matching up new entities with unknown IDs.
        }
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
