'use client';

import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {ControllerKey} from "@/graph-tools/literals/controllerKey";

export const ShowForceAdjustmentsKey = 'show-force-editing';

export function ShowForceAdjustmentsController() {
    useGraphController<boolean>(
        ShowForceAdjustmentsKey,
        ControllerKey,
        true
    );
    return null;
}

