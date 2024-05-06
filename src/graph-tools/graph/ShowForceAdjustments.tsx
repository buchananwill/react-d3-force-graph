'use client';

import {useGraphController, useGraphDispatch} from './graph-context-creator';
import {useEffect} from 'react';

export const ShowForceAdjustmentsKey = 'show-force-adjustments';

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
