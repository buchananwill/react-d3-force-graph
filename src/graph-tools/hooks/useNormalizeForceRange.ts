import {useMemo} from "react";

/**
 These values are not range[0,1]:
 <ol>
 <li>linkStrength</li>
 <li> manyBodyStrength</li>
 <li>distances</li>
 </ol>
 */
export type ForceNormalizationCategory =
    | 'manyBodyStrength'
    | 'manyBodyMinDistance'
    | 'manyBodyMaxDistance'
    | 'linkDistance';

export function useNormalizeForceRange(
    value: number,
    category?: ForceNormalizationCategory
): number {
    return useMemo(() => {
        switch (category) {
            case 'manyBodyStrength':
                return (value - 100);
            case 'manyBodyMaxDistance':
            case 'manyBodyMinDistance':
            case 'linkDistance': {
                return value;
            }
            default:
                return value / 200;
        }
    }, [category, value]);
}