"use client";

import React, { useEffect, useMemo } from "react";

import { ShowForceAdjustmentsKey } from "./ShowForceAdjustmentsController";
import {
  useGraphController,
  useGraphListener,
} from "@/graph-tools/hooks/useGraphSelectiveContext";

import { PartialDeep } from "type-fest";
import { GraphSelectiveContextKeys } from "@/graph-tools/literals/graphSelectiveContextKeys";
import { ForceGraphPageOptionProps } from "@/graph-tools/types/forceGraphPageProps";
import { ForceAttributesInitial } from "@/graph-tools";
import { ForceAttributesDto } from "@/graph-tools/types/forceAttributes";
import { ControllerComponent } from "selective-context";
import { useGraphName } from "@/graph-tools/hooks/useGraphName";

const listenerKey = "graph-force-attributes";
export default function GraphForceAttributes({
  forceAttributesInitial,
}: PartialDeep<Pick<ForceGraphPageOptionProps, "forceAttributesInitial">>) {
  const uniqueGraphName = useGraphName();
  const { currentState, dispatch } = useGraphController(
    GraphSelectiveContextKeys.ready,
    false,
    listenerKey,
  );

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
