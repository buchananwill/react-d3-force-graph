import { useGraphDispatch, useGraphListener } from "./useGraphSelectiveContext";
import { useDirectSimRefEditsDispatch } from "./useDirectSimRefEditsDispatch";
import { HasNumberId, MemoizedSupplier } from "../types";
import { GraphSelectiveContextKeys } from "../literals";
import { useMemo } from "react";

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

  const { dispatchWithoutListen: setTransientNodeIds } = useGraphDispatch<
    string[]
  >(GraphSelectiveContextKeys.transientNodeIds);

  const { dispatchWithoutListen: setTransientLinkIds } = useGraphDispatch<
    string[]
  >(GraphSelectiveContextKeys.transientLinkIds);

  const { dispatchWithoutListen: setDeletedLinkIds } = useGraphDispatch<
    number[]
  >(GraphSelectiveContextKeys.deletedLinkIds);
  const { dispatchWithoutListen: setDeletedNodeIds } = useGraphDispatch<
    number[]
  >(GraphSelectiveContextKeys.deletedNodeIds);

  return useMemo(
    () => ({
      getNextNodeId: nextNodeId.get,
      getNextLinkId: nextLinkId.get,
      setTransientNodeIds,
      setTransientLinkIds,
      setDeletedNodeIds,
      setDeletedLinkIds,
      nodeListRef,
      linkListRef,
      dispatchNextSimVersion,
    }),
    [
      nextLinkId.get,
      nextLinkId.get,
      setTransientNodeIds,
      setTransientLinkIds,
      setDeletedNodeIds,
      setDeletedNodeIds,
      nodeListRef,
      linkListRef,
      dispatchNextSimVersion,
    ],
  );
}

function undefinedErrorFunction() {
  throw Error("id supplier has not been defined!");
}

const memoizedErrorSupplier = {
  get: undefinedErrorFunction,
};
