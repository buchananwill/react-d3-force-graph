import {getHorizontalParentsToChildrenLayout} from "@/graph-tools/forces/forceX";
import {getModulusGridY} from "@/graph-tools/forces/forceY";
import {getForceManyBody} from "@/graph-tools/forces/forceManyBody";
import {getLinkForceMinCosFallOffBusiestNode} from "@/graph-tools/forces/forceLink";
import * as d3 from "d3";
import {getForceCollide} from "@/graph-tools/forces/forceCollide";
import {getForceRadial} from "@/graph-tools/forces/forceRadial";
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {ForceAttributeListenerReturn} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {Forces} from "@/graph-tools/types/forces";

export function createForces<T extends HasNumberId>(
    forceAttributeListeners: ForceAttributeListenerReturn,
    width: number,
    height: number,
    links: DataLink<T>[],
    nodes: DataNode<T>[]): Forces {
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

    const numberOfNodes = nodes.length;
    const spacingY = numberOfNodes > 0 ? (height / numberOfNodes) * 2 : 1;

    const forceX = getHorizontalParentsToChildrenLayout(
        nodes,
        width,
        forceXStrengthNormalized
    );
    const forceY = getModulusGridY(
        spacingY,
        height,
        () => forceYStrengthNormalized
    );

    const charge = getForceManyBody(
        manyBodyMaxDistanceNormalized,
        manyBodyMinDistanceNormalized,
        () => manyBodyStrengthNormalized
    );

    const link = getLinkForceMinCosFallOffBusiestNode(
        links,
        () => {
            return nodes.length;
        },
        linkStrengthNormalized,
        linkDistanceNormalized
    );

    const center = d3
        .forceCenter(width / 2, height / 2)
        .strength(centerStrengthNormalized);

    const collide = getForceCollide(20, collideStrengthNormalized);

    const radial = getForceRadial(
        width,
        height,
        forceRadialStrengthNormalized
    );

    return {
        forceX, forceY, center, charge, collide, link, radial,
    }
}