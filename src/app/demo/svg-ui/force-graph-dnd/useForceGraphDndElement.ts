import React, { useContext } from 'react';
import { useMouseUpDispatcher } from './useMouseUpDispatcher';
import { getButton } from './getButton';
import {
  DraggablePositionContext,
  ForceGraphDraggable,
  ForceGraphDraggableContext,
  ForceGraphDraggableDispatch,
  ForceGraphMouseButtonEventsContext,
  ForceGraphMouseButtonEventsDispatch,
  IsDraggingContext,
  MouseDownDispatchContext
} from './mouseEventContextCreator';

export function useForceGraphDndElement(element: ForceGraphDraggable) {
  const dispatchElementId = useContext(ForceGraphDraggableDispatch);
  const dispatchMouseEvent = useContext(ForceGraphMouseButtonEventsDispatch);
  const { draggingNodeIndex } = useContext(ForceGraphDraggableContext);
  const mouseDownDispatch = useContext(MouseDownDispatchContext);
  const { leftMouseDown } = useContext(ForceGraphMouseButtonEventsContext);
  const draggablePosition = useContext(DraggablePositionContext);
  const currentDraggingContext = useContext(IsDraggingContext);
  const mouseUp = useMouseUpDispatcher();

  const mouseDown = (e: React.MouseEvent) => {
    const button = getButton(e);
    if (button === 'n/a') return;
    dispatchElementId(element);
    dispatchMouseEvent({
      type: button,
      payload: { state: true, trigger: e }
    });
    mouseDownDispatch(element.draggingNodeIndex!);
  };

  const doDrag =
    element.draggingNodeIndex === draggingNodeIndex &&
    currentDraggingContext &&
    leftMouseDown;

  return {
    mouseDown,
    mouseUp,
    doDrag,
    draggablePosition
  };
}