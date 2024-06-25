import { DataLink, DataNode, ForceAttributeKey, HasNumberId } from "../types";
import { Simulation } from "d3";
import { updateLinkForce } from "../forces/forceLink";
import { updateManyBodyForce } from "../forces/forceManyBody";
import { updateForceX } from "../forces/forceX";
import { updateForceY } from "../forces/forceY";
import { updateForceRadial } from "../forces/forceRadial";
import { updateCollideForce } from "../forces/forceCollide";

export function updateForces<T extends HasNumberId>(
  currentSim: Simulation<DataNode<T>, DataLink<T>>,
  getValue: (key: ForceAttributeKey) => number,
  valueChanged: (key: ForceAttributeKey) => boolean,
  updatePrev: (key: ForceAttributeKey) => void,
) {
  // Check and update link force
  if (valueChanged("linkStrength") || valueChanged("linkDistance")) {
    updateLinkForce(
      currentSim,
      getValue("linkStrength"),
      getValue("linkDistance"),
    );
    updatePrev("linkStrength");
    updatePrev("linkDistance");
  }

  // Check and update collide force
  if (valueChanged("collideStrength")) {
    updateCollideForce(currentSim, getValue("collideStrength"));
    updatePrev("collideStrength");
  }

  // Check and update many body force
  if (
    valueChanged("manyBodyStrength") ||
    valueChanged("manyBodyTheta") ||
    valueChanged("manyBodyMinDistance") ||
    valueChanged("manyBodyMaxDistance")
  ) {
    updateManyBodyForce(
      currentSim,
      getValue("manyBodyStrength"),
      getValue("manyBodyTheta"),
      getValue("manyBodyMinDistance"),
      getValue("manyBodyMaxDistance"),
    );
    updatePrev("manyBodyStrength");
    updatePrev("manyBodyTheta");
    updatePrev("manyBodyMinDistance");
    updatePrev("manyBodyMaxDistance");
  }

  // Check and update force X
  if (valueChanged("forceXStrength")) {
    updateForceX(currentSim, getValue("forceXStrength"));
    updatePrev("forceXStrength");
  }

  // Check and update force Y
  if (valueChanged("forceYStrength") || valueChanged("forceYSpacing")) {
    updateForceY(
      currentSim,
      getValue("forceYStrength"),
      getValue("forceYSpacing"),
    );
    updatePrev("forceYStrength");
    updatePrev("forceYSpacing");
  }

  // Check and update radial force
  if (valueChanged("forceRadialStrength")) {
    updateForceRadial(currentSim, getValue("forceRadialStrength"));
    updatePrev("forceRadialStrength");
  }
}
