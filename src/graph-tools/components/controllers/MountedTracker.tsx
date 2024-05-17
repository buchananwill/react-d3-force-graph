"use client";

import { useEffect } from "react";
import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";

import { ControllerKey } from "@/graph-tools/literals/controllerKey";

export default function MountedTracker({}: {}) {
  let { dispatch } = useGraphController("mounted", true, ControllerKey);

  useEffect(() => {
    dispatch(true);
    return () => {
      dispatch(false);
    };
  }, [dispatch]);
  return null;
}
