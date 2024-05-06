import {NodeComponent} from '../nodes/node-component';
import React, {useMemo} from 'react';
import {DataNode, HasNumberId} from "@/graph-tools/types/types";


export function useBasicNodeElements<T extends HasNumberId>(
    nodes: DataNode<T>[]
) {

    return useMemo(() => nodes.map((d, index) => (
        <NodeComponent
            key={`node-${d.id}`}
            enableRunnable={true}
            nodeIndex={index}
            nodeId={d.id}
        />
    )), [nodes]);
}
