'use client';

import React, {useMemo} from 'react';

import {useGraphName} from '../graph/graphContextCreator';
import {forceAttributesInitial} from '../forceAttributesMetaData';

import {ShowForceAdjustmentsKey} from '../graph/ShowForceAdjustments';
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {ForceGraphAttributesDto} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {SelectiveContextRangeSlider} from "@/app/demo/components/SelectiveContextRangeSlider";


const listenerKey = 'graph-force-adjustment';
export default function GraphForceSliders() {
    const uniqueGraphName = useGraphName();


    const { currentState: show } = useGraphListener(
        ShowForceAdjustmentsKey,
        listenerKey,
        false
    );

    const sliders = useMemo(() => Object.entries(forceAttributesInitial).map((entry) => {
        if (entry[0] === 'id') {
            return null;
        }
        const contextKey = `${uniqueGraphName}:${entry[0]}`;
        const entryKey = entry[0] as keyof ForceGraphAttributesDto;
        const initial = forceAttributesInitial[entryKey];
        return <SelectiveContextRangeSlider key={`slider:${contextKey}`} contextKey={contextKey} initialValue={initial} listenerKey={'slider'}/>;
    }), [uniqueGraphName])

    return (
        <>
            {show ? [...sliders] : []}
        </>
    );
}
