"use client";

import { useGraphController } from "../../hooks";
import { GraphSelectiveContextKeys } from "../../literals";

export function ShowNodeEditingController() {
  useGraphController(GraphSelectiveContextKeys.showNodeEditing, false);

  return null;
}
