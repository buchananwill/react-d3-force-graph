"use client";
import React, { PropsWithChildren } from "react";
import ReactFlow, { Background, BackgroundVariant } from "reactflow";
import EdgeWithDelete from "@/react-flow/components/edges/EdgeWithDelete";
import OrganizationNode from "@/app/demo/components/organization/OrganizationNode";
import { useLayoutFlowWithForces } from "@/react-flow/hooks/useLayoutFlowWithForces";
import FlowOverlay from "@/react-flow/components/generic/FlowOverlay";
import { useModalContent } from "@/graph-tools/components/controllers/DefineModalContent";
import OrganizationDetailsContent from "@/app/demo/components/organization/OrganizationDetailsContent";
import { NodeModalContentComponent } from "@/graph-tools/types/util";

// 1. Define the node types and their components
const nodeTypes = {
  organization: OrganizationNode,
};

// 2. Define the Edge types and their components
const edgeTypes = {
  default: EdgeWithDelete,
};

// 3. Define the content for the Node Details Modal
const memoizedContentComponent: NodeModalContentComponent = {
  memoizedFunction: OrganizationDetailsContent,
};

export function ExampleLayoutFlowWithForces({ children }: PropsWithChildren) {
  // 4. Call the hook to set up the layout with forces
  const { flowOverlayProps, reactFlowProps } = useLayoutFlowWithForces();

  // 5. Call the hook to define the modal content
  useModalContent(memoizedContentComponent);

  return (
    // 6. Pass the props to the ReactFlow component
    <ReactFlow
      {...reactFlowProps}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      {children}
      {/* 7. Add a background */}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      {/* 8. Pass the overlay props */}
      <FlowOverlay {...flowOverlayProps} />
    </ReactFlow>
  );
}
