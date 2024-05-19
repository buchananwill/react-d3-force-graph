/* eslint-disable no-unused-vars */
import * as d3 from "d3";
import { Simulation, SimulationNodeDatum } from "d3";

import { DataLink, DataNode, HasNumberId } from "@/graph-tools/types/util";
import { updateForce } from "@/graph-tools/forces/updateForce";
import { exponentForPositionalForcesToCreateCurvedDelta } from "@/graph-tools/forces/forceX";

export function getModulusGridY<T extends HasNumberId>(
  spacing: number,
  height: number = 600,
  strength?:
    | number
    | ((
        d: SimulationNodeDatum,
        i: number,
        data: SimulationNodeDatum[],
      ) => number),
) {
  let staticStrength = null;
  if (typeof strength === "number") {
    staticStrength =
      strength === 0
        ? 0
        : Math.pow(strength, exponentForPositionalForcesToCreateCurvedDelta);
  }

  return d3
    .forceY((_d: DataNode<T>, i) => {
      const distanceFromRoot = _d.distanceFromRoot;
      if (distanceFromRoot === undefined || isNaN(distanceFromRoot))
        return height / 2;
      else return (distanceFromRoot * spacing) % height;
    })
    .strength(staticStrength ?? strength ?? 0);
}

export function updateForceY<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceYStrength: number,
) {
  function consumer(forceY: d3.ForceY<DataNode<T>>) {
    const strength =
      forceYStrength === 0
        ? 0
        : Math.pow(
            forceYStrength,
            exponentForPositionalForcesToCreateCurvedDelta,
          );
    const finalStrength = strength > 0.001 ? strength : 0;
    forceY.strength(finalStrength);
  }

  updateForce(currentSim, "forceY", consumer);
}
