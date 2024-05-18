import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import {
  EmptyArray,
  TransientIdOffset,
} from "@/graph-tools/literals/constants";
import { useNodeContext } from "@/graph-tools/contexts/genericNodeContextCreator";
import { useLinkContext } from "@/graph-tools/contexts/genericLinkContextCreator";
import { HasNumberId, MemoizedSupplier } from "@/graph-tools/types/types";

import { useGraphRefs } from "@/graph-tools/hooks/useGraphRefs";
import { useMemo } from "react";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";

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
