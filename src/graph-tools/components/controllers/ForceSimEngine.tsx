import {useGraphDispatchAndListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {NodePositionsKey} from "@/graph-tools/literals/constants";
import {useCallback, useRef, useState} from "react";
import {useD3ForceSimulationEffect} from "@/graph-tools/hooks/useD3ForceSimulationEffect";

export default function ForceSimEngine() {

    let {dispatchWithoutControl} = useGraphDispatchAndListener<number>(NodePositionsKey, 'wrapper', 0);
    const lastRenderTimer = useRef(Date.now());

    const ticked = useCallback(() => {
            const elapsed = Date.now() - lastRenderTimer.current;
            if (elapsed >= 25) {
                lastRenderTimer.current = Date.now();
                dispatchWithoutControl(current => current + 1);
            }

        }, [dispatchWithoutControl]
    )
    useD3ForceSimulationEffect(ticked);

    return null
}