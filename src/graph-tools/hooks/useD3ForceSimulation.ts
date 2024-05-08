import React, {MutableRefObject, useEffect, useMemo, useRef} from 'react';
import * as d3 from 'd3';
import {Simulation} from 'd3';

import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGlobalListener} from "selective-context";
import {useForceAttributeListeners} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {GraphSelectiveKeys, useGraphDispatch, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {useGraphName} from "@/graph-tools/graph/graphContextCreator";
import {beginSim} from "@/graph-tools/functions/beginSim";
import {updateValues} from "@/graph-tools/functions/updateValues";


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
    const {contextKey, mountedListenerKey, mountedKey} =
        useMemo(() => {
            return {
                contextKey: `${uniqueGraphName}:ready`,
                listenerKey: listenerKey,
                mountedKey: `${uniqueGraphName}:mounted`,
                mountedListenerKey: listenerKey
            };
        }, [uniqueGraphName]);

    const {currentState: isReady} = useGlobalListener<boolean>(
        {
            contextKey,
            listenerKey,
            initialValue: false
        }
    );

    const {currentState: simVersion} = useGraphListener('version', listenerKey, 0);

    const {dispatchWithoutListen} = useGraphDispatch(GraphSelectiveKeys.sim);

    const {currentState: isMounted} = useGlobalListener<boolean>(
        {
            contextKey: mountedKey,
            listenerKey,
            initialValue: false
        }
    );

    const {
        currentState: [width, height]
    } = useGraphListener(GraphSelectiveKeys.dimensions, listenerKey, dimensionArray);

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

        if (!simulationRef.current) {
            if (isReady) {
                simVersionRef.current = simVersion;
                beginSim(forceAttributeListeners, ticked, width, height, linksRef, simulationRef, nodesRef, spacingY, dispatchWithoutListen);
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
            updateValues(simulationRef.current!, forceAttributeListeners);
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

