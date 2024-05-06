'use client';
import ForceSimWrapper from '../ForceSimWrapper';
import React, {PropsWithChildren} from 'react';
import {useSvgElements} from '../aggregate-functions/useSvgElements';


import GraphViewOptions from '../components/GraphViewOptions';
import NodeInteractionProvider from '../nodes/NodeInteractionContext';
import {useGenericGraphRefs, useGenericNodeContext} from '../nodes/genericNodeContextCreator';
import {
  DraggablePositionContext,
  IsDraggingContext,
  MouseDownDispatchContext
} from '../force-graph-dnd/mouseEventContextCreator';

import {useGraphName} from './graphContextCreator';
import GraphForceAdjuster from '../components/GraphForceAdjustment';
import {NodeEditorDisclosure} from '../nodes/NodeEditorDisclosure';

import {ShowForceAdjustmentsKey} from './ShowForceAdjustments';

import {useMouseMoveSvgDraggable} from '../force-graph-dnd/useMouseMoveSvgDraggable';
import {HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {EmptyArray} from "@/graph-tools/constants";
import {useGenericLinkContext} from "@/graph-tools/links/genericLinkContextCreator";

const listeners = {}
export const DefaultGraphZoom = 100;
export const MaxGraphZoom = 200;
export const ConstantGraphZoomFactor = 2;
const DefaultGraphWidth = 900;
const DefaultGraphHeight = 600;
const listenerKey = 'graph';
export default function Graph<T extends HasNumberId>({
  titleList,
  textList,
  children
}: {
  textList: string[];
  titleList: string[];
} & PropsWithChildren) {
  const textAccessor = (n: number) => textList[n] || '';
  const titleAccessor = (n: number) => titleList[n] || ''; //auxNodes[n.data.entityId].data.product.name;
  const { nodeListRef, linkListRef } = useGenericGraphRefs<T>();
  let {nodes} = useGenericNodeContext();
  let {links} = useGenericLinkContext();
  const uniqueGraphName = useGraphName();

  console.log('rendering Graph')

  const { nodeElements, linkElements, textElements } = useSvgElements(
    // nodeListRef?.current || EmptyArray,
    // linkListRef?.current || EmptyArray,
      nodes,
    links,
    textAccessor,
    titleAccessor
  );

  // const { listeners, setNodeRef, transform } = useDraggable({
  //   id: 'draggable'
  // });
  const { currentState } = useGraphListener(
    'zoom',
    listenerKey,
    DefaultGraphZoom
  );

  const { currentState: showNodeEditing } = useGraphListener(
    'show-node-editing',
    listenerKey,
    false
  );

  const { currentState: showForceEditing } = useGraphListener(
    ShowForceAdjustmentsKey,
    listenerKey,
    false
  );

  const {
    handleMouseMove,
    handleMouseUp,
    svgRef,
    draggablePosition,
    isDragging,
    mouseDownDispatch,
    svgScale
  } = useMouseMoveSvgDraggable(nodeListRef!, uniqueGraphName);

  // const translationContextInterface = useDragToTranslate();
  // const translationElement = translationContextInterface['draggable'];
  // const xTranslate = (transform?.x || 0) + (translationElement?.x || 0);
  // const yTranslate = (transform?.y || 0) + (translationElement?.y || 0);

  const scale = DefaultGraphZoom / currentState;

  const initialWidth = DefaultGraphWidth * scale;
  const initialHeight = DefaultGraphHeight * scale;
  const width = initialWidth * ConstantGraphZoomFactor;
  const height = initialHeight * ConstantGraphZoomFactor;
  const centerOffsetX = initialWidth - DefaultGraphWidth;
  const centerOffsetY = initialHeight - DefaultGraphHeight;

  return (
    <MouseDownDispatchContext.Provider value={mouseDownDispatch}>
      <NodeInteractionProvider>
        <DraggablePositionContext.Provider value={draggablePosition}>
          <IsDraggingContext.Provider value={isDragging}>
            <div className={'flex'}>
              <div className={'relative justify-center m-2 gap-2 h-fit w-fit bg-white'}>
                <div
                    // ref={setNodeRef}
                >
                  <svg
                    className={'border-2 border-slate-600 rounded-lg'}
                    viewBox={`0 0 ${width} ${height}`}
                    style={{
                      width: DefaultGraphWidth,
                      height: DefaultGraphHeight
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    ref={svgRef}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                  >
                    <rect
                      width={'100%'}
                      height={'100%'}
                      className={'fill-transparent'}
                      {...listeners }
                    />
                    <g
                      transform={`translate(${
                        0 * svgScale + centerOffsetX
                    } ${0 * svgScale + centerOffsetY})`}
                    >
                      <ForceSimWrapper
                        textElements={textElements}
                        linkElements={linkElements}
                        nodeElements={nodeElements}
                        uniqueGraphName={uniqueGraphName}
                      />

                    </g>
                  </svg>
                </div>

                <div
                  className={
                    'absolute w-fit h-fit top-4 right-4 Z-10 flex flex-col gap-1 items-end'
                  }
                >
                  <GraphViewOptions />
                </div>
              </div>
              {showForceEditing || showNodeEditing ? (
                <div
                  className={
                    'flex flex-col overflow-auto border-slate-600 border-2 rounded-lg px-2 pb-2 mt-2 relative'
                  }
                  style={{ height: '600px' }}
                >
                  {showNodeEditing ? (
                    <NodeEditorDisclosure />
                  ) : (
                    <div className={'h-2'}></div>
                  )}
                  <GraphForceAdjuster />
                  {children}
                </div>
              ) : (
                <GraphForceAdjuster />
              )}
            </div>
          </IsDraggingContext.Provider>
        </DraggablePositionContext.Provider>
      </NodeInteractionProvider>
    </MouseDownDispatchContext.Provider>
  );
}
