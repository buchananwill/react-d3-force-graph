import { DataLink, DataNode, HasNumberId } from "@/graph-tools/types/util";
import * as D3 from "d3";
import { Simulation } from "d3";
import { ForceKey } from "@/graph-tools/types/forces";

export function updateForce<
  T extends HasNumberId,
  F extends D3.Force<DataNode<T>, DataLink<T>>,
>(
  current: Simulation<DataNode<T>, DataLink<T>>,
  forceKey: ForceKey | string,
  // eslint-disable-next-line no-unused-vars
  apply: (force: F) => void,
) {
  const optionalForce = current.force(forceKey);
  if (!optionalForce) return;
  const force = optionalForce as F;
  apply(force);
}
