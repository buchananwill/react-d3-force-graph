import { DataLink, DataNode, HasNumberId } from "../types";
import { Simulation } from "d3";
import { updateLinkForce } from "../forces/forceLink";
import { updateManyBodyForce } from "../forces/forceManyBody";
import { updateForceX } from "../forces/forceX";
import { updateForceY } from "../forces/forceY";
import { updateForceRadial } from "../forces/forceRadial";
import { updateCollideForce } from "../forces/forceCollide";
import { ForceAttributeListenersReturn } from "../types";

export function updateForces<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  forceAttributeListeners: ForceAttributeListenersReturn,
) {
  const {
    forceYStrengthNormalized,
    forceXStrengthNormalized,
    forceRadialStrengthNormalized,
    manyBodyStrengthNormalized,
    collideStrengthNormalized,
    linkStrengthNormalized,
    manyBodyMinDistanceNormalized,
    manyBodyMaxDistanceNormalized,
    manyBodyThetaNormalized,
    linkDistanceNormalized,
    forceRadialStrengthRef,
    collideStrengthRef,
    forceXStrengthRef,
    forceYStrengthRef,
    linkDistanceRef,
    linkStrengthRef,
    manyBodyMaxDistanceRef,
    manyBodyMinDistanceRef,
    manyBodyStrengthRef,
    manyBodyThetaRef,
  } = forceAttributeListeners;

  if (
    linkStrengthRef.current !== linkStrengthNormalized ||
    linkDistanceRef.current !== linkDistanceNormalized
  ) {
    updateLinkForce(currentSim, linkStrengthNormalized, linkDistanceNormalized);
    linkStrengthRef.current = linkStrengthNormalized;
    linkDistanceRef.current = linkDistanceNormalized;
  }
  if (collideStrengthRef.current !== collideStrengthNormalized) {
    updateCollideForce(currentSim, collideStrengthNormalized);
    collideStrengthRef.current = collideStrengthNormalized;
  }
  if (
    manyBodyThetaRef.current !== manyBodyThetaNormalized ||
    manyBodyStrengthRef.current !== manyBodyStrengthNormalized ||
    manyBodyMinDistanceRef.current !== manyBodyMinDistanceNormalized ||
    manyBodyMaxDistanceRef.current !== manyBodyMaxDistanceNormalized
  ) {
    updateManyBodyForce(
      currentSim,
      manyBodyStrengthNormalized,
      manyBodyThetaNormalized,
      manyBodyMinDistanceNormalized,
      manyBodyMaxDistanceNormalized,
    );
    manyBodyThetaRef.current = manyBodyThetaNormalized;
    manyBodyStrengthRef.current = manyBodyStrengthNormalized;
    manyBodyMinDistanceRef.current = manyBodyMinDistanceNormalized;
    manyBodyMaxDistanceRef.current = manyBodyMaxDistanceNormalized;
  }
  if (forceXStrengthRef.current !== forceXStrengthNormalized) {
    updateForceX(currentSim, forceXStrengthNormalized);
    forceXStrengthRef.current = forceXStrengthNormalized;
  }
  // TODO Needs to update vertical grid spacing if the number of node depths changes.
  if (forceYStrengthRef.current !== forceYStrengthNormalized) {
    updateForceY(currentSim, forceYStrengthNormalized);
    forceYStrengthRef.current = forceYStrengthNormalized;
  }
  if (forceRadialStrengthRef.current !== forceRadialStrengthNormalized) {
    updateForceRadial(currentSim, forceRadialStrengthNormalized);
    forceRadialStrengthRef.current = forceRadialStrengthNormalized;
  }
}
