"use client";
import React, { PropsWithChildren } from "react";
import { useSyncRefVersionToNodeAndLinkContext } from "../../hooks";
import { NodeRefContext } from "../../contexts/nodeRefContextCreator";
import { LinkRefContext } from "../../contexts/linkRefContextCreator";

export function NodeLinkRefContextProvider({ children }: PropsWithChildren) {
  const { nodesRef, linksRef } = useSyncRefVersionToNodeAndLinkContext();

  return (
    <NodeRefContext.Provider value={nodesRef}>
      <LinkRefContext.Provider value={linksRef}>
        {children}
      </LinkRefContext.Provider>
    </NodeRefContext.Provider>
  );
}
