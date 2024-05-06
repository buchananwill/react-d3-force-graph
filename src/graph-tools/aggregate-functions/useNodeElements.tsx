import {NodeComponent} from '../nodes/NodeComponent';
import React, {useMemo} from 'react';
import {DataNode, HasNumberId} from "@/graph-tools/types/types";


export function useBasicNodeElements<T extends HasNumberId>(
    nodes: DataNode<T>[]
) {

    return useMemo(() => {
        console.log('render node components');
        return nodes.map((d, index) => (
            <NodeComponent
                key={`node-${d.id}`}
                enableRunnable={true}
                nodeIndex={index}
                nodeId={d.id}
            />
        ))
    }, [nodes]);
}
