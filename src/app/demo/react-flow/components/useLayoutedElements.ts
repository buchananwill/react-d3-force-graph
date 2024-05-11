import {useReactFlow, useStore} from "reactflow";
import {MutableRefObject, useMemo, useRef} from "react";
import {forceLink, Simulation} from "d3";
import {useDirectSimRefEditsDispatch} from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {DataNode, FlowEdge, FlowNode} from "@/graph-tools/types/types";
import {useGlobalDispatch} from "selective-context";
import {useD3ForceSimulationMemo} from "@/graph-tools/hooks/useD3ForceSimulationMemo";
import {useD3ForceSimulationEffect} from "@/graph-tools/hooks/useD3ForceSimulationEffect";


export function useLayoutedElements(): [boolean, (() => void) | undefined, (() => boolean) | undefined] {
    const {getNodes, setNodes, getEdges, fitView} = useReactFlow();
    const {dispatchWithoutListen} = useGlobalDispatch<boolean>('running');
    const initialised = useStore((store) =>
        [...store.nodeInternals.values()].every((node) => node.width && node.height)
    );

    useD3ForceSimulationMemo()

    const {nodeListRef, linkListRef, incrementSimVersion} = useDirectSimRefEditsDispatch();
    const {currentState: simRef} = useGraphListener<MutableRefObject<Simulation<any, any>> | undefined>(GraphSelectiveKeys.sim, 'layout-flow-with-forces', undefined);

    return useMemo(() => {
        let nodes = (getNodes().map((node) => ({...node, x: node.position.x, y: node.position.y})) as FlowNode[]);
        let edges = (getEdges().map((edge) => edge) as FlowEdge[]);
        let running = false;
        let simulation: Simulation<any, any>;

        if (!initialised || nodes.length === 0 || !nodeListRef || !linkListRef || !simRef) {
            return [false, undefined, undefined]
        }

        // If React Flow hasn't initialised our nodes with a width and height yet, or
        // if there are no nodes in the flow, then we can't run the simulation!
            nodeListRef.current = nodes
            linkListRef.current = edges


            // This is the logic to set the nodes for the simulation.
            simRef.current.nodes(nodes).force(
                'link',
                forceLink(edges)
                    .id((d) => (d as DataNode<any>).id)
            );


        // The tick function is called every animation frame while the simulation is
        // running and progresses the simulation one step forward each time.
        const tick = () => {
            simulation = simRef.current
            const scopedNodes = nodeListRef.current;
            getNodes().forEach((node, i) => {
                const dragging = Boolean(document.querySelector(`[data-id="${node.id}"].dragging`));
                // Setting the fx/fy properties of a node tells the simulation to "fix"
                // the node at that position and ignore any forces that would normally
                // cause it to move.
                const scopedNode = scopedNodes[i];
                if (dragging) {
                    scopedNode.fx = node.position.x;
                    scopedNode.fy = node.position.y;
                } else {
                    scopedNode.fx = null
                    scopedNode.fy = null
                }
            });

            simulation.tick();
            setNodes(scopedNodes.map((node) => ({...node, position: {x: node.x, y: node.y}} as FlowNode)));

            window.requestAnimationFrame(() => {
                // Give React and React Flow a chance to update and render the new node
                // positions before we fit the viewport to the new layout.
                fitView();

                // If the simulation hasn't been stopped, schedule another tick.
                if (running) tick();
            });
        };

        const toggle = () => {
            const scopedNodes = nodeListRef.current;
            running = !running;
            if (running) {
                getNodes().forEach((node, index) => {
                    const scopedNode = scopedNodes[index];
                    scopedNode.x = node.position.x;
                    scopedNode.y = node.position.y;
                })
            }
            running && window.requestAnimationFrame(tick);
            dispatchWithoutListen(running)
        };

        const isRunning = () => running;

        return [true, toggle, isRunning];
    }, [simRef, initialised, fitView, getEdges, getNodes, setNodes, linkListRef, nodeListRef, dispatchWithoutListen]);
}