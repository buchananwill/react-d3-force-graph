import * as d3 from "d3";
import { ForceX, Simulation, SimulationNodeDatum } from "d3";

import { DataLink, DataNode, HasNumberId } from "../types";

export const exponentForPositionalForcesToCreateCurvedDelta = 3;

export function getDepthGridX<T extends HasNumberId>(
  strength?:
    | number
    | ((
        d: SimulationNodeDatum,
        i: number,
        data: SimulationNodeDatum[],
      ) => number),
  width = 600,
) {
  let staticStrength = null;
  if (typeof strength === "number") {
    staticStrength =
      strength === 0
        ? 0
        : Math.pow(strength, exponentForPositionalForcesToCreateCurvedDelta);
  }

  return d3
    .forceX((_d: DataNode<T>, i, data) => {
      const centerOffset = width / 2;
      return (
        centerOffset + centerOffset * Math.sin((i / data.length) * Math.PI * 2)
      );
    })
    .strength(staticStrength ?? strength ?? 0);
}

export function updateForceX<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceXStrength: number,
) {
  const force = currentSim.force("forceX") as ForceX<DataNode<T>> | undefined;
  if (!force) return;
  else {
    force.strength(forceXStrength);
  }
}
