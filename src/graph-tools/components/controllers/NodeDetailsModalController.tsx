import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { fallback } from "@/react-flow/components/generic/NodeDetailsModal";

export default function NodeDetailsModalController() {
  useGraphController(GraphSelectiveContextKeys.nodeDetailsModalOpen, false);
  useGraphController(GraphSelectiveContextKeys.nodeModalContent, fallback);

  return null;
}
