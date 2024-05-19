import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import {
  EmptyArray,
  TransientIdOffset,
} from "@/graph-tools/literals/constants";
import { HasNumberId, MemoizedSupplier } from "@/graph-tools/types/util";

import { useGraphRefs } from "@/graph-tools/hooks/useGraphRefs";
import { useMemo } from "react";
import { GraphSelectiveContextKeys } from "@/graph-tools/literals/graphSelectiveContextKeys";
import { useNodeContext } from "@/graph-tools/hooks/useNodeContext";
import { useLinkContext } from "@/graph-tools/hooks/useLinkContext";

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
  useGraphController<number[]>("transient-link-ids", EmptyArray);
  useGraphController("transient-node-ids", EmptyArray);
  useGraphController("deleted-link-ids", EmptyArray);
  useGraphController("deleted-node-ids", EmptyArray);
  useGraphController("dimensions", dimensionsStaticArray);
  useGraphController<number>("version", 0);
  useGraphController<unknown>(GraphSelectiveContextKeys.nodeInModal, undefined);

  useNodeContext();
  useLinkContext();
  useGraphRefs<HasNumberId>();
}
