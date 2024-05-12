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

