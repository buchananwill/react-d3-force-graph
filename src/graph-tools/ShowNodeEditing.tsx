'use client';

import {ControllerKey} from './graph/ShowForceAdjustments';
import {useEffect} from 'react';
import {useGraphController, useGraphDispatch} from "@/graph-tools/hooks/useGraphSelectiveContext";

export function ShowNodeEditing() {
    useGraphController('show-node-editing', ControllerKey, false)

  return null;
}

export function useShowNodeEditing(show: boolean) {
  const { dispatchWithoutListen } = useGraphDispatch(
      'show-node-editing'
  );
  useEffect(() => {
    dispatchWithoutListen(show);
  }, [show, dispatchWithoutListen]);
}
