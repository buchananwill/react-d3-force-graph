import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/literals/graphSelectiveContextKeys";
import { fallback } from "@/graph-tools/literals/fallbackModal";

export default function NodeDetailsModalController() {
  useGraphController(GraphSelectiveContextKeys.nodeDetailsModalOpen, false);
  useGraphController(GraphSelectiveContextKeys.nodeModalContent, fallback);

  return null;
}
