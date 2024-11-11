import * as d3 from "d3";
import { ForceY, Simulation, SimulationNodeDatum } from "d3";

import { DataLink, DataNode, HasNumberId } from "../types";
import { exponentForPositionalForcesToCreateCurvedDelta } from "./forceX";

export function getDepthGridY<T extends HasNumberId>(
  strength?:
    | number
    | ((
        d: SimulationNodeDatum,
        i: number,
        data: SimulationNodeDatum[],
      ) => number),
  height = 600,
) {
  let staticStrength = null;
  if (typeof strength === "number") {
    staticStrength =
      strength === 0
        ? 0
        : Math.pow(strength, exponentForPositionalForcesToCreateCurvedDelta);
  }

  return d3
    .forceY((_d: DataNode<T>, i, data) => {
      const centerOffset = height / 2;
      return (
        centerOffset - centerOffset * Math.cos((i / data.length) * Math.PI * 2)
      );
    })
    .strength(staticStrength ?? strength ?? 0);
}

export function updateForceY<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceYStrength: number,
) {
  const force = currentSim.force("forceY") as ForceY<DataNode<T>> | undefined;
  if (!force) return;
  else {
    force.strength(forceYStrength);
  }
}
