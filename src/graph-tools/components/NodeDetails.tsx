import React, {FC, useMemo} from 'react';

import { NodePayload } from '../ForceGraphPage';

import { NodeDetailsUiComponentProps } from '@/app/demo/graphs/work-task-types/work-task-type-dto-details';
import {HasNumberId} from "@/graph-tools/types/types";
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

  const noteDetails = useMemo(() =>
    nodeDetailElements.map((detailElement, index) => (
        <NodeDetailWrapper
            key={`${index}-${labels[index]}`}
            label={`${labels[index]}`}
            node={detailElement.node}
            detailsUiComponent={detailsUiComponent}
        />
    ))
  , [nodeDetailElements, detailsUiComponent]);

  return (
    <div>
      {...noteDetails}
    </div>
  );
}
