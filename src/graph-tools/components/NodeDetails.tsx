import React, {FC, useMemo} from 'react';

import { NodePayload } from '../ForceGraphPage';


import {HasNumberId, NodeDetailsUiComponentProps} from "@/graph-tools/types/types";
import {NodeDetailWrapper} from "@/app/demo/components/NodeDetailWrapper";

export default function NodeDetails<T extends HasNumberId>({
  nodeDetailElements,
  labels,
  detailsUiComponent
}: {
  nodeDetailElements: NodePayload<T>[];
  labels: string[];
  detailsUiComponent?: FC<NodeDetailsUiComponentProps<T>>;
}) {

  // Todo: try without memo.
  // const noteDetails = useMemo(() =>
    const nodeDetails = nodeDetailElements.map((detailElement, index) => (
        <NodeDetailWrapper
            key={`${index}-${labels[index]}`}
            label={`${labels[index]}`}
            node={detailElement.node}
            detailsUiComponent={detailsUiComponent}
        />
    ))
  // , [nodeDetailElements, detailsUiComponent, labels]);

  return (
    <div>
      {...nodeDetails}
    </div>
  );
}
