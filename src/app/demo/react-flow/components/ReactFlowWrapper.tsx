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
  convertDataLinkListToEdgeList,
  convertDataNodeListToNodeList,
} from "@/app/demo/react-flow/utils/adaptors";
import { LayoutFlowWithForces } from "@/app/demo/react-flow/components/LayoutFlowWithForces";
import GraphForceSliders from "@/app/demo/components/GraphForceSliders";
import { Button } from "@nextui-org/button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNodeEditing } from "@/graph-tools/hooks/useNodeEditing";
import { cloneFunctionWrapper } from "@/app/demo/components/organization/OrganizationGraph";
import { useAddNodes } from "@/graph-tools/flow-node-editing/hooks/useAddNodes";
import { useEscapeToClose } from "@/app/demo/react-flow/components/nodes/useEscapeToClose";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useAddLinks } from "@/graph-tools/flow-node-editing/hooks/useAddLinks";
import { useDeleteLinks } from "@/graph-tools/flow-node-editing/hooks/useDeleteLinks";
import { useDeleteNodes } from "@/graph-tools/flow-node-editing/hooks/useDeleteNodes";
import { useEditNodeData } from "@/graph-tools/flow-node-editing/hooks/useEditNodeData";
import NodeDetailsModal from "@/app/demo/react-flow/components/nodes/NodeDetailsModal";

export const initialNodes = convertDataNodeListToNodeList(graphDto.nodes);
export const initialEdges = convertDataLinkListToEdgeList(graphDto.closureDtos);

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
                <Button
                  className={"w-56 relative"}
                  // variant={"light"}
                  // onPress={() => setShowSliders((show) => !show)}
                >
                  Forces{" "}
                  <ChevronLeftIcon
                    className={`p-1 absolute right-2 transition-transform ${showSliders ? "-rotate-90" : ""}`}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
              // className={`${showSliders ? "h-fit opacity-100" : "h-0 overflow-hidden p-0 scale-75"} transition-all`}
              >
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
