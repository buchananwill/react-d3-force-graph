"use client";
import React, { useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";
import graphDto from "@/app/demo/data/graphDto.json";
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList,
} from "@/react-flow/utils/adaptors";
import { LayoutFlowWithForces } from "@/react-flow/components/wrappers/LayoutFlowWithForces";
import GraphForceSliders from "@/react-flow/components/generic/GraphForceSliders";
import { Button } from "@nextui-org/button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNodeEditing } from "@/graph-tools/hooks/useNodeEditing";
import { cloneFunctionWrapper } from "@/app/demo/components/organization/organizationCallbacks";
import { useAddNodes } from "@/graph-tools/flow-node-editing/hooks/useAddNodes";
import { useEscapeToClose } from "@/react-flow/hooks/useEscapeToClose";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useAddLinks } from "@/graph-tools/flow-node-editing/hooks/useAddLinks";
import { useDeleteLinks } from "@/graph-tools/flow-node-editing/hooks/useDeleteLinks";
import { useDeleteNodes } from "@/graph-tools/flow-node-editing/hooks/useDeleteNodes";
import { useEditNodeData } from "@/graph-tools/flow-node-editing/hooks/useEditNodeData";
import NodeDetailsModal from "@/react-flow/components/generic/NodeDetailsModal";

export const initialNodes = convertDataNodeDtoListToFlowNodeList(
  graphDto.nodes,
);
export const initialEdges = convertClosureDtoListToEdgeList(
  graphDto.closureDtos,
);

export default function ReactFlowWrapper() {
  const [showSliders, setShowSliders] = useState(false);
  useNodeEditing(cloneFunctionWrapper);
  useAddNodes();
  useAddLinks();
  useDeleteLinks();
  useDeleteNodes();
  useEditNodeData();

  useEscapeToClose(showSliders, setShowSliders);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <LayoutFlowWithForces>
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Panel position={"top-left"}>
            <Popover
              classNames={{ base: "w-56" }}
              isOpen={showSliders}
              onOpenChange={setShowSliders}
              shouldCloseOnInteractOutside={() => false}
            >
              <PopoverTrigger className={"p-0"}>
                <Button className={"relative w-56"}>
                  Forces{" "}
                  <ChevronLeftIcon
                    className={`absolute right-2 p-1 transition-transform ${showSliders ? " -rotate-90 " : ""}`}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <GraphForceSliders />
              </PopoverContent>
            </Popover>
          </Panel>
          <NodeDetailsModal />
        </LayoutFlowWithForces>
      </ReactFlowProvider>
    </div>
  );
}
