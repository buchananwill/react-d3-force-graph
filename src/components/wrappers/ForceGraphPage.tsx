"use client";
import React from "react";

import GraphContextProvider from "./GraphContextProvider";
import { NodeContextProvider } from "./NodeContextProvider";
import { LinkContextProvider } from "./LinkContextProvider";

import MountedTracker from "../controllers/MountedTracker";
import { ShowForceAdjustmentsController } from "../controllers/ShowForceAdjustmentsController";
import { ShowNodeEditingController } from "../controllers/ShowNodeEditingController";
import { HasNumberId } from "../../types";
import { NodeLinkRefContextProvider } from "./NodeLinkRefContextProvider";
import GraphForceAttributes from "../controllers/GraphForceAttributes";
import GraphEditController from "../controllers/GraphEditController";
import { SliderVisibilityController } from "../controllers/SliderVisibilityController";
import { ForceGraphPageAllProps } from "../../types";
import SimulationController from "../controllers/SimulationController";
import { ControllerComponent } from "selective-context";
import { GraphSelectiveContextKeys } from "../../literals";
import NodeDetailsModalController from "../controllers/NodeDetailsModalController";

export function ForceGraphPage<T extends HasNumberId>({
  dataNodes,
  dataLinks,
  graphName,
  options,
  children,
}: ForceGraphPageAllProps<T>) {
  return (
    <GraphContextProvider uniqueGraphName={graphName}>
      <NodeContextProvider nodes={dataNodes}>
        <LinkContextProvider links={dataLinks}>
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
              forces={options?.forces}
              normalizationCoefficients={options?.normalizationCoefficients}
            />

            {children}
          </NodeLinkRefContextProvider>
        </LinkContextProvider>
      </NodeContextProvider>
    </GraphContextProvider>
  );
}
