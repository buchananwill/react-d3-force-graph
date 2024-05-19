// Define a type 'ForceAttributeKeys' as a key of the initial settings object.
import { ForceAttributesInitial } from "@/graph-tools";

export type ForceAttributeKeys = keyof typeof ForceAttributesInitial;

// Define an interface 'ForceAttributesDto' using 'ForceAttributeKeys' with all values as numbers.
export type ForceAttributesDto = {
  // eslint-disable-next-line no-unused-vars
  [key in ForceAttributeKeys]: number;
};
