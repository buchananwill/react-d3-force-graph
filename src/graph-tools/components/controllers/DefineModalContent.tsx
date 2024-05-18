"use client";

import {
  useGraphController,
  useGraphDispatch,
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { useEffect } from "react";
import OrganizationDetailsContent from "@/app/demo/components/organization/OrganizationDetailsContent";
import { HasName } from "@/graph-tools/types/types";

export default function DefineModalContent() {
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

  return null;
}

const memoizedContentComponent = {
  memoizedFunction: OrganizationDetailsContent,
};

const memoizedNameLabelAccessor = {
  memoizedFunction: (dataTypeTuple: [HasName, string]) => dataTypeTuple[0].name,
};
