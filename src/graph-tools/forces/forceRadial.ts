import * as d3 from 'd3';
import { Simulation } from 'd3';

import { updateForce } from './forceLink';
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";


export function updateForceRadial<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceRadialStrength: number
) {
  function consumerRadial(forceRadial: d3.ForceRadial<DataNode<T>>) {
    forceRadial.strength(getRadialStrength(forceRadialStrength));
  }

  updateForce(currentSim, 'radial', consumerRadial);
}

function getRadialStrength(forceRadialStrengthNormalized: number) {
  const squaredStrength =
    forceRadialStrengthNormalized * forceRadialStrengthNormalized;
  return squaredStrength < 0.001 ? 0 : squaredStrength;
}

export function getForceRadial(
  width: number,
  height: number,
  forceRadialStrengthNormalized: number
) {
  const finalStrength = getRadialStrength(forceRadialStrengthNormalized);
  return d3
    .forceRadial(width / 3, width / 2, height / 2)
    .strength(finalStrength);
}