'use client'

import {PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {ForcesContext} from "@/graph-tools/contexts/forces/forcesContextCreator";
import {DataLink, DataNode} from "@/graph-tools/types/types";
import {createForces} from "@/graph-tools/functions/createForces";
import {useForceAttributeListeners} from "@/graph-tools/hooks/ForceAttributesDto";
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {defaultDimensionArray} from "@/graph-tools/hooks/useD3ForceSimulationEffect";
import {NodeRefContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {LinkRefContext} from "@/graph-tools/links/genericLinkContextCreator";

const listenerKey = 'force-creator';

export default function ForcesContextProvider({children}: PropsWithChildren) {
    const nodesRef = useContext(NodeRefContext);
    const linksRef = useContext(LinkRefContext);
    const [forces, setForces] = useState({})
    const {currentState: ready} = useGraphListener(GraphSelectiveKeys.ready, listenerKey, false);

    useGraphListener(GraphSelectiveKeys.version, listenerKey, 0);
    const forceAttributes = useForceAttributeListeners(listenerKey);
    const {
        currentState: [width, height]
    } = useGraphListener(GraphSelectiveKeys.dimensions, listenerKey, defaultDimensionArray);
    const getForces = useCallback((
            nodes: DataNode<any>[],
            links: DataLink<any>[]
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
        const nodes = nodesRef?.current
        const links = linksRef?.current
        if (nodes !== undefined && links !== undefined && ready) {
            setForces(getForces(nodes, links))
        } else {

        }
    }, [nodesRef, linksRef, getForces, ready]);

    return <ForcesContext.Provider value={forces}>{children}</ForcesContext.Provider>
}