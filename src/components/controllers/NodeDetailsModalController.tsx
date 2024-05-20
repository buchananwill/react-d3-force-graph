import { useGraphController } from "../../hooks";
import { GraphSelectiveContextKeys } from "../../literals";
import { fallback } from "../../literals";

export default function NodeDetailsModalController() {
  useGraphController(GraphSelectiveContextKeys.nodeDetailsModalOpen, false);
  useGraphController(GraphSelectiveContextKeys.nodeModalContent, fallback);

  return null;
}
