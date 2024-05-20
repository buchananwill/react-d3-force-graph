import { DataLink, DataNode, HasNumberId } from "../types";
import * as d3 from "d3";
import { Forces } from "../types";
import { AlphaOptionKeys, SimOptions } from "../types";

const defaultOptions: SimOptions = {
  alphaDecay: 0,
  alphaTarget: 0,
};

export function beginSim<T extends HasNumberId>(
  nodes: DataNode<T>[],
  forces?: Forces,
  options?: SimOptions,
) {
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
