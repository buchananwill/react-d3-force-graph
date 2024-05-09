'use client';
import React, {ReactNode, useContext, useEffect, useMemo} from 'react';
import {useNodeInteractionContext} from './NodeInteractionContext';
import {NodeRefContext} from './genericNodeContextCreator';
import {useForceGraphDndElement} from '../force-graph-dnd/useForceGraphDndElement';
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {NodeComponentContext} from "@/graph-tools/nodes/nodeComponentContextCreator";
import {DataNode} from "@/graph-tools/types/types";

export function NodeComponent({
  gProps,
  enableRunnable,
  nodeIndex,
  children,
  nodeId
}: {
  gProps?: React.SVGProps<SVGGElement>;
  nodeIndex: number;
  enableRunnable?: boolean;
  children?: ReactNode;
  nodeId: number;
}) {
  const { dispatch } = useNodeInteractionContext();
  const {component: Component} = useContext(NodeComponentContext);
  const nodeDragKey = `node-${nodeId}`;

  const {currentState} = useGraphListener('node-positions-key', nodeDragKey, 0);


  const { mouseDown, mouseUp, doDrag, draggablePosition } =
    useForceGraphDndElement({
      draggingNodeIndex: nodeIndex,
      draggingNodeKey: nodeDragKey
    });
  let updatedNodeData: DataNode<any> | undefined;
  const nodesRef = useContext(NodeRefContext);
  if (nodesRef)
    updatedNodeData = nodesRef?.current[nodeIndex];

  useEffect(() => {
    if (doDrag && updatedNodeData) {
      updatedNodeData.fx = draggablePosition.x
      updatedNodeData.fy = draggablePosition.y
    } else if (updatedNodeData) {
      delete updatedNodeData.fx
      delete updatedNodeData.fy
    }
  }, [doDrag, draggablePosition])

  if (nodesRef?.current === undefined || nodeIndex > nodesRef.current.length || updatedNodeData === undefined)
    return null;


  const { x, y, distanceFromRoot } = updatedNodeData; // Only x and y are necessarily relevant

  const handleClick = enableRunnable
    ? () => {
        dispatch({ type: 'toggleSelect', payload: updatedNodeData.id });
      }
    : () => {};

  const finalX = x || 0;
  const finalY = y || 0;


  return (
    <g
        transform={`translate(${finalX}, ${finalY})`}
        onMouseEnter={() =>
            dispatch({type: 'setHover', payload: updatedNodeData.id})
        }
        onMouseLeave={() => dispatch({type: 'setHover', payload: null})}
        onClick={handleClick}
        {...gProps}
        className={'select-none cursor-pointer'}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
    >
      <Component node={updatedNodeData}/>

      {children && children}
    </g>
  );
}
