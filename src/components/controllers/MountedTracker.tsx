"use client";

import { useEffect } from "react";
import { useGraphController } from "../../hooks";

export default function MountedTracker() {
  const { dispatch } = useGraphController("mounted", true);

  useEffect(() => {
    dispatch(true);
    return () => {
      dispatch(false);
    };
  }, [dispatch]);
  return null;
}
