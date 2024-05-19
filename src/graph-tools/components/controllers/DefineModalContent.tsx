"use client";

import {
  useGraphController,
  useGraphDispatch,
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { useEffect } from "react";
import { HasName, NodeModalContentComponent } from "@/graph-tools/types/util";

export function useModalContent(
  memoizedContentComponent: NodeModalContentComponent,
) {
  const { dispatchWithoutListen } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeModalContent,
  );

  useEffect(() => {
    dispatchWithoutListen(memoizedContentComponent);
  }, [dispatchWithoutListen]);

  useGraphController(
    GraphSelectiveContextKeys.nodeLabelAccessor,
    memoizedNameLabelAccessor,
  );
}

const memoizedNameLabelAccessor = {
  memoizedFunction: (dataTypeTuple: [HasName, string]) => dataTypeTuple[0].name,
};
