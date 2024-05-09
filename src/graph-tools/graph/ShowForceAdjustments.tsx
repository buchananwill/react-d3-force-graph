'use client';

import {useEffect} from 'react';
import {useGraphController, useGraphDispatch} from "@/graph-tools/hooks/useGraphSelectiveContext";

export const ShowForceAdjustmentsKey = 'show-force-editing';

export const ControllerKey = 'controller';

export function ShowForceAdjustments() {
    useGraphController<boolean>(
        ShowForceAdjustmentsKey,
        ControllerKey,
        true
    );
    return null;
}

export function useForceAdjustments(show: boolean) {

    const {dispatchWithoutListen} = useGraphDispatch(
        ShowForceAdjustmentsKey,
    );
    useEffect(() => {
        dispatchWithoutListen(show);
    }, [show, dispatchWithoutListen]);
}
