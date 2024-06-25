// Define a type 'ForceAttributeKeys' as a key of the initial settings object.
import { ForceAttributesInitial } from "../literals";

export type ForceAttributeKey = keyof typeof ForceAttributesInitial;

// Define an interface 'ForceAttributesDto' using 'ForceAttributeKeys' with all values as numbers.
export type ForceAttributesDto = {
  [key in ForceAttributeKey]: number;
};
