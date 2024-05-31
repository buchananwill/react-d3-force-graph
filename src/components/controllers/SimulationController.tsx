import { MutableRefObject, useRef } from "react";
import { Simulation } from "d3";
import { useGraphController } from "../../hooks";
import { GraphSelectiveContextKeys } from "../../literals";

export default function SimulationController() {
  const simulationRef: MutableRefObject<Simulation<never, never> | null> =
    useRef(null);

  useGraphController(
    GraphSelectiveContextKeys.sim,
    simulationRef,
    "controller",
  );

  return null;
}
