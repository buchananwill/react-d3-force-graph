import React, {MutableRefObject, useCallback, useEffect, useMemo, useRef} from 'react';
import * as d3 from 'd3';
import {Simulation} from 'd3';

import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useForceAttributeListeners} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {GraphSelectiveKeys, useGraphDispatch, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {beginSim} from "@/graph-tools/functions/beginSim";
import {updateValues} from "@/graph-tools/functions/updateValues";
import {createForces} from "@/graph-tools/functions/createForces";


const listenerKey = `force-sim`;

const dimensionArray = [1800, 1200];

export function useD3ForceSimulation<T extends HasNumberId>(
    nodesRef: React.MutableRefObject<DataNode<T>[]>,
    linksRef: React.MutableRefObject<DataLink<T>[]>,
    ticked: () => void
) {
    const forceAttributes = useForceAttributeListeners('sim');
    const {currentState: isMounted} = useGraphListener(GraphSelectiveKeys.mounted, listenerKey, false);
    const {currentState: isReady} = useGraphListener(GraphSelectiveKeys.ready, listenerKey, false);
    const {currentState: simVersion} = useGraphListener('version', listenerKey, 0);
    const {dispatchWithoutListen} = useGraphDispatch(GraphSelectiveKeys.sim);

    const {
        currentState: [width, height]
    } = useGraphListener(GraphSelectiveKeys.dimensions, listenerKey, dimensionArray);

    const simVersionRef = useRef(simVersion);

    const simulationRef: MutableRefObject<Simulation<
        DataNode<T>,
        DataLink<T>
    > | null> = useRef(null);

    const getForces = useCallback((
        nodes: DataNode<T>[],
        links: DataLink<T>[]
        ) =>
        createForces(
            forceAttributes,
            width,
            height,
            links,
            nodes
        )
    , [forceAttributes, width, height]);

    useEffect(() => {
        const simulationRefCurrent = simulationRef.current;
        const nodesMutable = nodesRef.current;
        const linksMutable = linksRef.current;

        if (!simulationRefCurrent) {
            if (isMounted && isReady) {
                const forces = getForces(nodesMutable, linksMutable);
                simVersionRef.current = simVersion;
                simulationRef.current = beginSim(ticked, nodesMutable, forces);
                dispatchWithoutListen(simulationRef)
            }
        } else {
            if (simVersionRef.current !== simVersion) {
                simulationRefCurrent?.nodes(nodesMutable);
                const force = simulationRefCurrent?.force('link');
                if (force) {
                    const forceLink = force as d3.ForceLink<DataNode<T>, DataLink<T>>;
                    forceLink.links(linksMutable);
                }
                simVersionRef.current = simVersion
                simulationRefCurrent?.restart()
                simulationRefCurrent.on('tick', ticked)
            } else {
                simulationRefCurrent.on('tick', ticked);
            }
            updateValues(simulationRefCurrent!, forceAttributes);
        }


        return () => {
            if (
                !isMounted &&
                simulationRefCurrent
            ) simulationRefCurrent.stop();
        };
    }, [
        dispatchWithoutListen,
        isMounted,
        simVersion,
        forceAttributes,
        nodesRef,
        linksRef,
        width,
        height,
        ticked,
        isReady,
        getForces
    ]);



}

