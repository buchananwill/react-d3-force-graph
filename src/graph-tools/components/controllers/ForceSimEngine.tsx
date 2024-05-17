import {useGraphController, useGraphDispatchAndListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {NodePositionsKey} from "@/graph-tools/literals/constants";
import {useCallback, useRef, useState} from "react";
import {useD3ForceSimulationEffect} from "@/graph-tools/hooks/useD3ForceSimulationEffect";

export default function ForceSimEngine() {

    const { dispatch } = useGraphController<number>(
      NodePositionsKey,
      0,
      "controller",
    );

    const lastRenderTimer = useRef(Date.now());

    const ticked = useCallback(() => {
            const elapsed = Date.now() - lastRenderTimer.current;
            if (elapsed >= 25) {
                lastRenderTimer.current = Date.now();
                dispatch(current => current + 1);
            }

        }, [dispatch]
    )
    useD3ForceSimulationEffect(ticked);

    return null
}