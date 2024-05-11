import * as d3 from 'd3';
import { Simulation } from 'd3';

import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {updateForce} from "@/graph-tools/forces/updateForce";


export function updateForceRadial<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceRadialStrength: number
) {
  function consumerRadial(forceRadial: d3.ForceRadial<DataNode<T>>) {
    forceRadial.strength(getRadialStrength(forceRadialStrength));
  }

  updateForce(currentSim, 'radial', consumerRadial);
}

const cubicRadialCurveForEasierAdjustment = 4;

function getRadialStrength(forceRadialStrengthNormalized: number) {
  const curvedStrength = forceRadialStrengthNormalized === 0 ? 0 :
    Math.pow(forceRadialStrengthNormalized, cubicRadialCurveForEasierAdjustment);
  const computedValue = (curvedStrength < 0.001 ? 0 : curvedStrength);
  return Math.min(Math.max(computedValue, 0), 1)
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
