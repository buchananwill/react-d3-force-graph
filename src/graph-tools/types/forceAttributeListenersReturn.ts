import React from "react";

export interface ForceAttributeListenersReturn {
    manyBodyStrengthNormalized: number;
    manyBodyStrengthRef: React.MutableRefObject<number>;
    forceXStrengthNormalized: number;
    forceXStrengthRef: React.MutableRefObject<number>;
    forceYStrengthNormalized: number;
    forceYStrengthRef: React.MutableRefObject<number>;
    forceRadialYRelativeNormalized: number;
    forceRadialYRelativeRef: React.MutableRefObject<number>;
    forceRadialStrengthNormalized: number;
    forceRadialStrengthRef: React.MutableRefObject<number>;
    linkStrengthNormalized: number;
    linkStrengthRef: React.MutableRefObject<number>;
    forceRadialXRelativeNormalized: number;
    forceRadialXRelativeRef: React.MutableRefObject<number>;
    manyBodyMinDistanceNormalized: number;
    manyBodyMinDistanceRef: React.MutableRefObject<number>;
    manyBodyMaxDistanceNormalized: number;
    manyBodyMaxDistanceRef: React.MutableRefObject<number>;
    linkDistanceNormalized: number;
    linkDistanceRef: React.MutableRefObject<number>;
    collideStrengthNormalized: number;
    collideStrengthRef: React.MutableRefObject<number>;
    centerStrengthNormalized: number;
    centerStrengthRef: React.MutableRefObject<number>;
    manyBodyThetaNormalized: number;
    manyBodyThetaRef: React.MutableRefObject<number>;
}