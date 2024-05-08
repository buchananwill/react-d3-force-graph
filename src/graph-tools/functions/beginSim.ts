import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import * as d3 from "d3";
import {Simulation} from "d3";
import {Forces} from "@/graph-tools/types/forces";
import {AlphaOptionKeys, SimOptions} from "@/graph-tools/types/simOptions";

const defaultOptions: SimOptions = {
    alphaDecay: 0,
    alphaTarget: 0
}

export function beginSim<T extends HasNumberId>(
    ticked: (this: Simulation<DataNode<T>, DataLink<T>>) => void,
    nodes: DataNode<T>[],
    forces?: Forces,
    options?: SimOptions) {
    const mergedOptions = {...defaultOptions, ...options}

    const simulation = d3.forceSimulation<DataNode<T>, DataLink<T>>(
        nodes
    );

    if (forces) {
        Object.entries(forces)
            .forEach(([forceKey, force]) => {
                simulation.force(forceKey, force)
            })
    }

    Object.values(AlphaOptionKeys)
        .forEach(optionKey => {
            const optionValue = mergedOptions[optionKey];
            if (optionValue !== undefined)
            simulation[optionKey](optionValue)
        })

    simulation.on('tick', ticked);
    return simulation
}