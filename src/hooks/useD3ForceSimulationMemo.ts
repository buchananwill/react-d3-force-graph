import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import * as d3 from "d3";
import { Simulation } from "d3";

import {
  DataLink,
  DataNode,
  ForceOptions,
  Forces,
  HasNumberId,
} from "../types";
import { useForceAttributeListenerGroup } from "./useForceAttributeListeners";
import { useGraphListener } from "./useGraphSelectiveContext";

import { defaultDimensionArray, GraphSelectiveContextKeys } from "../literals";

import { useGraphRefs } from "./useGraphRefs";
import { createForces } from "../functions/createForces";
import { beginSim } from "../functions/beginSim";
import { updateForces } from "../functions/updateForces";
import { ObjectPlaceholder } from "selective-context";

const listenerKey = `force-sim`;

export function useD3ForceSimulationMemo<T extends HasNumberId>(params?: {
  forceFunctions: Forces;
}) {
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
    (nodes: DataNode<T>[], links: DataLink<T>[]) => {
      const forceOverrides = params ? params.forceFunctions : ObjectPlaceholder;
      return createForces(
        getValue,
        width,
        height,
        links,
        nodes,
        forceOptions,
        forceOverrides,
      );
    },
    [width, height, forceOptions],
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
        // 11-11-24 I remember that the reason for this is that the link force must be re-initialized when the topology changes.
        // TODO Find a declarative way to express this dependency and/or re-initialized all/relevant forces when the topology changes.
        for (const forceOptionsKey in forceOptions) {
          const force = simulationRefCurrent?.force(forceOptionsKey);
          if (force && "links" in force && typeof force.links === "function") {
            force.links(linksMutable);
            // const forceLink = force as d3.ForceLink<DataNode<T>, DataLink<T>>;
            // forceLink.links(linksMutable);
          }
        }
        simVersionRef.current = simVersion;
      }
      updateForces(simulationRefCurrent, getValue, valueChanged, updatePrev);
    }

    return [simulationRef];
  }, [
    getValue,
    valueChanged,
    updatePrev,
    simulationRef,
    isMounted,
    simVersion,
    nodesRef,
    linksRef,
    isReady,
    getForces,
  ]);
}
