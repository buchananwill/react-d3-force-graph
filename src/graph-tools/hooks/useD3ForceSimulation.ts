import {MutableRefObject, useCallback, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {Simulation} from 'd3';

import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useForceAttributeListeners} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {
    GraphSelectiveKeys,
    useGraphController,
    useGraphDispatch,
    useGraphListener
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {beginSim} from "@/graph-tools/functions/beginSim";
import {updateForces} from "@/graph-tools/functions/updateForces";
import {createForces} from "@/graph-tools/functions/createForces";
import {useGraphRefs} from "@/graph-tools/nodes/genericNodeContextCreator";


const listenerKey = `force-sim`;

export const defaultDimensionArray = [1800, 1200];

export function useD3ForceSimulation<T extends HasNumberId>(
    ticked: () => void
) {
    const {linkListRef: linksRef, nodeListRef: nodesRef} = useGraphRefs<T>();
    const forceAttributes = useForceAttributeListeners('sim');
    const {currentState: isMounted} = useGraphListener(GraphSelectiveKeys.mounted, listenerKey, false);
    const {currentState: isReady} = useGraphListener(GraphSelectiveKeys.ready, listenerKey, false);
    const {currentState: simVersion} = useGraphListener('version', listenerKey, 0);
    // const {dispatchWithoutListen} = useGraphDispatch(GraphSelectiveKeys.sim);

    const {
        currentState: [width, height]
    } = useGraphListener(GraphSelectiveKeys.dimensions, listenerKey, defaultDimensionArray);

    const simVersionRef = useRef(simVersion);

    const simulationRef: MutableRefObject<Simulation<
        DataNode<T>,
        DataLink<T>
    > | null> = useRef(null);

    useGraphController(GraphSelectiveKeys.sim, listenerKey, simulationRef)
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
        if (!linksRef || !nodesRef) return;
        const simulationRefCurrent = simulationRef.current;
        const nodesMutable = nodesRef.current;
        const linksMutable = linksRef.current;

        if (!simulationRefCurrent) {
            if (isMounted && isReady) {
                const forces = getForces(nodesMutable, linksMutable);
                simVersionRef.current = simVersion;
                simulationRef.current = beginSim(ticked, nodesMutable, forces);
                // console.log('dispatching the simRef', simulationRef)
                // dispatchWithoutListen(simulationRef)
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
            updateForces(simulationRefCurrent!, forceAttributes);
        }
        console.log(simulationRefCurrent, nodesMutable)

        return () => {
            if (
                !isMounted &&
                simulationRefCurrent
            ) simulationRefCurrent.stop();
        };
    }, [
        // dispatchWithoutListen,
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

