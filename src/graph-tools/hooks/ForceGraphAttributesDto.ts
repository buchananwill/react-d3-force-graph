import { useRef } from 'react';
import {useGlobalListener} from "selective-context";
import {useGraphName} from "@/graph-tools/graph/graphContextCreator";
import {useNormalizeForceRange} from "@/graph-tools/forceAttributesMetaData";

export interface ForceGraphAttributesDto {
  id: number,
  centerStrength: number,
  collideStrength: number,
  linkDistance: number,
  linkStrength: number,
  manyBodyStrength: number,
  manyBodyTheta: number,
  manyBodyMinDistance: number,
  manyBodyMaxDistance: number,
  forceXStrength: number,
  forceYStrength: number,
  forceRadialStrength: number,
  forceRadialXRelative: number,
  forceRadialYRelative: number,
}

const defaultValueForForceSliders = 100

const initialValue = defaultValueForForceSliders

export function useForceAttributeListeners(listenerKey: string){
    let uniqueGraphName = useGraphName();
const { currentState: manyBodyStrength } = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}-manyBodyStrength`,
    listenerKey,
    initialValue
}
);
const { currentState: forceXStrength } = useGlobalListener<number>({
        contextKey:   `${uniqueGraphName}-forceXStrength`,
    listenerKey,
    initialValue
});
const { currentState: forceYStrength } = useGlobalListener<number>({
        contextKey:  `${uniqueGraphName}-forceYStrength`,
    listenerKey,
    initialValue
});
const { currentState: forceRadialYRelative } = useGlobalListener<number>({
        contextKey:   `${uniqueGraphName}-forceRadialYRelative`,
    listenerKey,
    initialValue
});
const { currentState: forceRadialStrength } = useGlobalListener<number>({
        contextKey:  `${uniqueGraphName}-forceRadialStrength`,
    listenerKey,
    initialValue
});
const { currentState: linkStrength } = useGlobalListener<number>({
        contextKey:   `${uniqueGraphName}-linkStrength`,
    listenerKey,
    initialValue
});
const { currentState: forceRadialXRelative } = useGlobalListener<number>({
        contextKey:   `${uniqueGraphName}-forceRadialXRelative`,
    listenerKey,
    initialValue
});
const { currentState: manyBodyMinDistance } = useGlobalListener<number>({
        contextKey:   `${uniqueGraphName}-manyBodyMinDistance`,
    listenerKey,
    initialValue
});
const { currentState: manyBodyMaxDistance } = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}-manyBodyMaxDistance`,
    listenerKey,
    initialValue
});
const { currentState: linkDistance } = useGlobalListener<number>({
        contextKey:   `${uniqueGraphName}-linkDistance`,
    listenerKey,
    initialValue
});
const { currentState: collideStrength } = useGlobalListener<number>({
        contextKey:   `${uniqueGraphName}-collideStrength`,
    listenerKey,
    initialValue
});
const { currentState: centerStrength } = useGlobalListener<number>({
        contextKey:    `${uniqueGraphName}-centerStrength`,
    listenerKey,
    initialValue
});
const { currentState: manyBodyTheta } = useGlobalListener<number>({
        contextKey:  `${uniqueGraphName}-manyBodyTheta`,
    listenerKey,
    initialValue
});

const manyBodyStrengthNormalized = useNormalizeForceRange(manyBodyStrength, 'manyBodyStrength'); 
const manyBodyStrengthRef = useRef(manyBodyStrengthNormalized); 
const forceXStrengthNormalized = useNormalizeForceRange(forceXStrength); 
const forceXStrengthRef = useRef(forceXStrengthNormalized); 
const forceYStrengthNormalized = useNormalizeForceRange(forceYStrength); 
const forceYStrengthRef = useRef(forceYStrengthNormalized); 
const forceRadialYRelativeNormalized = useNormalizeForceRange(forceRadialYRelative); 
const forceRadialYRelativeRef = useRef(forceRadialYRelativeNormalized); 
const forceRadialStrengthNormalized = useNormalizeForceRange(forceRadialStrength); 
const forceRadialStrengthRef = useRef(forceRadialStrengthNormalized); 
const linkStrengthNormalized = useNormalizeForceRange(linkStrength); 
const linkStrengthRef = useRef(linkStrengthNormalized); 
const forceRadialXRelativeNormalized = useNormalizeForceRange(forceRadialXRelative); 
const forceRadialXRelativeRef = useRef(forceRadialXRelativeNormalized); 
const manyBodyMinDistanceNormalized = useNormalizeForceRange(manyBodyMinDistance, 'manyBodyMinDistance'); 
const manyBodyMinDistanceRef = useRef(manyBodyMinDistanceNormalized); 
const manyBodyMaxDistanceNormalized = useNormalizeForceRange(manyBodyMaxDistance, 'manyBodyMaxDistance'); 
const manyBodyMaxDistanceRef = useRef(manyBodyMaxDistanceNormalized); 
const linkDistanceNormalized = useNormalizeForceRange(linkDistance, 'linkDistance'); 
const linkDistanceRef = useRef(linkDistanceNormalized); 
const collideStrengthNormalized = useNormalizeForceRange(collideStrength); 
const collideStrengthRef = useRef(collideStrengthNormalized); 
const centerStrengthNormalized = useNormalizeForceRange(centerStrength); 
const centerStrengthRef = useRef(centerStrengthNormalized); 
const manyBodyThetaNormalized = useNormalizeForceRange(manyBodyTheta); 
const manyBodyThetaRef = useRef(manyBodyThetaNormalized); 
    return { manyBodyStrengthNormalized, manyBodyStrengthRef, forceXStrengthNormalized, forceXStrengthRef, forceYStrengthNormalized, forceYStrengthRef, forceRadialYRelativeNormalized, forceRadialYRelativeRef, forceRadialStrengthNormalized, forceRadialStrengthRef, linkStrengthNormalized, linkStrengthRef, forceRadialXRelativeNormalized, forceRadialXRelativeRef, manyBodyMinDistanceNormalized, manyBodyMinDistanceRef, manyBodyMaxDistanceNormalized, manyBodyMaxDistanceRef, linkDistanceNormalized, linkDistanceRef, collideStrengthNormalized, collideStrengthRef, centerStrengthNormalized, centerStrengthRef, manyBodyThetaNormalized, manyBodyThetaRef,  }
}
