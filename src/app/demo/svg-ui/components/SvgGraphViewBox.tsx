'use client';
import SvgRenderWrapper from './SvgRenderWrapper';
import React from 'react';
import {useSvgElements} from '../hooks/useSvgElements';


import GraphViewOptions from './GraphViewOptions';
import {
    DraggablePositionContext,
    IsDraggingContext,
    MouseDownDispatchContext
} from '@/app/demo/svg-ui/force-graph-dnd/mouseEventContextCreator';

import {useGraphName} from '../../../../graph-tools/contexts/graphContextCreator';

import {useMouseMoveSvgDraggable} from '@/app/demo/svg-ui/force-graph-dnd/useMouseMoveSvgDraggable';
import {HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {EmptyArray} from "@/graph-tools/literals/constants";

import {useGraphRefs} from "@/graph-tools/hooks/useGraphRefs";

const listeners = {}
export const DefaultGraphZoom = 100;
export const MaxGraphZoom = 200;
export const ConstantGraphZoomFactor = 2;
const DefaultGraphWidth = 900;
const DefaultGraphHeight = 600;
const listenerKey = 'graph';
let translateX = 0
let translateY = 0

export default function SvgGraphViewBox<T extends HasNumberId>() {

    const {nodeListRef, linkListRef} = useGraphRefs<T>();

    const uniqueGraphName = useGraphName();

    const {
        nodeElements,
        linkElements,
        textElements
    } = useSvgElements(nodeListRef?.current || EmptyArray, linkListRef?.current || EmptyArray);

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

                </IsDraggingContext.Provider>
            </DraggablePositionContext.Provider>
        </MouseDownDispatchContext.Provider>
    );
}
