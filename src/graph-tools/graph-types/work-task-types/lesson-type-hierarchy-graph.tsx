'use client';

import { WorkTaskTypeDto } from '../../../api/dtos/WorkTaskTypeDtoSchema';
import { DataNode } from '../../../api/zod-mods';
import { NodeLinkRefWrapper } from '../../graph/node-link-ref-wrapper';
import { useNodeAndLinkRefs } from '../../graph/useNodeAndLinkRefs';
import { useNodeEditing } from '../../editing/functions/use-node-editing';
import { CloneFunctionWrapper } from './clone-work-task-type';
import { NodePayload } from '../../ForceGraphPage';
import React from 'react';
import WorkTaskTypeDtoDetails from './work-task-type-dto-details';
import NodeDetails from '../../components/node-details';
import { putGraph } from '../../../api/READ-ONLY-generated-actions/WorkTaskType';
import { getGraphUpdaterWithNameDeDuplication } from '../organization/get-graph-updater-with-name-de-duplication';

const graphUpdater = getGraphUpdaterWithNameDeDuplication(putGraph);

const ListenerKey = `lessonTypeHierarchyGraph`;

export function LessonTypeHierarchyGraph() {
  const { nodes, nodesRef, linksRef } = useNodeAndLinkRefs<WorkTaskTypeDto>();

  const lessonTypeList: string[] = [];

  const unsavedNodeChangesProps = useNodeEditing(
    nodesRef,
    linksRef,
    CloneFunctionWrapper,
    graphUpdater
  );

  nodes.forEach((n: DataNode<WorkTaskTypeDto>) => {
    lessonTypeList.push(n.data.name);
  });

  const titleList = nodesRef.current.map(
    (n: DataNode<WorkTaskTypeDto>) => 'Subject'
  );

  const nodeDetailElements: NodePayload<WorkTaskTypeDto>[] =
    nodesRef.current.map((node) => {
      return {
        node: node
      };
    });

  return (
    <NodeLinkRefWrapper
      nodeListRef={nodesRef}
      titleList={titleList}
      linkListRef={linksRef}
      textList={lessonTypeList}
      unsavedNodeChangesProps={unsavedNodeChangesProps}
    >
      <NodeDetails
        nodeDetailElements={nodeDetailElements}
        labels={lessonTypeList}
        detailsUiComponent={WorkTaskTypeDtoDetails}
      />
    </NodeLinkRefWrapper>
  );
}
