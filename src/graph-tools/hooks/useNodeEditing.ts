'use client';
import React from 'react';

import {useNodeCloneFunctionController} from './useNodeCloneFunctionController';
import {useGraphEditHooks} from './useGraphEditHooks';
import {mapLinkBackToIdRefs} from '../links/map-link-back-to-id-refs';

import {UnsavedNodeChangesProps} from '../graph/NodeLinkRefWrapper';
import {useShowNodeEditing} from '../ShowNodeEditing';
import {TransientIdOffset} from "@/graph-tools/constants";
import {useGraphDispatchAndListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {
  CachedFunction,
  DataLink,
  DataNode,
  GraphDto,
  GraphDtoPutRequestBody,
  HasNumberId
} from "@/graph-tools/types/types";

function removeTransientId(id: number) {
  return id < TransientIdOffset;
}
const listenerKey = 'use-edit-component';

export function useNodeEditing<T extends HasNumberId>(
  nodesRef: React.MutableRefObject<DataNode<T>[]>,
  linksRef: React.MutableRefObject<DataLink<T>[]>,
  cloneFunction: CachedFunction<DataNode<T>, DataNode<T>>,
  putUpdatedGraph: (
    updatedGraph: GraphDtoPutRequestBody<T>
  ) => Promise<any>
): UnsavedNodeChangesProps {
  let {dispatchWithoutControl, currentState} = useGraphDispatchAndListener<boolean>('unsaved-node-data', listenerKey, false);

  useShowNodeEditing(true);
  useNodeCloneFunctionController(cloneFunction);

  const { deletedLinkIds, deletedNodeIds } = useGraphEditHooks(listenerKey);

  const handleSaveGraph = () => {
    const nodes = nodesRef.current;
    const links = linksRef.current;
    if (links && nodes) {
      const linksWithNumberIdRefs = links.map(mapLinkBackToIdRefs);
      const updatedGraph: GraphDto<T> = {
        nodes: nodes,
        closureDtos: linksWithNumberIdRefs
      };
      console.log(updatedGraph);
      const deletedLinkNonTransientIds =
        deletedLinkIds.filter(removeTransientId);
      const deletedNodeNonTransientIds =
        deletedNodeIds.filter(removeTransientId);

      const request: GraphDtoPutRequestBody<T> = {
        graphDto: updatedGraph,
        deletedClosureIdList: deletedLinkNonTransientIds,
        deletedNodeIdList: deletedNodeNonTransientIds
      };

      putUpdatedGraph(request).then((r) => {
        if (r.status == 200) {
        }
      });

      dispatchWithoutControl(false)

    }
  };
  return {
    unsavedChanges: currentState,
    onConfirm: handleSaveGraph
  };
}
