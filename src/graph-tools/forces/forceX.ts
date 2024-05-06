import * as D3 from 'd3';
import * as d3 from 'd3';
import { Simulation } from 'd3';

import { updateForce } from './forceLink';
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";


export function getGridX(
  width: number,
  spacing: number = 30,
  strength: number
) {
  return D3.forceX((_d, index) => {
    if (index == undefined || isNaN(index)) return width / 2;
    else return index * spacing;
  }).strength(strength);
}

export function updateForceX<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceXStrength: number
) {
  function consumerForceX(forceXDefined: d3.ForceX<DataNode<T>>) {
    const strength = forceXStrength;
    const finalStrength = strength > 0.001 ? strength : 0;
    forceXDefined.strength(finalStrength);
  }
  updateForce(currentSim, 'forceX', consumerForceX);
}

export function getHorizontalParentsToChildrenLayout<T extends HasNumberId>(
  nodes: DataNode<T>[],
  width: number,
  strength: number
): D3.ForceX<DataNode<T>> {
  const rootDistances = new Set<number>();
  nodes.forEach((n) => rootDistances.add(n.distanceFromRoot));
  const spacing = width / (rootDistances.size + 1);
  const distancesInOrder: number[] = [...rootDistances.values()];
  distancesInOrder.sort((a, b) => a - b);
  return D3.forceX((d) => {
    return (
      distancesInOrder.indexOf((d as DataNode<T>).distanceFromRoot) * spacing
    );
  }).strength(strength);
}