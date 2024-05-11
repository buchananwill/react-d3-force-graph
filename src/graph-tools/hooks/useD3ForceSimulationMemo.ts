import {MutableRefObject, useCallback, useEffect, useMemo, useRef} from 'react';
import * as d3 from 'd3';
import {Simulation} from 'd3';

import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useForceAttributeListeners} from "@/graph-tools/hooks/ForceGraphAttributesDto";
import {GraphSelectiveKeys, useGraphController, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {beginSim} from "@/graph-tools/functions/beginSim";
import {updateForces} from "@/graph-tools/functions/updateForces";
import {createForces} from "@/graph-tools/functions/createForces";
import {useGraphRefs} from "@/graph-tools/nodes/genericNodeContextCreator";


const listenerKey = `force-sim`;

export const defaultDimensionArray = [1800, 1200];

// Todo: remove adding nodes and links as a responsibility of this hook.
//  It only needs to setup up the simulation and forces, making it available as context.
// Todo: remove automated ticking: can be triggered manually by the employing UI.
export function useD3ForceSimulationMemo<T extends HasNumberId>() {
    const {linkListRef: linksRef, nodeListRef: nodesRef} = useGraphRefs<T>();
    const forceAttributes = useForceAttributeListeners('sim');
    const {currentState: isMounted} = useGraphListener(GraphSelectiveKeys.mounted, listenerKey, false);
    const {currentState: isReady} = useGraphListener(GraphSelectiveKeys.ready, listenerKey, false);
    const {currentState: simVersion} = useGraphListener('version', listenerKey, 0);

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

    return useMemo(() => {
        console.log('running force sim memo')
        if (!linksRef || !nodesRef) return [];
        const simulationRefCurrent = simulationRef.current;
        const nodesMutable = nodesRef.current;
        const linksMutable = linksRef.current;

        if (!simulationRefCurrent) {
            if (isMounted && isReady) {
                const forces = getForces(nodesMutable, linksMutable);
                simVersionRef.current = simVersion;
                simulationRef.current = beginSim(nodesMutable, forces, undefined);
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
            }
            updateForces(simulationRefCurrent!, forceAttributes);
        }

        const cleanUp = () => {
            if (
                !isMounted &&
                simulationRefCurrent
            ) simulationRefCurrent.stop();
        };

        return [simulationRef]

    }, [
        isMounted,
        simVersion,
        forceAttributes,
        nodesRef,
        linksRef,
        isReady,
        getForces
    ]);



}

