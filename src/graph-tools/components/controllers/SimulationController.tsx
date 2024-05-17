import { MutableRefObject, useRef } from "react";
import { Simulation } from "d3";
import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";

export default function SimulationController() {
  const simulationRef: MutableRefObject<Simulation<any, any> | null> =
    useRef(null);

  useGraphController(
    GraphSelectiveContextKeys.sim,
    simulationRef,
    "controller",
  );

  return null;
}
