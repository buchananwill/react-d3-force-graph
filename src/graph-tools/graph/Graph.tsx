'use client';
import SvgRenderWrapper from '../SvgRenderWrapper';
import React, {PropsWithChildren} from 'react';
import {useSvgElements} from '../aggregate-functions/useSvgElements';


import GraphViewOptions from '../components/GraphViewOptions';
import NodeInteractionProvider from '../nodes/NodeInteractionContext';
import {useGraphRefs} from '../nodes/genericNodeContextCreator';
import {
    DraggablePositionContext,
    IsDraggingContext,
    MouseDownDispatchContext
} from '../force-graph-dnd/mouseEventContextCreator';

import {useGraphName} from './graphContextCreator';
import GraphForceAdjuster from '../components/GraphForceAttributes';

import {useMouseMoveSvgDraggable} from '../force-graph-dnd/useMouseMoveSvgDraggable';
import {HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {EmptyArray} from "@/graph-tools/constants";

const listeners = {}
export const DefaultGraphZoom = 100;
export const MaxGraphZoom = 200;
export const ConstantGraphZoomFactor = 2;
const DefaultGraphWidth = 900;
const DefaultGraphHeight = 600;
const listenerKey = 'graph';
let translateX = 0
let translateY = 0

export default function Graph<T extends HasNumberId>() {

    const {nodeListRef, linkListRef} = useGraphRefs<T>();

    const uniqueGraphName = useGraphName();

    const {
        nodeElements,
        linkElements,
        textElements
    } = useSvgElements(nodeListRef?.current || EmptyArray, linkListRef?.current || EmptyArray);

    // const { listeners, setNodeRef, transform } = useDraggable({
    //   id: 'draggable'
    // });
    const {currentState} = useGraphListener(
        'zoom',
        listenerKey,
        DefaultGraphZoom
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
            <DraggablePositionContext.Provider value={draggablePosition}>
                <IsDraggingContext.Provider value={isDragging}>
                    <div className={'relative justify-center m-2 gap-2 h-fit w-fit bg-white'}>
                        <svg
                            viewBox={`0 0 ${width} ${height}`}
                            style={{
                                width: DefaultGraphWidth,
                                height: DefaultGraphHeight,
                                borderWidth: "2px",
                                borderColor: "rgb(71,85,105)",
                                borderRadius: "0.5rem"
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
                                {...listeners}
                            />
                            <g
                                transform={`translate(${
                                    translateX * svgScale + centerOffsetX
                                } ${translateY * svgScale + centerOffsetY})`}
                            >
                                <SvgRenderWrapper
                                    textElements={textElements}
                                    linkElements={linkElements}
                                    nodeElements={nodeElements}
                                />

                            </g>
                        </svg>
                        <div
                            className={
                                'absolute w-fit h-fit top-4 right-4 Z-10 flex flex-col gap-1 items-end'
                            }
                        >
                            <GraphViewOptions/>
                        </div>
                    </div>
                </IsDraggingContext.Provider>
            </DraggablePositionContext.Provider>
        </MouseDownDispatchContext.Provider>
    );
}
