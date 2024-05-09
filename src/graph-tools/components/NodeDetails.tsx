import React, {FC, useContext, useMemo} from 'react';

import { NodePayload } from '../ForceGraphPage';


import {HasNumberId, NodeDetailsUiComponentProps} from "@/graph-tools/types/types";
import {NodeDetailWrapper} from "@/app/demo/components/NodeDetailWrapper";
import {NodeDetailsComponentContext} from "@/graph-tools/contexts/details-component/nodeDetailsComponentContextCreator";
import {useNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";

export default function NodeDetails<T extends HasNumberId>() {
  const {nodes} = useNodeContext();
  const {labelAccessor} = useContext(NodeDetailsComponentContext);

  return (
    <div>
      {nodes.map((node, index) => (
          <NodeDetailWrapper
              key={`${node.id}:detail-wrapper`}
              label={labelAccessor(node)}
              node={node}
          />))}
    </div>
  );
}
