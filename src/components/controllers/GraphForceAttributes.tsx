"use client";

import React, { useEffect, useMemo } from "react";

import { ShowForceAdjustmentsKey } from "./ShowForceAdjustmentsController";
import { useGraphController, useGraphListener } from "../../hooks";

import { PartialDeep } from "type-fest";
import { GraphSelectiveContextKeys } from "../../literals";
import { ForceGraphPageOptionProps } from "../../types";
import { ForceAttributesInitial } from "../../literals";
import { ForceAttributesDto } from "../../types";
import { ControllerComponent } from "selective-context";
import { useGraphName } from "../../hooks";

const listenerKey = "graph-force-attributes";
export default function GraphForceAttributes({
  forceAttributesInitial,
  forces,
}: PartialDeep<
  Pick<ForceGraphPageOptionProps, "forceAttributesInitial" | "forces">
>) {
  const uniqueGraphName = useGraphName();
  const { currentState, dispatch } = useGraphController(
    GraphSelectiveContextKeys.ready,
    false,
    listenerKey,
  );

  useGraphController(GraphSelectiveContextKeys.forceOptions, forces);

  useGraphListener(ShowForceAdjustmentsKey, listenerKey, false);

  useEffect(() => {
    if (!currentState) {
      dispatch(true);
    }
  }, [dispatch, currentState]);

  const controllers = useMemo(
    () =>
      Object.entries(ForceAttributesInitial).map((entry) => {
        if (entry[0] === "id") {
          return null;
        }

        const stringKey = `${uniqueGraphName}:${entry[0]}`;
        const entryKey = entry[0] as keyof ForceAttributesDto;
        const initial =
          forceAttributesInitial?.[entryKey] ??
          ForceAttributesInitial[entryKey];

        return (
          <ControllerComponent
            key={stringKey}
            contextKey={stringKey}
            listenerKey={stringKey}
            initialValue={initial}
          />
        );
      }),
    [uniqueGraphName, forceAttributesInitial],
  );

  return <>{...controllers}</>;
}
