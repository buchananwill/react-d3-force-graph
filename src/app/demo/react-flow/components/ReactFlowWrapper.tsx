'use client'
import React, {useCallback} from 'react';
import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    MiniMap,
    useEdgesState,
    useNodesState,
} from 'reactflow';

import 'reactflow/dist/style.css';
import graphDto from '@/app/demo/data/graphDto.json'
import {convertDataLinkListToEdgeList, convertDataNodeListToNodeList} from "@/app/demo/react-flow/utils/adaptors";

const initialNodes = convertDataNodeListToNodeList(graphDto.nodes)
const initialEdges = convertDataLinkListToEdgeList(graphDto.closureDtos)

function getLayoutedElements(nodes: Node[], edges: Edge[]) {
    return {nodes, edges}
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
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}