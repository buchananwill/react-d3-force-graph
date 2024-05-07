
import React, { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { Simulation } from 'd3';


import {
  getHorizontalParentsToChildrenLayout,
  updateForceX
} from '../forces/forceX';
import { getModulusGridY, updateForceY } from '../forces/forceY';
import {
  getForceManyBody,
  updateManyBodyForce
} from '../forces/forceManyBody';
import {
  getLinkForceMinCosFallOffBusiestNode,
  updateLinkForce
} from '../forces/forceLink';
import { getForceCollide } from '../forces/forceCollide';

import { getForceRadial, updateForceRadial } from '../forces/forceRadial';

import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGlobalListener} from "selective-context";
import {useForceAttributeListeners} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {useGraphDispatch, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {useGraphName} from "@/graph-tools/graph/graphContextCreator";


export type StandardForceKey =
  | 'link'
  | 'charge'
  | 'collide'
  | 'center'
  | 'radial'
  | 'forceX'
  | 'forceY';

const listenerKey = `force-sim`;

const dimensionArray = [1800, 1200];

export function useD3ForceSimulation<T extends HasNumberId>(
    nodesRef: React.MutableRefObject<DataNode<T>[]>,
    linksRef: React.MutableRefObject<DataLink<T>[]>,
    ticked: () => void
) {
  const uniqueGraphName = useGraphName();
  const forceAttributeListeners = useForceAttributeListeners('sim');
  const { contextKey, mountedListenerKey, mountedKey } =
    useMemo(() => {
      return {
        contextKey: `${uniqueGraphName}:ready`,
        listenerKey: listenerKey,
        mountedKey: `${uniqueGraphName}:mounted`,
        mountedListenerKey: listenerKey
      };
    }, [uniqueGraphName]);

  const { currentState: isReady } = useGlobalListener<boolean>(
      {
        contextKey,
        listenerKey,
        initialValue: false
      }
  );

  const { currentState: simVersion } = useGraphListener('version', listenerKey, 0);

  const {dispatchWithoutListen} = useGraphDispatch('sim');

  const { currentState: isMounted } = useGlobalListener<boolean>(
      {
        contextKey: mountedKey,
        listenerKey,
        initialValue: false
      }
  );

  const {
    currentState: [width, height]
  } = useGraphListener('dimensions', listenerKey, dimensionArray);

  const simVersionRef = useRef(simVersion);

  const simulationRef: MutableRefObject<Simulation<
    DataNode<T>,
    DataLink<T>
  > | null> = useRef(null);

  useEffect(() => {
    const numberOfNodes = nodesRef.current?.length || 0;
    const spacingX = numberOfNodes > 0 ? (width - 200) / numberOfNodes : 1;
    const spacingY = numberOfNodes > 0 ? (height / numberOfNodes) * 2 : 1;

    const nodesMutable = nodesRef.current;
    const linksMutable = linksRef.current;

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

    function beginSim() {
      // const forceX = getGridX(width, spacingX, forceXStrengthNormalized);
      const forceX = getHorizontalParentsToChildrenLayout(
        nodesMutable,
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
        nodesMutable
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

    function updateValues(currentSim: Simulation<DataNode<T>, DataLink<T>>) {
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

    if (!simulationRef.current) {
      if (isReady) {
        simVersionRef.current = simVersion;
        beginSim();
      }
    } else {
      if (simVersionRef.current !== simVersion) {
        simulationRef.current?.nodes(nodesMutable);
        const force = simulationRef.current?.force('link');
        if (force) {
          const forceLink = force as d3.ForceLink<DataNode<T>, DataLink<T>>;
          forceLink.links(linksMutable);
        }
        simVersionRef.current = simVersion
        simulationRef.current?.restart()
        simulationRef.current.on('tick', ticked)
      } else {
        simulationRef.current.on('tick', ticked);
      }
      updateValues(simulationRef.current!);
    }

    return () => {
      if (!isMounted && simulationRef.current) simulationRef.current.stop();
    };
  }, [
      dispatchWithoutListen,
    isMounted,
    simVersion,
    forceAttributeListeners,
    nodesRef,
    linksRef,
    width,
    height,
    ticked,
    isReady
  ]);
}
