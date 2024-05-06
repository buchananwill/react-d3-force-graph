'use client';

import {ControllerKey} from './graph/ShowForceAdjustments';
import {useGraphController, useGraphDispatch} from './graph/graph-context-creator';
import {useEffect} from 'react';

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
