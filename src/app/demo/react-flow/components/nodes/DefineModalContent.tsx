"use client";

import { useGraphDispatch } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { useEffect } from "react";
import OrganizationDetailsContent from "@/app/demo/react-flow/components/nodes/OrganizationDetailsContent";

export default function DefineModalContent() {
  const { dispatchWithoutListen } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeModalContent,
  );

  useEffect(() => {
    dispatchWithoutListen(memoizedContentComponent);
  }, [dispatchWithoutListen]);

  return null;
}

const memoizedContentComponent = {
  memoizedFunction: OrganizationDetailsContent,
};
