import React, {PropsWithChildren, useEffect} from "react";
import ReactFlow, {Panel, useEdgesState, useNodesState} from "reactflow";
import {useLayoutedElements} from "@/app/demo/react-flow/components/useLayoutedElements";
import {initialEdges, initialNodes} from "@/app/demo/react-flow/components/ReactFlowWrapper";
import {useDirectSimRefEditsDispatch} from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import {useGlobalController} from "selective-context";
import {useNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {useLinkContext} from "@/graph-tools/links/genericLinkContextCreator";
import {FlowEdge, FlowNode} from "@/graph-tools/types/types";

export function LayoutFlowWithForces({children}: PropsWithChildren) {
    const {currentState: running} = useGlobalController({contextKey: 'running', listenerKey: 'layout-controller', initialValue: false});

    const {nodes: initialNodes} = useNodeContext();
    const {links: initialEdges} = useLinkContext();

    const [nodes, setNodes, onNodesChange] = useNodesState((initialNodes as FlowNode[]));
    const [edges, setEdges, onEdgesChange] = useEdgesState((initialEdges as FlowEdge[]));
    const [initialised, toggle] = useLayoutedElements();

    useEffect(() => {
        console.log('setting nodes and links...')
        setNodes(initialNodes as FlowNode[])
        setEdges(initialEdges as FlowEdge[])
    }, [initialNodes, initialEdges, setEdges, setNodes])

    return (

        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >{children}

            <Panel position={'top-right'}>
                {(initialised && toggle) && (
                    <button onClick={toggle}>{running ? 'Stop' : 'Start'} force simulation</button>
                )}
            </Panel>
        </ReactFlow>
    );
}