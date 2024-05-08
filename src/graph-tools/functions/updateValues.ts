import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {Simulation} from "d3";
import {ForceAttributeListenerReturn} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {updateLinkForce} from "@/graph-tools/forces/forceLink";
import {updateManyBodyForce} from "@/graph-tools/forces/forceManyBody";
import {updateForceX} from "@/graph-tools/forces/forceX";
import {updateForceY} from "@/graph-tools/forces/forceY";
import {updateForceRadial} from "@/graph-tools/forces/forceRadial";

export function updateValues<T extends HasNumberId>(currentSim: Simulation<DataNode<T>, DataLink<T>>, forceAttributeListeners: ForceAttributeListenerReturn) {
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
        linkStrengthRef.current != linkStrengthNormalized ||
        linkDistanceRef.current != linkDistanceNormalized
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
        manyBodyThetaRef.current != manyBodyThetaNormalized ||
        manyBodyStrengthRef.current != manyBodyStrengthNormalized ||
        manyBodyMinDistanceRef.current != manyBodyMinDistanceNormalized ||
        manyBodyMaxDistanceRef.current != manyBodyMaxDistanceNormalized
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
    }
    if (forceXStrengthRef.current != forceXStrengthNormalized) {
        updateForceX(currentSim, forceXStrengthNormalized);
        forceXStrengthRef.current = forceXStrengthNormalized;
    }
    if (forceYStrengthRef.current != forceYStrengthNormalized) {
        updateForceY(currentSim, forceYStrengthNormalized);
        forceYStrengthRef.current = forceYStrengthNormalized;
    }
    if (forceRadialStrengthRef.current != forceRadialStrengthNormalized) {
        updateForceRadial(currentSim, forceRadialStrengthNormalized);
        forceRadialStrengthRef.current = forceRadialStrengthNormalized;
    }
}