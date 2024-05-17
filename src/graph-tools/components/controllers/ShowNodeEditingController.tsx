"use client";

import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { ControllerKey } from "@/graph-tools/literals/controllerKey";

export function ShowNodeEditingController() {
  useGraphController(
    GraphSelectiveContextKeys.showNodeEditing,
    false,
    ControllerKey,
  );

  return null;
}
