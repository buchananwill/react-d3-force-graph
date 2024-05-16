import { useNodeInteractionContext } from "@/app/demo/components/node-interaction-context/NodeInteractionContext";
import { useCallback, useState } from "react";

import {
  useGraphDispatch,
  useGraphDispatchAndListener,
  useGraphListener,
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import { useDirectSimRefEditsDispatch } from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import { HasNumberId, MemoizedSupplier } from "@/graph-tools/types/types";
import {
  EmptyArray,
  TransientIdOffset,
} from "@/graph-tools/literals/constants";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";

function undefinedErrorFunction() {
  throw Error("id supplier has not been defined!");
}

const memoizedErrorSupplier = {
  get: undefinedErrorFunction,
};

export function useGraphEditHooks<T extends HasNumberId>(listenerKey: string) {
  // Todo: move this into a separate Svg Edit Button hook that is specific for the buttons on the old graph implementation.
  const { selected } = useNodeInteractionContext();

  const { incrementSimVersion, nodeListRef, linkListRef } =
    useDirectSimRefEditsDispatch<T>();

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
    useGraphDispatch("transient-node-ids");

  const { dispatchWithoutListen: setTransientLinkIds } =
    useGraphDispatch("transient-link-ids");

  const {
    dispatchWithoutControl: setDeletedLinkIds,
    currentState: deletedLinkIds,
  } = useGraphDispatchAndListener("deleted-link-ids", listenerKey, EmptyArray);
  const {
    dispatchWithoutControl: setDeletedNodeIds,
    currentState: deletedNodeIds,
  } = useGraphDispatchAndListener("deleted-node-ids", listenerKey, EmptyArray);

  const [noNodeSelected, setNoNodeSelected] = useState(false);

  const [deBouncing, setDeBouncing] = useState<boolean>(false);

  const checkForSelectedNodes = useCallback(
    (minimum: number = 1) => {
      if (selected.length < minimum) {
        if (!noNodeSelected) {
          setNoNodeSelected(true);
          setTimeout(() => {
            if (setNoNodeSelected) setNoNodeSelected(false);
          }, 2000);
        }
        return false;
      } else return true;
    },
    [selected, noNodeSelected],
  );

  const deBounce = () => {
    setDeBouncing(true);
    setTimeout(() => setDeBouncing(false), 250);
  };

  return {
    nodeListRef,
    linkListRef,
    selected,
    incrementSimVersion,
    setTransientNodeIds,
    setTransientLinkIds,
    checkForSelectedNodes,
    noNodeSelected,
    deBouncing,
    deBounce,
    getNextLinkId: nextLinkId.get,
    getNextNodeId: nextNodeId.get,
    setDeletedLinkIds,
    deletedLinkIds,
    setDeletedNodeIds,
    deletedNodeIds,
  };
}
