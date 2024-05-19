"use client";
import React, { PropsWithChildren } from "react";
import { ReactFlowProvider } from "reactflow";

import "reactflow/dist/style.css";
import { useNodeEditing } from "@/graph-tools/hooks/useNodeEditing";
import { cloneFunctionWrapper } from "@/app/demo/components/organization/organizationCallbacks";
import { useAddNodes } from "@/graph-tools/editing/hooks/useAddNodes";
import { useAddLinks } from "@/graph-tools/editing/hooks/useAddLinks";
import { useDeleteLinks } from "@/graph-tools/editing/hooks/useDeleteLinks";
import { useDeleteNodes } from "@/graph-tools/editing/hooks/useDeleteNodes";
import { useEditNodeData } from "@/graph-tools/editing/hooks/useEditNodeData";

export default function ReactFlowWrapper({ children }: PropsWithChildren) {
  useNodeEditing(cloneFunctionWrapper);
  useAddNodes();
  useAddLinks();
  useDeleteLinks();
  useDeleteNodes();
  useEditNodeData();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </div>
  );
}
