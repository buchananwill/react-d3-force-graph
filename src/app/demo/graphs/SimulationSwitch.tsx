'use client'
import {
    useGraphDispatchAndListener,
    useGraphListener
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {Switch} from "@nextui-org/switch";
import {Simulation} from "d3";
import {MutableRefObject, useState} from "react";
import {GraphSelectiveContextKeys} from "@/graph-tools/hooks/graphSelectiveContextKeys";

export default function SimulationSwitch() {
    const {currentState, dispatchWithoutControl} = useGraphDispatchAndListener<MutableRefObject<Simulation<any, any>> | null>(GraphSelectiveContextKeys.sim, 'off-switch', null);
    const [runSim, setRunSim] = useState(true)

    return <Switch isSelected={
        runSim
    } onValueChange={(value) => {
        if (currentState && currentState.current) {
            setRunSim(value)
            if (!value) currentState.current.stop()
            else currentState.current.restart()
        }
    }}>Run Simulation</Switch>
}