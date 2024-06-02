"use client";
import { SelectiveContextManagerGlobal } from "selective-context";
import { ForceGraphPage } from "../../src";
import graphDto from "./graphData.json";
import {
  convertClosureDtoListToDataLinkList,
  convertDataNodeDtoListToDataNodeList,
} from "./adaptors";
import React, { PropsWithChildren } from "react";

const nodes = convertDataNodeDtoListToDataNodeList(graphDto.nodes);
const links = convertClosureDtoListToDataLinkList(graphDto.closureDtos);

export default function ForceClientWrapper({ children }: PropsWithChildren) {
  return (
    <SelectiveContextManagerGlobal>
      <ForceGraphPage
        dataNodes={nodes}
        dataLinks={links}
        graphName={"test-graph"}
      >
        {children}
      </ForceGraphPage>
    </SelectiveContextManagerGlobal>
  );
}
