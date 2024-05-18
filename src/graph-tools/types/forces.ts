import * as d3 from "d3";

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
  // eslint-disable-next-line no-unused-vars
  [K in ForceKey]: d3.Force<any, any>;
};

export type Forces = Partial<BaseForces>;
