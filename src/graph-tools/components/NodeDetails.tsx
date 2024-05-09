import React, {FC, useContext, useMemo} from 'react';

import { NodePayload } from '../ForceGraphPage';


import {HasNumberId, NodeDetailsUiComponentProps} from "@/graph-tools/types/types";
import {NodeDetailWrapper} from "@/app/demo/components/NodeDetailWrapper";
import {NodeDetailsComponentContext} from "@/graph-tools/contexts/details-component/nodeDetailsComponentContextCreator";
import {useGraphRefs, useNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";

const listenerKey = 'node-details';
export default function NodeDetails<T extends HasNumberId>() {
  const {nodeListRef: nodes} = useGraphRefs();
  const {labelAccessor} = useContext(NodeDetailsComponentContext);
  useGraphListener(GraphSelectiveKeys.version, listenerKey, 0)

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
