import { useGraphController } from "./useGraphSelectiveContext";
import { EmptyArray, GraphSelectiveContextKeys } from "../literals";
import { MemoizedSupplier } from "../types";

import { useGraphRefs } from "./useGraphRefs";
import { useMemo } from "react";
import { useNodeContext } from "./useNodeContext";
import { useLinkContext } from "./useLinkContext";

const dimensionsStaticArray: number[] = [1800, 1200];

/**
 * Uses negative indexing, as the IDs assigned will be transient.
 * */
function useNextId(initialId?: number): MemoizedSupplier<number> {
  return useMemo(() => {
    let nextId = initialId ?? -1;
    return {
      get: () => {
        return nextId--;
      },
    };
  }, [initialId]);
}

export function useGraphEditController() {
  const nextNodeId = useNextId(-1);
  const nextLinkId = useNextId(-1);

  useGraphController(GraphSelectiveContextKeys.nextNodeId, nextNodeId);
  useGraphController(GraphSelectiveContextKeys.nextLinkId, nextLinkId);
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
