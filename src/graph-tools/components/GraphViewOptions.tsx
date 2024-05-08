'use client';
import {GraphToggle, GraphToggleProps} from './GraphToggle';


import React, {useEffect, useRef, useState} from 'react';


import {DefaultGraphZoom, MaxGraphZoom} from '../graph/Graph';
import {Button} from "@nextui-org/button";


import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Tooltip} from "@nextui-org/tooltip";
import {SelectiveContextRangeSlider} from "@/app/demo/components/SelectiveContextRangeSlider";
import {useGraphSelectiveContextKey} from "@/graph-tools/hooks/useGraphSelectiveContext";
import ControllerComponent from "@/graph-tools/components/ControllerComponent";


const graphToggles: GraphToggleProps[] = [
    {
        toggleKey: 'arrows-to-parents',
        tooltipContent: 'Show/Hide arrows to parent (dependency)'
    },
    {
        toggleKey: 'arrows-to-children',
        tooltipContent: 'Show/Hide arrows to children (dependent)'
    },
    {
        toggleKey: 'highlight-from-source',
        tooltipContent: 'Highlight edges from selected children (dependent)'
    },
    {
        toggleKey: 'highlight-from-target',
        tooltipContent: 'Highlight edges from selected parent (dependency)'
    },
    {
        toggleKey: 'lock-text-with-select',
        tooltipContent: 'Pin text in view for selected nodes.'
    }
];

const listenerKey = 'slider';
export default function GraphViewOptions() {

    const [showSliders, setShowSliders] = useState(false);
    const [hideFromLayout, setHideFromLayout] = useState(false);
    const mutableRefObject = useRef<NodeJS.Timeout>();
    const zoomKey = useGraphSelectiveContextKey('zoom')
    const textSizeKey = useGraphSelectiveContextKey('text-size')

    useEffect(() => {
        if (mutableRefObject.current) clearTimeout(mutableRefObject.current);
        if (showSliders) {
            setHideFromLayout(false);
        } else {
            mutableRefObject.current = setTimeout(() => setHideFromLayout(true), 500);
        }
        return () => {
            if (mutableRefObject.current) clearTimeout(mutableRefObject.current);
        };
    }, [showSliders]);
    return (
        <>
            <Button
                color={`${showSliders ? 'primary' : 'default'}`}
                className={'w-fit'}
                onPress={() => setShowSliders(!showSliders)}
            >
                View Options
                <ChevronDownIcon
                    className={`w-6 h-6 ${
                        !showSliders ? 'rotate-90 transform' : ''
                    } transition-transform duration-500`}
                ></ChevronDownIcon>
            </Button>
            <div
                className={`p-4 mt-2 h-fit w-fit flex flex-col gap-1 items-left transition-opacity duration-500 text-black bg-transparent border-2 rounded-lg ${
                    showSliders ? 'opacity-100 z-20 ' : 'opacity-0 -z-10 '
                } ${hideFromLayout ? ' hidden ' : ''}`}
            >
                {graphToggles.map((toggleProps, index) => (
                    <GraphToggle key={index} {...toggleProps} />
                ))}
                <Tooltip content={'Zoom in/out'} showArrow={true}>
                    <div>
                        <ControllerComponent contextKey={zoomKey} initialValue={DefaultGraphZoom}/>
                        <SelectiveContextRangeSlider
                        // className={'w-32'}
                        contextKey={zoomKey}
                        listenerKey={listenerKey}
                        maxValue={MaxGraphZoom}
                        minValue={10}
                        initialValue={DefaultGraphZoom}
                    ></SelectiveContextRangeSlider></div>
                </Tooltip>

                <Tooltip content={'Scale text size.'} showArrow={true}>
                    <div>
                        <ControllerComponent contextKey={textSizeKey} initialValue={100}/>
                        <SelectiveContextRangeSlider
                        // className={'w-32'}
                        contextKey={textSizeKey}
                        listenerKey={listenerKey}
                        maxValue={200}
                        minValue={1}
                        initialValue={50}
                    ></SelectiveContextRangeSlider></div>
                </Tooltip>



            </div>
        </>
    );
}
