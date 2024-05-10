import {Node as FlowNode} from "reactflow";
import ReactFlow, {Edge, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import React, {PropsWithChildren, useCallback} from "react";
import {initialEdges, initialNodes} from "@/app/demo/react-flow/components/ReactFlowWrapper";

function getLayoutedElements(nodes: FlowNode[], edges: Edge[]) {
    return {nodes, edges}
}

function LayoutFlow({children}: PropsWithChildren) {
    const {fitView} = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onLayout = useCallback(() => {
        const layouted = getLayoutedElements(nodes, edges);

        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);

        window.requestAnimationFrame(() => {
            fitView();
        });
    }, [nodes, edges, fitView, setEdges, setNodes]);
    return (

        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >{children}</ReactFlow>
    );
}