"use client";

import { useGraphController } from "../../hooks";

export const ShowForceAdjustmentsKey = "show-force-editing";

export function ShowForceAdjustmentsController() {
  useGraphController<boolean>(ShowForceAdjustmentsKey, true);
  return null;
}
