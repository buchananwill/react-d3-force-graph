'use client';

import React, {useMemo} from 'react';

import {useGraphName} from '@/graph-tools/contexts/graphContextCreator';
import {ForceAttributesDto, ForceAttributesInitial} from '@/graph-tools/types/forceAttributesMetaData';

import {ShowForceAdjustmentsKey} from '@/graph-tools/components/controllers/ShowForceAdjustmentsController';
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {SelectiveContextRangeSlider} from "@/app/demo/components/SelectiveContextRangeSlider";
import {useGlobalReadAny} from "selective-context";


const listenerKey = 'graph-force-adjustment';
export default function GraphForceSliders() {
    const uniqueGraphName = useGraphName();
    const selectiveContextReadAll = useGlobalReadAny<boolean>();


    const { currentState: show } = useGraphListener(
        ShowForceAdjustmentsKey,
        listenerKey,
        false
    );

    const sliders = useMemo(() => Object.entries(ForceAttributesInitial).map((entry) => {
        if (entry[0] === 'id') {
            return null;
        }
        const showThisSlider = selectiveContextReadAll(`${entry[0]}:show`);

        if (showThisSlider === false) return null

        const contextKey = `${uniqueGraphName}:${entry[0]}`;
        const entryKey = entry[0] as keyof ForceAttributesDto;
        const initial = ForceAttributesInitial[entryKey];
        return <SelectiveContextRangeSlider key={`slider:${contextKey}`} contextKey={contextKey} initialValue={initial} listenerKey={'slider'}/>;
    }), [uniqueGraphName, selectiveContextReadAll])

    return (
        <>
            {show ? [...sliders] : []}
        </>
    );
}
