"use client";

import {
  useGraphController,
  useGraphDispatch,
} from "./useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "../literals";
import { useEffect } from "react";
import { HasName, NodeModalContentComponent } from "../types";

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
