import React, {PropsWithChildren} from "react";
import ReactFlow, {Panel, useEdgesState, useNodesState} from "reactflow";
import {useLayoutedElements} from "@/app/demo/react-flow/components/useLayoutedElements";
import {initialEdges, initialNodes} from "@/app/demo/react-flow/components/ReactFlowWrapper";
import {useDirectSimRefEditsDispatch} from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import {useGlobalController} from "selective-context";

export function LayoutFlowWithForces({children}: PropsWithChildren) {
    const {currentState: running} = useGlobalController({contextKey: 'running', listenerKey: 'layout-controller', initialValue: false});
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [initialised, toggle] = useLayoutedElements();

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