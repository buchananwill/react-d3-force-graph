import { DataLink, DataNode, HasNumberId } from "../types";
import * as D3 from "d3";
import { Simulation } from "d3";
import { ForceKey } from "../types";

export function updateForce<
  T extends HasNumberId,
  F extends D3.Force<DataNode<T>, DataLink<T>>,
>(
  current: Simulation<DataNode<T>, DataLink<T>>,
  forceKey: ForceKey | string,
   
  apply: (force: F) => void,
) {
  const optionalForce = current.force(forceKey);
  if (!optionalForce) return;
  const force = optionalForce as F;
  apply(force);
}
