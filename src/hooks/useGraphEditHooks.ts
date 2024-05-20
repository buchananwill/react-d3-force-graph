import {
  useGraphDispatch,
  useGraphDispatchAndListener,
  useGraphListener,
} from "./useGraphSelectiveContext";
import { useDirectSimRefEditsDispatch } from "./useDirectSimRefEditsDispatch";
import { HasNumberId, MemoizedSupplier } from "../types";
import { EmptyArray } from "../literals";
import { GraphSelectiveContextKeys } from "../literals";

export function useGraphEditHooks<T extends HasNumberId>(listenerKey: string) {
  const { dispatchNextSimVersion, nodeListRef, linkListRef } =
    useDirectSimRefEditsDispatch<T>(listenerKey);

  const { currentState: nextNodeId } = useGraphListener<
    MemoizedSupplier<number>
  >(
    GraphSelectiveContextKeys.nextNodeId,
    listenerKey,
    memoizedErrorSupplier as MemoizedSupplier<number>,
  );

  const { currentState: nextLinkId } = useGraphListener(
    GraphSelectiveContextKeys.nextLinkId,
    listenerKey,
    memoizedErrorSupplier as MemoizedSupplier<number>,
  );

  const { dispatchWithoutListen: setTransientNodeIds } =
    useGraphDispatch<string[]>("transient-node-ids");

  const { dispatchWithoutListen: setTransientLinkIds } =
    useGraphDispatch<string[]>("transient-link-ids");

  const {
    dispatchWithoutControl: setDeletedLinkIds,
    currentState: deletedLinkIds,
  } = useGraphDispatchAndListener("deleted-link-ids", listenerKey, EmptyArray);
  const {
    dispatchWithoutControl: setDeletedNodeIds,
    currentState: deletedNodeIds,
  } = useGraphDispatchAndListener("deleted-node-ids", listenerKey, EmptyArray);

  return {
    getNextNodeId: nextNodeId.get,
    getNextLinkId: nextLinkId.get,
    setTransientNodeIds,
    setTransientLinkIds,
    setDeletedNodeIds,
    deletedNodeIds,
    setDeletedLinkIds,
    deletedLinkIds,
    nodeListRef,
    linkListRef,
    dispatchNextSimVersion,
  };
}

function undefinedErrorFunction() {
  throw Error("id supplier has not been defined!");
}

const memoizedErrorSupplier = {
  get: undefinedErrorFunction,
};
