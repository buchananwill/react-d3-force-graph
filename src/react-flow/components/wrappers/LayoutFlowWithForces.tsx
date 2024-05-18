import React, {
  type MouseEvent as ReactMouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import ReactFlow, {
  Connection,
  Node,
  Panel,
  useEdgesState,
  useNodesState,
} from "reactflow";
import {
  draggingNodeKey,
  useLayoutedElements,
} from "@/react-flow/hooks/useLayoutedElements";
import { useGlobalDispatch } from "selective-context";
import { useNodeContext } from "@/graph-tools/contexts/genericNodeContextCreator";
import { useLinkContext } from "@/graph-tools/contexts/genericLinkContextCreator";
import {
  FlowEdge,
  FlowNode,
  MemoizedFunction,
} from "@/graph-tools/types/types";
import { Button } from "@nextui-org/button";

import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { useGraphListener } from "@/graph-tools/hooks/useGraphSelectiveContext";
import EdgeWithDelete from "@/react-flow/components/edges/EdgeWithDelete";
import OrganizationNode from "@/app/demo/components/organization/OrganizationNode";
import { undefinedDeleteLinks } from "@/graph-tools/literals/undefinedFunctionErrors";

const nodeTypes = {
  organization: OrganizationNode,
};

const edgeTypes = {
  default: EdgeWithDelete,
};

const listenerKey = "layout-flow-with-forces";

export function LayoutFlowWithForces({ children }: PropsWithChildren) {
  const { currentState: running } = useGraphListener(
    GraphSelectiveContextKeys.running,
    listenerKey,
    false,
  );

  const { nodes: initialNodes } = useNodeContext();
  const { links: initialEdges } = useLinkContext();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as FlowNode[],
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges as FlowEdge[],
  );
  const [initialised, toggle] = useLayoutedElements();
  const draggingNodeRef = useRef<Node | undefined>(undefined);
  const { dispatchWithoutListen } = useGlobalDispatch(draggingNodeKey);
  const {
    currentState: { memoizedFunction },
  } = useGraphListener<MemoizedFunction<string[], void>>(
    GraphSelectiveContextKeys.addLinks,
    listenerKey,
    undefinedDeleteLinks,
  );

  const onConnect = useCallback(
    ({ source, target }: Connection) => {
      if (source && target) memoizedFunction([source, target]);
    },
    [memoizedFunction],
  );

  useEffect(() => {
    dispatchWithoutListen(draggingNodeRef);
  }, [draggingNodeRef, dispatchWithoutListen]);

  const handleDragStart = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef],
  );

  const handleDragStop = useCallback(() => {
    draggingNodeRef.current = undefined;
  }, [draggingNodeRef]);

  const handleDrag = useCallback(
    (_event: ReactMouseEvent, node: Node) => {
      draggingNodeRef.current = { ...node };
    },
    [draggingNodeRef],
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
      edgeTypes={edgeTypes}
      onConnect={onConnect}
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
