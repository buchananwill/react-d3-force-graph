import React, {useContext} from 'react';


import {HasNumberId} from "@/graph-tools/types/types";
import {NodeDetailWrapper} from "@/app/demo/components/NodeDetailWrapper";
import {
  NodeDetailsComponentContext
} from "@/app/demo/components/details-component-context/nodeDetailsComponentContextCreator";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {GraphSelectiveContextKeys} from "@/graph-tools/hooks/graphSelectiveContextKeys";

import {useGraphRefs} from "@/graph-tools/hooks/useGraphRefs";

const listenerKey = 'node-details';
export default function NodeDetails<T extends HasNumberId>() {
  const {nodeListRef: nodes} = useGraphRefs();
  const {labelAccessor} = useContext(NodeDetailsComponentContext);
  useGraphListener(GraphSelectiveContextKeys.version, listenerKey, 0)

  return (
    <div>
      {nodes && nodes.current.map((node, index) => (
          <NodeDetailWrapper
              key={`${node.id}:detail-wrapper`}
              label={labelAccessor(node)}
              node={node}
          />))}
    </div>
  );
}
