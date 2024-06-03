"use client";
import { SelectiveContextManagerGlobal } from "selective-context";

import graphDto from "./graphData.json";
import {
  convertClosureDtoListToDataLinkList,
  convertDataNodeDtoListToDataNodeList,
} from "./adaptors";
import React, { PropsWithChildren } from "react";
import { ForceGraphPageOptions } from "../../src/types/forceGraphPageProps";
import { ForceGraphPage } from "../../src";

export const nodes = convertDataNodeDtoListToDataNodeList(graphDto.nodes);
export const links = convertClosureDtoListToDataLinkList(graphDto.closureDtos);
export const nodesDto = graphDto.nodes;
export const linksDto = graphDto.closureDtos;

export default function ForceClientWrapper({
  children,
  options,
}: PropsWithChildren & { options: ForceGraphPageOptions }) {
  return (
    <SelectiveContextManagerGlobal>
      <ForceGraphPage
        dataNodes={nodes}
        dataLinks={links}
        graphName={"test-graph"}
        options={options}
      >
        {children}
      </ForceGraphPage>
    </SelectiveContextManagerGlobal>
  );
}
