"use client";
import React from "react";

import GraphContextProvider from "./GraphContextProvider";
import { NodeContextProvider } from "./NodeContextProvider";
import { LinkContextProvider } from "./LinkContextProvider";

import MountedTracker from "../controllers/MountedTracker";
import { ShowForceAdjustmentsController } from "../controllers/ShowForceAdjustmentsController";
import { ShowNodeEditingController } from "../controllers/ShowNodeEditingController";
import { HasNumberId } from "@/graph-tools/types/types";
import { NodeLinkRefContextProvider } from "@/graph-tools/components/wrappers/NodeLinkRefContextProvider";
import GraphForceAttributes from "@/graph-tools/components/controllers/GraphForceAttributes";
import GraphEditController from "@/graph-tools/components/controllers/GraphEditController";
import { SliderVisibilityController } from "@/graph-tools/components/controllers/SliderVisibilityController";
import { ForceGraphPageAllProps } from "@/graph-tools/types/forceGraphPageProps";
import SimulationController from "@/graph-tools/components/controllers/SimulationController";
import { ControllerComponent } from "selective-context";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import NodeDetailsModalController from "@/graph-tools/components/controllers/NodeDetailsModalController";

export default function ForceGraphPage<T extends HasNumberId>({
  flowNodes,
  edges,
  graphName,
  options,
  children,
}: ForceGraphPageAllProps<T>) {
  return (
    <GraphContextProvider uniqueGraphName={graphName}>
      <NodeContextProvider nodes={flowNodes}>
        <LinkContextProvider links={edges}>
          <NodeLinkRefContextProvider>
            <NodeDetailsModalController />
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

            {children}
          </NodeLinkRefContextProvider>
        </LinkContextProvider>
      </NodeContextProvider>
    </GraphContextProvider>
  );
}
