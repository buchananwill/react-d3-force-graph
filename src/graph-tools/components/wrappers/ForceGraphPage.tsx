"use client";
import React from "react";

import GraphContextProvider from "./GraphContextProvider";
import { NodeContextProvider } from "./NodeContextProvider";
import { LinkContextProvider } from "./LinkContextProvider";

import MountedTracker from "../controllers/MountedTracker";
import NodePositionsTracker from "../controllers/NodePositionsTracker";
import { ShowForceAdjustmentsController } from "../controllers/ShowForceAdjustmentsController";
import { ShowNodeEditingController } from "../controllers/ShowNodeEditingController";
import { HasNumberId } from "@/graph-tools/types/types";
import { NodeLinkRefContextProvider } from "@/graph-tools/components/wrappers/NodeLinkRefContextProvider";
import ForceSimEngine from "@/graph-tools/components/controllers/ForceSimEngine";
import GraphForceAttributes from "@/graph-tools/components/controllers/GraphForceAttributes";
import GraphEditController from "@/graph-tools/components/controllers/GraphEditController";
import { SliderVisibilityController } from "@/graph-tools/components/controllers/SliderVisibilityController";
import { ForceGraphPageAllProps } from "@/graph-tools/types/forceGraphPageProps";
import SimulationController from "@/graph-tools/components/controllers/SimulationController";
import { ControllerComponent } from "selective-context";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";

export default function ForceGraphPage<T extends HasNumberId>({
  dataGraph: graphDto,
  graphName,
  options,
  children,
}: ForceGraphPageAllProps<T>) {
  const { nodes, closureDtos } = graphDto;

  return (
    <GraphContextProvider uniqueGraphName={graphName}>
      <NodeContextProvider nodes={nodes}>
        <LinkContextProvider links={closureDtos}>
          <NodeLinkRefContextProvider>
            <ControllerComponent
              contextKey={GraphSelectiveContextKeys.running}
              initialValue={false}
            />
            <SimulationController />
            <SliderVisibilityController
              forceSlidersVisibleInitial={options?.forceSlidersVisibleInitial}
            />
            <GraphEditController />
            <MountedTracker />
            <ShowForceAdjustmentsController />
            <ShowNodeEditingController />
            <GraphForceAttributes
              forceAttributesInitial={options?.forceAttributesInitial}
            />
            {options?.useInternalSimEngine && <ForceSimEngine />}

            {children}
          </NodeLinkRefContextProvider>
        </LinkContextProvider>
      </NodeContextProvider>
    </GraphContextProvider>
  );
}
