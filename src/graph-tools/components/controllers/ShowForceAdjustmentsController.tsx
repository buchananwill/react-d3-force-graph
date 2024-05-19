"use client";

import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";

export const ShowForceAdjustmentsKey = "show-force-editing";

export function ShowForceAdjustmentsController() {
  useGraphController<boolean>(ShowForceAdjustmentsKey, true);
  return null;
}
