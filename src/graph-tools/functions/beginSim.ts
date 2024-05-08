import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {ForceAttributeListenerReturn} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import * as d3 from "d3";
import {Simulation} from "d3";
import React, {Dispatch, MutableRefObject, SetStateAction} from "react";
import {getHorizontalParentsToChildrenLayout} from "@/graph-tools/forces/forceX";
import {getModulusGridY} from "@/graph-tools/forces/forceY";
import {getForceManyBody} from "@/graph-tools/forces/forceManyBody";
import {getLinkForceMinCosFallOffBusiestNode} from "@/graph-tools/forces/forceLink";
import {getForceCollide} from "@/graph-tools/forces/forceCollide";
import {getForceRadial} from "@/graph-tools/forces/forceRadial";

export function beginSim<T extends HasNumberId>(
    forceAttributeListeners: ForceAttributeListenerReturn,
    ticked: (this: Simulation<DataNode<T>, DataLink<T>>) => void,
    width: number,
    height: number,
    linksRef: React.MutableRefObject<DataLink<T>[]>,
    simulationRef: React.MutableRefObject<Simulation<DataNode<T>, DataLink<T>> | null>,
    nodesRef: React.MutableRefObject<DataNode<T>[]>,
    spacingY: number,
    dispatchWithoutListen: React.Dispatch<React.SetStateAction<React.MutableRefObject<Simulation<DataNode<T>, DataLink<T>> | null>>>) {
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

    // const forceX = getGridX(width, spacingX, forceXStrengthNormalized);
    const forceX = getHorizontalParentsToChildrenLayout(
        nodesRef.current,
        width,
        forceXStrengthNormalized
    );
    const forceY = getModulusGridY(
        spacingY,
        height,
        () => forceYStrengthNormalized
    );

    const forceManyBody = getForceManyBody(
        manyBodyMaxDistanceNormalized,
        manyBodyMinDistanceNormalized,
        () => manyBodyStrengthNormalized
    );

    const forceLink = getLinkForceMinCosFallOffBusiestNode(
        linksRef.current,
        () => {
            return nodesRef.current.length;
        },
        linkStrengthNormalized,
        linkDistanceNormalized
    );

    const forceCenter = d3
        .forceCenter(width / 2, height / 2)
        .strength(centerStrengthNormalized);

    const forceCollide = getForceCollide(20, collideStrengthNormalized);

    const forceRadial = getForceRadial(
        width,
        height,
        forceRadialStrengthNormalized
    );

    const simulation = d3.forceSimulation<DataNode<T>, DataLink<T>>(
        nodesRef.current
    );

    simulation.force('link', forceLink);
    simulation.force('charge', forceManyBody);
    simulation.force('collide', forceCollide);
    simulation.force('center', forceCenter);
    simulation.force('radial', forceRadial);
    simulation.force('forceX', forceX);
    simulation.force('forceY', forceY);
    simulation.on('tick', ticked);

    simulation.alphaDecay(0.0);
    simulation.alphaTarget(0);
    simulationRef.current = simulation;
    dispatchWithoutListen(simulationRef)
}