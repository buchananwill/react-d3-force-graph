import {Node, useReactFlow, useStore} from "reactflow";
import {MutableRefObject, useCallback, useMemo, useRef} from "react";
import {Simulation} from "d3";
import {useDirectSimRefEditsDispatch} from "@/graph-tools/hooks/useDirectSimRefEditsDispatch";
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {DataNode, FlowNode} from "@/graph-tools/types/types";
import {useGlobalController, useGlobalDispatch, useGlobalListener} from "selective-context";
import {useD3ForceSimulationMemo} from "@/graph-tools/hooks/useD3ForceSimulationMemo";


const listenerKey = 'react-flow-layout';

export const draggingNodeKey = 'dragging-node';

export function useLayoutedElements(): [boolean, (() => void) | undefined, (() => boolean) | undefined] {
    const {getNodes, setNodes, getEdges, fitView} = useReactFlow();
    const {dispatchWithoutListen} = useGlobalDispatch<boolean>('running');
    const initialised = useStore((store) =>
        [...store.nodeInternals.values()].every((node) => node.width && node.height)
    );
    // const draggingNodeRef = useRef<FlowNode | undefined>(undefined);



    useD3ForceSimulationMemo()
    const {currentState: draggingNode} = useGlobalController<MutableRefObject<FlowNode> | undefined>({contextKey: draggingNodeKey, listenerKey, initialValue: undefined});
    // draggingNodeRef.current = draggingNode
    // if (draggingNodeRef.current !== draggingNode) console.log(draggingNodeRef, draggingNode)


    const setDraggingPosition = useCallback((getNodes: () => Node[], scopedNodes:  DataNode<any>[]) => {

        for (const node of getNodes()) {
            const i = getNodes().indexOf(node);
            // const dragging = Boolean(document.querySelector(`[data-id="${node.id}"].dragging`));
            const dragging = draggingNode?.current?.id === node.id
            // Setting the fx/fy properties of a node tells the simulation to "fix"
            // the node at that position and ignore any forces that would normally
            // cause it to move.
            const scopedNode = scopedNodes[i];
            if (dragging && scopedNode) {
                console.log(scopedNodes)
                scopedNode.fx = node.position.x;
                scopedNode.fy = node.position.y;
            } else if (scopedNode) {
                scopedNode.fx = null
                scopedNode.fy = null
            }
        }
    } , [draggingNode])

    const {nodeListRef, linkListRef, incrementSimVersion} = useDirectSimRefEditsDispatch();
    const {currentState: simRef} = useGraphListener<MutableRefObject<Simulation<any, any>> | undefined>(GraphSelectiveKeys.sim, 'layout-flow-with-forces', undefined);

    return useMemo(() => {
        // // console.log('rendering memo')
        let nodes = (getNodes().map((node) => ({...node, x: node.position.x, y: node.position.y})) as FlowNode[]);
        // let edges = (getEdges().map((edge) => edge) as FlowEdge[]);
        let running = false;
        let simulation: Simulation<any, any>;

        // If React Flow hasn't initialised our nodes with a width and height yet, or
        // if there are no nodes in the flow, then we can't run the simulation!
        if (!initialised
            || nodes.length === 0
            || !nodeListRef || !linkListRef
            || !simRef
            || nodeListRef.current.length !== nodes.length // These arrays should match, because the top-level context should sync them.
        ) {
            return [false, undefined, undefined]
        }

        // Copy any internals to the nodeListRef so we don't lose those properties.
        for (let i = 0; i < nodes.length; i++) {
            Object.assign(nodeListRef.current[i], nodes[i])
        }

        // The tick function is called every animation frame while the simulation is
        // running and progresses the simulation one step forward each time.
        const tick = async () => {
            let nodeIndex = NaN
            simulation = simRef.current
            const scopedNodes = nodeListRef.current;
            // setDraggingPosition(getNodes, scopedNodes)
            let foundDrag = false
            for (let i = 0; i < getNodes().length; i++){
                const node = getNodes()[i];
                // const dragging = Boolean(document.querySelector(`[data-id="${node.id}"].dragging`));
                const dragging = draggingNode?.current?.id === node.id
                // Setting the fx/fy properties of a node tells the simulation to "fix"
                // the node at that position and ignore any forces that would normally
                // cause it to move.
                const scopedNode = scopedNodes[i];
                if (dragging) {
                    foundDrag = true
                    nodeIndex = i
                    scopedNode.fx = draggingNode?.current.position.x;
                    scopedNode.fy = draggingNode?.current.position.y;
                } else {
                   delete scopedNode.fx
                    delete scopedNode.fy
                }
            }

            if (!foundDrag) nodeIndex = NaN

            simulation.tick();
            if (!isNaN(nodeIndex)) console.log(scopedNodes[nodeIndex])
            setNodes(scopedNodes.map((node) => ({...node, position: {x: node.fx ?? node.x, y: node.fy ?? node.y}} as FlowNode)));

            window.requestAnimationFrame(async () => {
                // Give React and React Flow a chance to update and render the new node
                // positions before we fit the viewport to the new layout.
                fitView();

                // If the simulation hasn't been stopped, schedule another tick.
                if (running) await tick();
            });
        };

        const toggle = () => {
            // console.log('running in the toggle function:', running)
            const scopedNodes = nodeListRef.current;
            running = !running;
            if (running) {
                getNodes().forEach((node, index) => {
                    const scopedNode = scopedNodes[index];
                    scopedNode.x = node.position.x;
                    scopedNode.y = node.position.y;
                })
            window.requestAnimationFrame(tick);
            }
            dispatchWithoutListen(running)
        };

        const isRunning = () => running;

        return [true, toggle, isRunning];
    }, [
        draggingNode,
        simRef,
        initialised,
        fitView,
        getNodes,
        setNodes,
        linkListRef,
        nodeListRef,
        dispatchWithoutListen
    ]);
}