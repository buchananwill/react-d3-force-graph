import { useMemo } from "react";
import { ForceAttributesInitial } from "../literals";

/**
 These values are not range[0,1]:
 <ol>
 <li>linkStrength</li>
 <li> manyBodyStrength</li>
 <li>distances</li>
 </ol>
 */
export type ForceNormalizationCategory = keyof Pick<
  typeof ForceAttributesInitial,
  | "manyBodyStrength"
  | "manyBodyMinDistance"
  | "manyBodyMaxDistance"
  | "linkDistance"
>;

export function useNormalizeForceRange(
  value: number,
  category?: ForceNormalizationCategory,
): number {
  return useMemo(() => {
    return normalizeForceRange(value, category);
  }, [category, value]);
}

export function normalizeForceRange(
  value: number,
  category?: ForceNormalizationCategory | string,
) {
  switch (category) {
    case "manyBodyStrength":
      return value - 100;
    case "manyBodyMaxDistance":
    case "manyBodyMinDistance":
    case "linkDistance": {
      return value;
    }
    default:
      return value / 200;
  }
}
