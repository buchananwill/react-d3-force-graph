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
  const conditionallyUpdate = (
    keys: ForceAttributeKey[],
    updater: ForceUpdater<T>,
  ) => {
    if (keys.some((key) => valueChanged(key))) {
      const values = keys.map((key) => getValue(key));
      updater(currentSim, ...values);
      keys.forEach((key) => updatePrev(key));
    }
  };

  updateKeySets.forEach(({ keys, updater }) =>
    conditionallyUpdate(keys, updater),
  );
}

const updateKeySets: {
  keys: ForceAttributeKey[];
  updater: ForceUpdater<any>;
}[] = [
  {
    keys: ["linkStrength", "linkDistance"],
    updater: updateLinkForce,
  },
  { keys: ["collideStrength"], updater: updateCollideForce },
  {
    keys: [
      "manyBodyStrength",
      "manyBodyTheta",
      "manyBodyMinDistance",
      "manyBodyMaxDistance",
    ],
    updater: updateManyBodyForce,
  },
  { keys: ["forceXStrength"], updater: updateForceX },
  {
    keys: ["forceYStrength", "forceYSpacing"],
    updater: updateForceY,
  },
  { keys: ["forceRadialStrength"], updater: updateForceRadial },
];

export type ForceUpdater<T extends HasNumberId> = (
  current: Simulation<DataNode<T>, DataLink<T>>,
  ...rest: number[]
) => void;
