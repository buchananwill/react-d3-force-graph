import { DataLink, DataNode, ForceWithStrength, HasNumberId } from "./util";

// Defining the ForceKeys as a constant object
export const ForceKeys = {
  link: "link",
  manyBody: "manyBody",
  collide: "collide",
  center: "center",
  custom: "custom",
  forceX: "forceX",
  forceY: "forceY",
} as const;

// Defining the ForceKey type to use the values of ForceKeys
export type ForceKey = (typeof ForceKeys)[keyof typeof ForceKeys];

type BaseForces = {
  [K in ForceKey]: ForceWithStrength<
    DataNode<HasNumberId>,
    DataLink<HasNumberId>
  >;
};

export type Forces = Partial<BaseForces>;
