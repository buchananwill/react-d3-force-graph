'use client'
import React from 'react';
import {Background, BackgroundVariant, Controls, MiniMap, Panel, ReactFlowProvider,} from 'reactflow';

import 'reactflow/dist/style.css';
import graphDto from '@/app/demo/data/graphDto.json'
import {convertDataLinkListToEdgeList, convertDataNodeListToNodeList} from "@/app/demo/react-flow/utils/adaptors";
import {LayoutFlowWithForces} from "@/app/demo/react-flow/components/LayoutFlowWithForces";
import {Card, CardBody} from "@nextui-org/card";
import GraphForceSliders from "@/graph-tools/components/GraphForceSliders";

export const initialNodes = convertDataNodeListToNodeList(graphDto.nodes)
export const initialEdges = convertDataLinkListToEdgeList(graphDto.closureDtos)




export default function ReactFlowWrapper() {
    // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    //
    // const onConnect = useCallback(
    //     (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    //     [setEdges],
    // );

    return (
        <div style={{width: '100vw', height: '100vh'}}>
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
            {/*<ReactFlowProvider>*/}
            {/*<LayoutFlow*/}
            {/*>*/}
            {/*    <Controls />*/}
            {/*    <MiniMap />*/}
            {/*    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />*/}
            {/*</LayoutFlow>*/}
            {/*</ReactFlowProvider>*/}
            <ReactFlowProvider>
                <LayoutFlowWithForces
                >
                    <Controls/>
                    <MiniMap/>
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
                    <Panel position={'top-left'}>
                        <Card>
                            <CardBody>
                                <GraphForceSliders/>
                            </CardBody>
                        </Card>
                    </Panel>
                </LayoutFlowWithForces>
            </ReactFlowProvider>
        </div>
    );
}