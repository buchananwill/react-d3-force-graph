import * as d3 from "d3";
import { DataLink, DataNode, HasNumberId } from "./util";

// Defining the ForceKeys as a constant object
export const ForceKeys = {
  link: "link",
  manyBody: "manyBody",
  collide: "collide",
  center: "center",
  radial: "radial",
  forceX: "forceX",
  forceY: "forceY",
} as const;

// Defining the ForceKey type to use the values of ForceKeys
export type ForceKey = (typeof ForceKeys)[keyof typeof ForceKeys];

type BaseForces = {
  [K in ForceKey]: d3.Force<DataNode<HasNumberId>, DataLink<HasNumberId>>;
};

export type Forces = Partial<BaseForces>;
