"use client";

import { useEffect } from "react";
import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";

export default function MountedTracker() {
  let { dispatch } = useGraphController("mounted", true);

  useEffect(() => {
    dispatch(true);
    return () => {
      dispatch(false);
    };
  }, [dispatch]);
  return null;
}
