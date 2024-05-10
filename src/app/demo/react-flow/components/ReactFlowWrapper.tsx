'use client'
import React, {PropsWithChildren, useCallback} from 'react';
import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    Node as FlowNode,
    MiniMap,
    useEdgesState,
    useNodesState, useReactFlow, ReactFlowProvider,
} from 'reactflow';

import 'reactflow/dist/style.css';
import graphDto from '@/app/demo/data/graphDto.json'
import {convertDataLinkListToEdgeList, convertDataNodeListToNodeList} from "@/app/demo/react-flow/utils/adaptors";
import {forceManyBody, forceSimulation, forceX, forceY} from "d3";

const initialNodes = convertDataNodeListToNodeList(graphDto.nodes)
const initialEdges = convertDataLinkListToEdgeList(graphDto.closureDtos)

const simulation = forceSimulation()
    .force('charge', forceManyBody().strength(-1000))
    .force('x', forceX().x(0).strength(0.05))
    .force('y', forceY().y(0).strength(0.05))
    .alphaTarget(0.05)
    .stop();

function getLayoutedElements(nodes: FlowNode[], edges: Edge[]) {
    return {nodes, edges}
}

function  LayoutFlow({children}:PropsWithChildren) {
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


export default function ReactFlowWrapper() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {/*<ReactFlow*/}
            {/*    nodes={nodes}*/}
            {/*    edges={edges}*/}
            {/*    onNodesChange={onNodesChange}*/}
            {/*    onEdgesChange={onEdgesChange}*/}
            {/*    onConnect={onConnect}*/}
            {/*>*/}
            {/*    <Controls />*/}
            {/*    <MiniMap />*/}
            {/*    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />*/}
            {/*</ReactFlow>*/}
            <ReactFlowProvider>
            <LayoutFlow
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </LayoutFlow>
            </ReactFlowProvider>
        </div>
    );
}