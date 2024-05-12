import {NodeComponent} from '../components/NodeComponent';
import React, {useMemo} from 'react';
import {DataNode, HasNumberId} from "@/graph-tools/types/types";


export function useNodeElements<T extends HasNumberId>(
    nodes: DataNode<T>[]
) {
    return useMemo(() => {
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
