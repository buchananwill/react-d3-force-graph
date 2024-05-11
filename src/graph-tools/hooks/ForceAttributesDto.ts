import React, {useMemo, useRef} from 'react';
import {useGlobalListener} from "selective-context";
import {useGraphName} from "@/graph-tools/graph/graphContextCreator";
import {useNormalizeForceRange} from "@/graph-tools/forceAttributesMetaData";

const defaultValueForForceSliders = 100

const initialValue = defaultValueForForceSliders

export interface ForceAttributeListenerReturn {
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

export function useForceAttributeListeners(listenerKey: string) {
    let uniqueGraphName = useGraphName();
    const {currentState: manyBodyStrength} = useGlobalListener<number>({
            contextKey: `${uniqueGraphName}:manyBodyStrength`,
            listenerKey,
            initialValue
        }
    );
    const {currentState: forceXStrength} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:forceXStrength`,
        listenerKey,
        initialValue
    });
    const {currentState: forceYStrength} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:forceYStrength`,
        listenerKey,
        initialValue
    });
    const {currentState: forceRadialYRelative} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:forceRadialYRelative`,
        listenerKey,
        initialValue
    });
    const {currentState: forceRadialStrength} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:forceRadialStrength`,
        listenerKey,
        initialValue
    });
    const {currentState: linkStrength} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:linkStrength`,
        listenerKey,
        initialValue
    });
    const {currentState: forceRadialXRelative} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:forceRadialXRelative`,
        listenerKey,
        initialValue
    });
    const {currentState: manyBodyMinDistance} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:manyBodyMinDistance`,
        listenerKey,
        initialValue
    });
    const {currentState: manyBodyMaxDistance} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:manyBodyMaxDistance`,
        listenerKey,
        initialValue
    });
    const {currentState: linkDistance} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:linkDistance`,
        listenerKey,
        initialValue
    });
    const {currentState: collideStrength} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:collideStrength`,
        listenerKey,
        initialValue
    });
    const {currentState: centerStrength} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:centerStrength`,
        listenerKey,
        initialValue
    });
    const {currentState: manyBodyTheta} = useGlobalListener<number>({
        contextKey: `${uniqueGraphName}:manyBodyTheta`,
        listenerKey,
        initialValue
    });

    const manyBodyStrengthNormalized = useNormalizeForceRange(manyBodyStrength, 'manyBodyStrength');
    const forceXStrengthNormalized = useNormalizeForceRange(forceXStrength);
    const forceYStrengthNormalized = useNormalizeForceRange(forceYStrength);
    const forceRadialYRelativeNormalized = useNormalizeForceRange(forceRadialYRelative);
    const forceRadialStrengthNormalized = useNormalizeForceRange(forceRadialStrength);
    const linkStrengthNormalized = useNormalizeForceRange(linkStrength);
    const linkDistanceNormalized = useNormalizeForceRange(linkDistance, 'linkDistance');
    const forceRadialXRelativeNormalized = useNormalizeForceRange(forceRadialXRelative);
    const manyBodyMinDistanceNormalized = useNormalizeForceRange(manyBodyMinDistance, 'manyBodyMinDistance');
    const manyBodyMaxDistanceNormalized = useNormalizeForceRange(manyBodyMaxDistance, 'manyBodyMaxDistance');
    const collideStrengthNormalized = useNormalizeForceRange(collideStrength);
    const centerStrengthNormalized = useNormalizeForceRange(centerStrength);
    const manyBodyThetaNormalized = useNormalizeForceRange(manyBodyTheta);
    const manyBodyStrengthRef = useRef(manyBodyStrengthNormalized);
    const forceXStrengthRef = useRef(forceXStrengthNormalized);
    const forceYStrengthRef = useRef(forceYStrengthNormalized);
    const forceRadialYRelativeRef = useRef(forceRadialYRelativeNormalized);
    const forceRadialStrengthRef = useRef(forceRadialStrengthNormalized);
    const linkStrengthRef = useRef(linkStrengthNormalized);
    const forceRadialXRelativeRef = useRef(forceRadialXRelativeNormalized);
    const manyBodyMinDistanceRef = useRef(manyBodyMinDistanceNormalized);
    const manyBodyMaxDistanceRef = useRef(manyBodyMaxDistanceNormalized);
    const linkDistanceRef = useRef(linkDistanceNormalized);
    const collideStrengthRef = useRef(collideStrengthNormalized);
    const centerStrengthRef = useRef(centerStrengthNormalized);
    const manyBodyThetaRef = useRef(manyBodyThetaNormalized);
    return useMemo(() =>( {
        manyBodyStrengthNormalized,
        forceXStrengthNormalized,
        forceYStrengthNormalized,
        forceRadialYRelativeNormalized,
        forceRadialStrengthNormalized,
        linkStrengthNormalized,
        forceRadialXRelativeNormalized,
        manyBodyMinDistanceNormalized,
        manyBodyMaxDistanceNormalized,
        linkDistanceNormalized,
        collideStrengthNormalized,
        centerStrengthNormalized,
        manyBodyThetaNormalized,
        manyBodyStrengthRef,
        forceXStrengthRef,
        forceYStrengthRef,
        forceRadialYRelativeRef,
        forceRadialStrengthRef,
        linkStrengthRef,
        forceRadialXRelativeRef,
        manyBodyMinDistanceRef,
        manyBodyMaxDistanceRef,
        linkDistanceRef,
        collideStrengthRef,
        centerStrengthRef,
        manyBodyThetaRef,
    }), [  manyBodyStrengthNormalized,
        forceXStrengthNormalized,
        forceYStrengthNormalized,
        forceRadialYRelativeNormalized,
        forceRadialStrengthNormalized,
        linkStrengthNormalized,
        forceRadialXRelativeNormalized,
        manyBodyMinDistanceNormalized,
        manyBodyMaxDistanceNormalized,
        linkDistanceNormalized,
        collideStrengthNormalized,
        centerStrengthNormalized,
        manyBodyThetaNormalized])
}
