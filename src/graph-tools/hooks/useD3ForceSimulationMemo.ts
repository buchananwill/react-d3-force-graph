import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import * as d3 from "d3";
import { Simulation } from "d3";

import { DataLink, DataNode, HasNumberId } from "@/graph-tools/types/types";
import { useForceAttributeListeners } from "@/graph-tools/hooks/useForceAttributeListeners";
import { useGraphListener } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { beginSim } from "@/graph-tools/functions/beginSim";
import { createForces } from "@/graph-tools/functions/createForces";
import { updateForces } from "@/graph-tools/functions/updateForces";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";

import { useGraphRefs } from "@/graph-tools/hooks/useGraphRefs";

const listenerKey = `force-sim`;

export const defaultDimensionArray = [1800, 1200];

// Todo: remove adding nodes and links as a responsibility of this hook.
//  It only needs to setup up the simulation and forces, making it available as context.
// Todo: remove automated ticking: can be triggered manually by the employing UI.
export function useD3ForceSimulationMemo<T extends HasNumberId>() {
  const { linkListRef: linksRef, nodeListRef: nodesRef } = useGraphRefs<T>();
  const forceAttributes = useForceAttributeListeners(listenerKey);
  const { currentState: isMounted } = useGraphListener(
    GraphSelectiveContextKeys.mounted,
    listenerKey,
    false,
  );
  const { currentState: isReady } = useGraphListener(
    GraphSelectiveContextKeys.ready,
    listenerKey,
    false,
  );
  const { currentState: simVersion } = useGraphListener(
    "version",
    listenerKey,
    0,
  );

  const {
    currentState: [width, height],
  } = useGraphListener(
    GraphSelectiveContextKeys.dimensions,
    listenerKey,
    defaultDimensionArray,
  );

  const simVersionRef = useRef(simVersion);

  const { currentState: simulationRef } = useGraphListener<MutableRefObject<
    Simulation<any, any>
  > | null>(GraphSelectiveContextKeys.sim, listenerKey, null);

  const getForces = useCallback(
    (nodes: DataNode<T>[], links: DataLink<T>[]) =>
      createForces(forceAttributes, width, height, links, nodes),
    [forceAttributes, width, height],
  );

  return useMemo(() => {
    // console.log('running force sim memo')
    if (!linksRef || !nodesRef || simulationRef === null) return [];
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
        const force = simulationRefCurrent?.force("link");
        if (force) {
          const forceLink = force as d3.ForceLink<DataNode<T>, DataLink<T>>;
          forceLink.links(linksMutable);
        }
        simVersionRef.current = simVersion;
      }
      updateForces(simulationRefCurrent!, forceAttributes);
    }

    const cleanUp = () => {
      if (!isMounted && simulationRefCurrent) simulationRefCurrent.stop();
    };

    return [simulationRef];
  }, [
    simulationRef,
    isMounted,
    simVersion,
    forceAttributes,
    nodesRef,
    linksRef,
    isReady,
    getForces,
  ]);
}
