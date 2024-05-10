import {Edge, Node as FlowNode} from "reactflow";
import {useReactFlow, useStore} from "reactflow";
import {useMemo, useRef} from "react";
import {forceLink, forceManyBody, forceSimulation, forceX, forceY} from "d3";
import {useDirectSimRefEditsDispatch} from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";

const simulation = forceSimulation()
    .force('charge', forceManyBody().strength(-1000))
    .force('x', forceX().x(0).strength(0.05))
    .force('y', forceY().y(0).strength(0.05))
    .alphaTarget(0.05)
    .stop();

;

export function useLayoutedElements() {
    const {getNodes, setNodes, getEdges, fitView} = useReactFlow();
    const initialised = useStore((store) =>
        [...store.nodeInternals.values()].every((node) => node.width && node.height)
    );

    const {nodeListRef, linkListRef, incrementSimVersion} = useDirectSimRefEditsDispatch();
    const {currentState} = useGraphListener(GraphSelectiveKeys.sim, 'layout-flow-with-forces', undefined);

    const nodesRef = useRef<FlowNode[]>([]);
    const linksRef = useRef<Edge[]>([]);

    return useMemo(() => {
        let nodes = getNodes().map((node) => ({...node, x: node.position.x, y: node.position.y}));
        let edges = getEdges().map((edge) => edge);
        let running = false;
        nodesRef.current = nodes
        linksRef.current = edges
        console.log(simulation)
        let simWeUse = simulation
        if (nodeListRef && linkListRef) {
            nodeListRef.current = nodes
            linkListRef.current = edges
        }


        // If React Flow hasn't initialised our nodes with a width and height yet, or
        // if there are no nodes in the flow, then we can't run the simulation!
        if (!initialised || nodes.length === 0) return [false, {}];

        if (currentState.current) {
            // This is the logic to set the nodes for the simulation.
            console.log('Setting nodes and Links')
            currentState.current.nodes(nodes).force(
                'link',
                forceLink(edges)
                    .id((d) => d.id)
            );
        }

        // The tick function is called every animation frame while the simulation is
        // running and progresses the simulation one step forward each time.
        const tick = () => {
            if (currentState.current) simWeUse = currentState.current
            const scopedNodes = nodesRef.current;
            const storeNodes = getNodes()
            storeNodes.forEach((node, i) => {
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

            simWeUse.tick();
            setNodes(scopedNodes.map((node) => ({...node, position: {x: node.x, y: node.y}})));

            window.requestAnimationFrame(() => {
                // Give React and React Flow a chance to update and render the new node
                // positions before we fit the viewport to the new layout.
                fitView();

                // If the simulation hasn't be stopped, schedule another tick.
                if (running) tick();
            });
        };

        const toggle = () => {
            const scopedNodes = nodesRef.current;
            running = !running;
            if (running) {
                getNodes().forEach((node, index) => {
                    const scopedNode = scopedNodes[index];
                    scopedNode.x = node.position.x;
                    scopedNode.y = node.position.y;
                })
            }
            running && window.requestAnimationFrame(tick);
        };

        const isRunning = () => running;

        return [true, {toggle, isRunning}];
    }, [currentState, initialised, fitView, getEdges, getNodes, setNodes, linkListRef, nodeListRef]);
}