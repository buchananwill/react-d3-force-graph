import { Simulation } from "d3";

import { DataLink, DataNode, ForceWithStrength, HasNumberId } from "../types";
import { updateForce } from "./updateForce";

export function updateForceCustom<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  strength:
    | number
    | ((d: DataNode<T>, i: number, data: DataNode<T>[]) => number),
) {
  function consumerCustomForce(
    forceCustom: ForceWithStrength<DataNode<T>, DataLink<T>>,
  ) {
    forceCustom.strength(strength);
  }

  updateForce(currentSim, "custom", consumerCustomForce);
}
