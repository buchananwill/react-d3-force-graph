import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { ReactNode } from "react";

// eslint-disable-next-line no-unused-vars
export function ComponentUndefined(props: { onClose: () => void }): ReactNode {
  return <p className={"p-2"}>Content undefined...</p>;
}

export const fallback = { memoizedFunction: ComponentUndefined };
export default function NodeDetailsModalController() {
  useGraphController(GraphSelectiveContextKeys.nodeDetailsModalOpen, false);
  useGraphController(GraphSelectiveContextKeys.nodeModalContent, fallback);

  return null;
}
