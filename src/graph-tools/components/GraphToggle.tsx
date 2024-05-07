'use client';
import React from 'react';

import {GraphSelectiveContext, useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {Tooltip} from "@nextui-org/tooltip";
import {Switch} from "@nextui-org/switch";


export interface GraphToggleProps {
    toggleKey: GraphSelectiveContext;
    tooltipContent: string;
}

export function GraphToggle({toggleKey, tooltipContent}: GraphToggleProps) {

    let {currentState, dispatch} = useGraphController(toggleKey, 'toggle', true);

    return (
            <Switch
                isSelected={currentState}
                onValueChange={dispatch}
                aria-label={tooltipContent}
                classNames={{label: 'text-xs'}}
                size={'sm'}
            >{tooltipContent}</Switch>

    );
}
