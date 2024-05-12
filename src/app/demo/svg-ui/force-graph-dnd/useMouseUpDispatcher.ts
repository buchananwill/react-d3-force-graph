import React, { useContext } from 'react';
import { getButton } from './getButton';
import { ForceGraphMouseButtonEventsDispatch } from './mouseEventContextCreator';

export function useMouseUpDispatcher() {
  const dispatchMouseEvent = useContext(ForceGraphMouseButtonEventsDispatch);

  return (e: React.MouseEvent) => {
    const button = getButton(e);
    if (button === 'n/a') return;
    dispatchMouseEvent({
      type: button,
      payload: { state: false, trigger: e }
    });
  };
}