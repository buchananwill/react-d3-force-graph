import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import * as d3 from "d3";
import { Simulation } from "d3";

import { DataLink, DataNode, ForceOptions, HasNumberId } from "../types";
import { useForceAttributeListenerGroup } from "./useForceAttributeListeners";
import { useGraphListener } from "./useGraphSelectiveContext";

import { GraphSelectiveContextKeys } from "../literals";

import { useGraphRefs } from "./useGraphRefs";
import { createForces } from "../functions/createForces";
import { beginSim } from "../functions/beginSim";
import { updateForces } from "../functions/updateForces";
import { ObjectPlaceholder } from "selective-context";

const listenerKey = `force-sim`;

export const defaultDimensionArray = [1800, 1200];

export function useD3ForceSimulationMemo<T extends HasNumberId>() {
  const { linkListRef: linksRef, nodeListRef: nodesRef } = useGraphRefs<T>();
  const { getValue, valueChanged, updatePrev } =
    useForceAttributeListenerGroup();

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
  const { currentState: forceOptions } = useGraphListener<ForceOptions>(
    GraphSelectiveContextKeys.forceOptions,
    listenerKey,
    ObjectPlaceholder as ForceOptions,
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
    Simulation<DataNode<T>, DataLink<T>>
  > | null>(GraphSelectiveContextKeys.sim, listenerKey, null);

  const getForces = useCallback(
    (nodes: DataNode<T>[], links: DataLink<T>[]) =>
      createForces(getValue, width, height, links, nodes, forceOptions),
    [width, height],
  );

  return useMemo(() => {
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
      updateForces(simulationRefCurrent, getValue, valueChanged, updatePrev);
    }

    return [simulationRef];
  }, [
    simulationRef,
    isMounted,
    simVersion,
    nodesRef,
    linksRef,
    isReady,
    getForces,
  ]);
}
