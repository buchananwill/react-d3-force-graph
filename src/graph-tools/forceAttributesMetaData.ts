import {useMemo} from 'react';

// This object defines the initial settings for force attributes.
export const ForceAttributesInitial = {
    id: 1,
    centerStrength: 50,
    collideStrength: 20,
    linkDistance: 100,
    linkStrength: 80,
    manyBodyStrength: 50,
    manyBodyTheta: 180,
    manyBodyMinDistance: 20,
    manyBodyMaxDistance: 400,
    forceXStrength: 0,
    forceYStrength: 0,
    forceRadialStrength: 0,
    forceRadialXRelative: 100,
    forceRadialYRelative: 100
} as const;

// Define a type 'ForceAttributeKeys' as a key of the initial settings object.
export type ForceAttributeKeys = keyof typeof ForceAttributesInitial;

// Define an interface 'ForceAttributesDto' using 'ForceAttributeKeys' with all values as numbers.
export type ForceAttributesDto = {
    [key in ForceAttributeKeys]: number;
}

export const forceAttributesMin: ForceAttributesDto = {
    id: 1,
    forceXStrength: 0,
    forceYStrength: 0,
    linkStrength: 0,
    linkDistance: 1,
    centerStrength: 0,
    collideStrength: 0,
    manyBodyStrength: 0,
    manyBodyMinDistance: 1,
    manyBodyMaxDistance: 1,
    manyBodyTheta: 0.1,
    forceRadialStrength: 0,
    forceRadialXRelative: 1,
    forceRadialYRelative: 1
};
export const forceAttributesMax: ForceAttributesDto = {
    id: 1,
    forceXStrength: 100,
    forceYStrength: 100,
    linkStrength: 200, //
    linkDistance: 1000, //
    centerStrength: 100,
    collideStrength: 100,
    manyBodyStrength: 200, //
    manyBodyMinDistance: 1000, //
    manyBodyMaxDistance: 1000, //
    manyBodyTheta: 100,
    forceRadialStrength: 100,
    forceRadialXRelative: 100,
    forceRadialYRelative: 100
};

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
