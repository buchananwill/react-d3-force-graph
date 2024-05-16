import React, {
  type MouseEvent as ReactMouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import ReactFlow, {
  Node,
  Panel,
  useEdgesState,
  useNodesState,
} from "reactflow";
import {
  draggingNodeKey,
  useLayoutedElements,
} from "@/app/demo/react-flow/components/useLayoutedElements";
import { useGlobalController, useGlobalDispatch } from "selective-context";
import { useNodeContext } from "@/graph-tools/contexts/genericNodeContextCreator";
import { useLinkContext } from "@/graph-tools/contexts/genericLinkContextCreator";
import { FlowEdge, FlowNode } from "@/graph-tools/types/types";
import { Button } from "@nextui-org/button";
import OrganizationNode from "./nodes/OrganizationNode";

const nodeTypes = {
  organization: OrganizationNode,
};

export function LayoutFlowWithForces({ children }: PropsWithChildren) {
  const { currentState: running } = useGlobalController({
    contextKey: "running",
    listenerKey: "layout-controller",
    initialValue: false,
  });

  const { nodes: initialNodes } = useNodeContext();
  const { links: initialEdges } = useLinkContext();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as FlowNode[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges as FlowEdge[]
  );
  const [initialised, toggle] = useLayoutedElements();
  const draggingNodeRef = useRef<Node | undefined>(undefined);
  const { dispatchWithoutListen } = useGlobalDispatch(draggingNodeKey);

  useEffect(() => {
    dispatchWithoutListen(draggingNodeRef);
  }, [draggingNodeRef, dispatchWithoutListen]);

  const handleDragStart = useCallback(
    (event: ReactMouseEvent, node: Node, nodes: Node[]) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef]
  );

  const handleDragStop = useCallback(
    (event: ReactMouseEvent, node: Node, nodes: Node[]) => {
      draggingNodeRef.current = undefined;
    },
    [draggingNodeRef]
  );

  const handleDrag = useCallback(
    (event: ReactMouseEvent, node: Node, nodes: Node[]) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef]
  );

  useEffect(() => {
    setNodes(initialNodes as FlowNode[]);
    setEdges(initialEdges as FlowEdge[]);
  }, [initialNodes, initialEdges, setEdges, setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      onNodeDragStart={handleDragStart}
      onNodeDrag={handleDrag}
      onNodeDragStop={handleDragStop}
      nodeTypes={nodeTypes}
    >
      {children}
      <Panel position={"top-right"}>
        {initialised && toggle && (
          <Button
            onPress={toggle}
            color={running ? "danger" : "success"}
            className={running ? "animate-pulse" : ""}
          >
            {running ? "Stop" : "Start"} force simulation
          </Button>
        )}
      </Panel>
    </ReactFlow>
  );
}
