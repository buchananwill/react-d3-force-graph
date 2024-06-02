import * as D3 from "d3";
import * as d3 from "d3";
import { Simulation } from "d3";

import { DataLink, DataNode, HasNumberId } from "../types";
import { updateForce } from "./updateForce";

export const exponentForPositionalForcesToCreateCurvedDelta = 3;

export function updateForceX<T extends HasNumberId>(
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
