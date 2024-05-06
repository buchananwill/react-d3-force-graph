'use client';

import {useEffect} from 'react';
import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {ControllerKey} from "@/graph-tools/graph/ShowForceAdjustments";

export default function MountedTracker({}: {}) {
  let {dispatch} = useGraphController('mounted', ControllerKey, true);

  useEffect(() => {
    dispatch( true);
    return () => {
      dispatch( false );
    };
  }, [dispatch]);
  return null;
}
