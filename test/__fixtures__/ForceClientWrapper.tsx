"use client";
import { SelectiveContextManagerGlobal } from "selective-context";
import { ForceGraphPage, ForceGraphPageOptions } from "../../src";
import graphDto from "./graphData.json";
import {
  convertClosureDtoListToDataLinkList,
  convertDataNodeDtoListToDataNodeList,
} from "./adaptors";
import React, { PropsWithChildren } from "react";

export const nodes = convertDataNodeDtoListToDataNodeList(graphDto.nodes);
export const links = convertClosureDtoListToDataLinkList(graphDto.closureDtos);

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
