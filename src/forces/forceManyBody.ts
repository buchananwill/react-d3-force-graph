 
import * as d3 from "d3";
import { Simulation, SimulationNodeDatum } from "d3";

import { DataLink, DataNode, HasNumberId } from "../types";
import { updateForce } from "./updateForce";
import { ForceKeys } from "../types";

export function getForceManyBody(
  maxDist: number,
  minDist: number,
  strength: (
    d: SimulationNodeDatum,
    i: number,
    data: SimulationNodeDatum[],
  ) => number,
) {
  return d3
    .forceManyBody()
    .strength(strength)
    .distanceMax(maxDist)
    .distanceMin(minDist);
}

export function updateManyBodyForce<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  manyBodyStrength: number,
  manyBodyTheta: number,
  manyBodyMinDistance: number,
  manyBodyMaxDistance: number,
) {
  function consumerManyBody(forceManyBody: d3.ForceManyBody<DataNode<T>>) {
    forceManyBody
      .strength(manyBodyStrength)
      .distanceMin(manyBodyMinDistance)
      .distanceMax(manyBodyMaxDistance)
      .theta(manyBodyTheta);
  }
  updateForce(currentSim, ForceKeys.manyBody, consumerManyBody);
}
