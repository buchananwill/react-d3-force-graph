import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {Force, ForceManyBody, Simulation} from "d3";
import {ForceAttributeListenerReturn} from "@/graph-tools/hooks/ForceAttributesDto";
import {updateLinkForce} from "@/graph-tools/forces/forceLink";
import {updateManyBodyForce} from "@/graph-tools/forces/forceManyBody";
import {updateForceX} from "@/graph-tools/forces/forceX";
import {updateForceY} from "@/graph-tools/forces/forceY";
import {updateForceRadial} from "@/graph-tools/forces/forceRadial";
import {StringMap} from "selective-context/dist/types";
import {useRef} from "react";
import _ from "lodash";
import {updateCollideForce} from "@/graph-tools/forces/forceCollide";
import {ForceKeys} from "@/graph-tools/types/forces";

export function updateForces<T extends HasNumberId>(currentSim: Simulation<DataNode<T>, DataLink<T>>, forceAttributeListeners: ForceAttributeListenerReturn) {
    const {
        forceYStrengthNormalized,
        forceXStrengthNormalized,
        forceRadialStrengthNormalized,
        manyBodyStrengthNormalized,
        centerStrengthNormalized,
        collideStrengthNormalized,
        linkStrengthNormalized,
        manyBodyMinDistanceNormalized,
        manyBodyMaxDistanceNormalized,
        manyBodyThetaNormalized,
        linkDistanceNormalized,
        forceRadialStrengthRef,
        centerStrengthRef,
        collideStrengthRef,
        forceRadialXRelativeNormalized,
        forceRadialXRelativeRef,
        forceRadialYRelativeNormalized,
        forceRadialYRelativeRef,
        forceXStrengthRef,
        forceYStrengthRef,
        linkDistanceRef,
        linkStrengthRef,
        manyBodyMaxDistanceRef,
        manyBodyMinDistanceRef,
        manyBodyStrengthRef,
        manyBodyThetaRef
    } = forceAttributeListeners;


    if (
        linkStrengthRef.current !== linkStrengthNormalized ||
        linkDistanceRef.current !== linkDistanceNormalized
    ) {
        updateLinkForce(
            currentSim,
            linkStrengthNormalized,
            linkDistanceNormalized
        );
        linkStrengthRef.current = linkStrengthNormalized;
        linkDistanceRef.current = linkDistanceNormalized;
    }
    if (
        collideStrengthRef.current !== collideStrengthNormalized
    ) {
        updateCollideForce(
            currentSim,
            collideStrengthNormalized
        );
        collideStrengthRef.current = collideStrengthNormalized;
    }
    if (
        manyBodyThetaRef.current !== manyBodyThetaNormalized ||
        manyBodyStrengthRef.current !== manyBodyStrengthNormalized ||
        manyBodyMinDistanceRef.current !== manyBodyMinDistanceNormalized ||
        manyBodyMaxDistanceRef.current !== manyBodyMaxDistanceNormalized
    ) {
        updateManyBodyForce(
            currentSim,
            manyBodyStrengthNormalized,
            manyBodyThetaNormalized,
            manyBodyMinDistanceNormalized,
            manyBodyMaxDistanceNormalized
        );
        manyBodyThetaRef.current = manyBodyThetaNormalized;
        manyBodyStrengthRef.current = manyBodyStrengthNormalized;
        manyBodyMinDistanceRef.current = manyBodyMinDistanceNormalized;
        manyBodyMaxDistanceRef.current = manyBodyMaxDistanceNormalized;
        const force = currentSim.force(ForceKeys.manyBody) as ForceManyBody<any>
    }
    if (forceXStrengthRef.current !== forceXStrengthNormalized) {
        updateForceX(currentSim, forceXStrengthNormalized);
        forceXStrengthRef.current = forceXStrengthNormalized;
    }
    if (forceYStrengthRef.current !== forceYStrengthNormalized) {
        updateForceY(currentSim, forceYStrengthNormalized);
        forceYStrengthRef.current = forceYStrengthNormalized;
    }
    if (forceRadialStrengthRef.current !== forceRadialStrengthNormalized) {
        updateForceRadial(currentSim, forceRadialStrengthNormalized);
        forceRadialStrengthRef.current = forceRadialStrengthNormalized;
    }
}

function useForceUpdate(values: StringMap<number>, forceUpdater: (currentSim:  Simulation<DataNode<any>, DataLink<any>>, values: StringMap<number>) => void, currentSim: Simulation<DataNode<any>, DataLink<any>>) {
    const valuesRef = useRef(values);
    if (!_.isEqual(valuesRef.current, values)) {
        forceUpdater(currentSim, values)
        return true
    } else {
        return false
    }
}