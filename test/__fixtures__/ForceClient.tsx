import {
  AddNodesParams,
  ClosureDto,
  DataLink,
  DataNode,
  DataNodeDto,
  DirectSimRefEditsDispatchReturn,
  GraphDtoPutRequestBody,
  GraphSelectiveContextKeys,
  HasNumberId,
  MemoizedFunction,
  undefinedAddLinks,
  undefinedAddNodes,
  undefinedDeleteLinks,
  undefinedDeleteNodes,
  undefinedEditNodeData,
  useAllEdits,
  useD3ForceSimulationMemo,
  useDirectSimRefEditsDispatch,
  useGraphListener,
  useNodeEditing,
} from "../../src";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { Organization } from "./adaptors";
import { Simulation } from "d3";
import { cloneOrganizationNode } from "./cloneOrganizationNode";

export interface CallbackData<T extends HasNumberId> {
  listenerKey: MutableRefObject<`${string}-${string}-${string}-${string}-${string}`>;
  simRefFromMemo: MutableRefObject<Simulation<DataNode<T>, DataLink<T>> | null>;
  dispatchReturn: DirectSimRefEditsDispatchReturn<T>;
  addNodes?: MemoizedFunction<AddNodesParams, void>;
  deleteNodes?: MemoizedFunction<string[], void>;
  addLinks?: MemoizedFunction<string[], void>;
  deleteLinks?: MemoizedFunction<string[], void>;
  editNodeData?: MemoizedFunction<T, void>;
  onConfirm?: () => void;
}

export interface ForceClientProps<T extends HasNumberId> {
  callback: (data: CallbackData<T>) => void;
  putUpdatedGraph?: (
    updatedGraph: GraphDtoPutRequestBody<T>,
  ) => Promise<unknown>;
  nodeDtoValidation?: (dataNode: DataNode<T>) => DataNodeDto<T> | undefined;
  closureDtoValidation?: (dataLink: DataLink<T>) => ClosureDto | undefined;
}

export default function ForceClient({
  callback,
  putUpdatedGraph,
  nodeDtoValidation,
  closureDtoValidation,
}: ForceClientProps<Organization>) {
  const listenerKey = useRef(crypto.randomUUID());
  const [simRefFromMemo] = useD3ForceSimulationMemo<Organization>();
  const dispatchReturn = useDirectSimRefEditsDispatch<Organization>(
    listenerKey.current,
  );

  const { onConfirm } = useNodeEditing(
    cloneFunctionWrapper,
    putUpdatedGraph,
    nodeDtoValidation,
    closureDtoValidation,
  );
  useAllEdits();

  const { currentState: addNodes } = useGraphListener(
    GraphSelectiveContextKeys.addNodes,
    listenerKey.current,
    undefinedAddNodes as MemoizedFunction<AddNodesParams, void>,
  );
  const { currentState: deleteNodes } = useGraphListener<
    MemoizedFunction<string[], void>
  >(
    GraphSelectiveContextKeys.deleteNodes,
    listenerKey.current,
    undefinedDeleteNodes,
  );
  const { currentState: deleteLinks } = useGraphListener<
    MemoizedFunction<string[], void>
  >(
    GraphSelectiveContextKeys.deleteLinks,
    listenerKey.current,
    undefinedDeleteLinks,
  );
  const { currentState: addLinks } = useGraphListener<
    MemoizedFunction<string[], void>
  >(GraphSelectiveContextKeys.addLinks, listenerKey.current, undefinedAddLinks);
  const { currentState: editNodeData } = useGraphListener(
    GraphSelectiveContextKeys.editNodeData,
    listenerKey.current,
    undefinedEditNodeData,
  );

  useEffect(() => {
    callback({
      listenerKey,
      dispatchReturn,
      simRefFromMemo,
      addNodes,
      deleteNodes,
      deleteLinks,
      addLinks,
      editNodeData,
      onConfirm,
    });
  }, [
    listenerKey,
    dispatchReturn,
    simRefFromMemo,
    addNodes,
    deleteNodes,
    deleteLinks,
    addLinks,
    editNodeData,
  ]);

  return <div></div>;
}

export const cloneFunctionWrapper = { memoizedFunction: cloneOrganizationNode };
