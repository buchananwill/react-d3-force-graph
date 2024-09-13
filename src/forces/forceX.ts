import * as D3 from "d3";
import * as d3 from "d3";
import { ForceX, Simulation, SimulationNodeDatum } from "d3";

import { DataLink, DataNode, HasNumberId } from "../types";
import { updateForce } from "./updateForce";

export const exponentForPositionalForcesToCreateCurvedDelta = 3;

export function updateForceXOld<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceXStrength: number,
) {
  function consumerForceX(forceXDefined: d3.ForceX<DataNode<T>>) {
    const strength = Math.pow(
      forceXStrength,
      exponentForPositionalForcesToCreateCurvedDelta,
    );
    const finalStrength = strength > 0.001 ? strength : 0;
    forceXDefined.strength(finalStrength);
  }
  updateForce(currentSim, "forceX", consumerForceX);
}

export function getHorizontalParentsToChildrenLayout<T extends HasNumberId>(
  nodes: DataNode<T>[],
  width: number,
  strength: number,
): D3.ForceX<DataNode<T>> {
  // console.log('width for x force:', width)
  const rootDistances = new Set<number>();
  nodes.forEach((n) => rootDistances.add(n.distanceFromRoot));
  const spacing = width / (rootDistances.size + 1);
  // console.log('width for x force:', spacing)
  const distancesInOrder: number[] = [...rootDistances.values()];
  distancesInOrder.sort((a, b) => a - b);
  return D3.forceX((d) => {
    return (
      distancesInOrder.indexOf((d as DataNode<T>).distanceFromRoot) * spacing
    );
  }).strength(strength);
}

export function getDepthGridX<T extends HasNumberId>(
  spacing: number,
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
    .forceX((_d: DataNode<T>) => {
      const distanceFromRoot = _d.distanceFromRoot;
      if (distanceFromRoot === undefined || isNaN(distanceFromRoot))
        return width / 2;
      else return distanceFromRoot * spacing;
    })
    .strength(staticStrength ?? strength ?? 0);
}

export function updateForceX<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceXStrength: number,
  forceXSpacing: number,
) {
  const force = currentSim.force("forceX") as ForceX<DataNode<T>> | undefined;
  if (!force) return;
  else {
    // const modulusGridX = getDepthGridX(forceXSpacing, forceXStrength);
    console.log(forceXSpacing);
    force.strength(forceXStrength);
  }
}
