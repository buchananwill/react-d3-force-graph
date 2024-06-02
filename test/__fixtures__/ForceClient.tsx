import {
  AddNodesParams,
  DataLink,
  DataNode,
  DirectSimRefEditsDispatchReturn,
  GraphDtoPutRequestBody,
  GraphSelectiveContextKeys,
  HasNumberId,
  MemoizedFunction,
  undefinedAddLinks,
  undefinedAddNodes,
  undefinedDeleteLinks,
  undefinedDeleteNodes,
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
}

export interface ForceClientProps<T extends HasNumberId> {
  callback: (data: CallbackData<T>) => void;
  putUpdatedGraph?: (
    updatedGraph: GraphDtoPutRequestBody<T>,
  ) => Promise<unknown>;
}

export default function ForceClient({
  callback,
  putUpdatedGraph,
}: ForceClientProps<Organization>) {
  const listenerKey = useRef(crypto.randomUUID());
  const [simRefFromMemo] = useD3ForceSimulationMemo<Organization>();
  const dispatchReturn = useDirectSimRefEditsDispatch<Organization>(
    listenerKey.current,
  );

  useNodeEditing(cloneFunctionWrapper, putUpdatedGraph);
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

  useEffect(() => {
    callback({
      listenerKey,
      dispatchReturn,
      simRefFromMemo,
      addNodes,
      deleteNodes,
      deleteLinks,
      addLinks,
    });
  }, [
    listenerKey,
    dispatchReturn,
    simRefFromMemo,
    addNodes,
    deleteNodes,
    deleteLinks,
    addLinks,
  ]);

  return <div></div>;
}

export const cloneFunctionWrapper = { memoizedFunction: cloneOrganizationNode };
