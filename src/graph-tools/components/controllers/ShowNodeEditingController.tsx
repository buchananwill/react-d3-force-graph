"use client";

import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/literals/graphSelectiveContextKeys";

export function ShowNodeEditingController() {
  useGraphController(GraphSelectiveContextKeys.showNodeEditing, false);

  return null;
}
