'use client';

import {ControllerKey} from './graph/ShowForceAdjustments';
import {useEffect} from 'react';
import {GraphSelectiveKeys, useGraphController, useGraphDispatch} from "@/graph-tools/hooks/useGraphSelectiveContext";

export function ShowNodeEditing() {
    useGraphController(GraphSelectiveKeys.showNodeEditing, ControllerKey, false)

  return null;
}

export function useShowNodeEditing(show: boolean) {
  const { dispatchWithoutListen } = useGraphDispatch(
      GraphSelectiveKeys.showNodeEditing
  );
  useEffect(() => {
    dispatchWithoutListen(show);
  }, [show, dispatchWithoutListen]);
}
