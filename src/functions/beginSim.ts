import {
  AlphaOptionKeys,
  DataLink,
  DataNode,
  Forces,
  HasNumberId,
  SimOptions,
} from "../types";
import * as d3 from "d3";

const defaultOptions: SimOptions = {
  alphaDecay: 0,
  alphaTarget: 0,
};

export function beginSim<T extends HasNumberId>(
  nodes: DataNode<T>[],
  forces?: Forces,
  options?: SimOptions,
): d3.Simulation<DataNode<T>, DataLink<T>> {
  const mergedOptions = { ...defaultOptions, ...options };

  const simulation = d3.forceSimulation<DataNode<T>, DataLink<T>>(nodes);

  if (forces) {
    Object.entries(forces).forEach(([forceKey, force]) => {
      simulation.force(forceKey, force);
    });
  }

  Object.values(AlphaOptionKeys).forEach((optionKey) => {
    const optionValue = mergedOptions[optionKey];
    if (optionValue !== undefined) simulation[optionKey](optionValue);
  });

  return simulation;
}
