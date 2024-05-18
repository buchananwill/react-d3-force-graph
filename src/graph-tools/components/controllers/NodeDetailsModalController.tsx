import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { fallback } from "@/app/demo/react-flow/components/nodes/NodeDetailsModal";

export default function NodeDetailsModalController() {
  useGraphController(GraphSelectiveContextKeys.nodeDetailsModalOpen, false);
  useGraphController(GraphSelectiveContextKeys.nodeModalContent, fallback);

  return null;
}
