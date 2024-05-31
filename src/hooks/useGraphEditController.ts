import { useGraphController } from "./useGraphSelectiveContext";
import {
  EmptyArray,
  GraphSelectiveContextKeys,
  TransientIdOffset,
} from "../literals";
import { MemoizedSupplier } from "../types";

import { useGraphRefs } from "./useGraphRefs";
import { useMemo } from "react";
import { useNodeContext } from "./useNodeContext";
import { useLinkContext } from "./useLinkContext";

const listenerKey = "graph-edit-controller-key";
const dimensionsStaticArray: number[] = [1800, 1200];

function useNextId(initialId?: number): MemoizedSupplier<number> {
  return useMemo(() => {
    let nextId = initialId ?? 0;
    return {
      get: () => {
        return nextId++;
      },
    };
  }, [initialId]);
}

export function useGraphEditController() {
  const nextNodeId = useNextId(TransientIdOffset);
  const nextLinkId = useNextId(TransientIdOffset);

  useGraphController(
    GraphSelectiveContextKeys.nextNodeId,
    nextNodeId,
    listenerKey,
  );
  useGraphController(
    GraphSelectiveContextKeys.nextLinkId,
    nextLinkId,
    listenerKey,
  );
  useGraphController("transient-link-ids", EmptyArray);
  useGraphController("transient-node-ids", EmptyArray);
  useGraphController("deleted-link-ids", EmptyArray);
  useGraphController("deleted-node-ids", EmptyArray);
  useGraphController("dimensions", dimensionsStaticArray);
  useGraphController<number>("version", 0);
  useGraphController<unknown>(GraphSelectiveContextKeys.nodeInModal, undefined);

  useNodeContext();
  useLinkContext();
  useGraphRefs();
}
