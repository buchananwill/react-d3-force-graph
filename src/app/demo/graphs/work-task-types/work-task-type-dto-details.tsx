'use client';
import { DataNode } from '../../../api/zod-mods';
import React from 'react';
import { WorkTaskTypeDto } from '../../../api/dtos/WorkTaskTypeDtoSchema';
import {
  RenameWorkTaskType,
  WorkTaskTypeDtoDetailsListenerKey
} from './rename-work-task-type';
import { useSelectiveContextGlobalListener } from '../../../selective-context/components/global/selective-context-manager-global';
import { getNameSpacedKey } from '../../../selective-context/components/controllers/dto-id-list-controller';
import { KnowledgeDomainDto } from '../../../api/dtos/KnowledgeDomainDtoSchema';
import { KnowledgeLevelDto } from '../../../api/dtos/KnowledgeLevelDtoSchema';
import { AssignItemFromObjectEntries } from './assign-item-from-object-entries';
import { HasNumberIdDto } from '../../../api/dtos/HasNumberIdDtoSchema';
import { ObjectPlaceholder } from '../../../api/main';
import { useEntityListReader } from '../../../curriculum/delivery-models/[yearGroup]/useEntityListReader';
import { EntityNamesMap } from '../../../api/entity-names-map';
import { parseTen } from '../../../api/date-and-time';
import { StringMap } from '../../../contexts/string-map-context/string-map';
import {useDirectSimRefEditsDispatch} from "@/graph-tools/editing/functions/useDirectSimRefEditsDispatch";

export interface NodeDetailsUiComponentProps<T extends HasNumberIdDto> {
  node: DataNode<T>;
}

export default function WorkTaskTypeDtoDetails({
  node
}: NodeDetailsUiComponentProps<WorkTaskTypeDto>) {
  const { id, data } = node;
  const { knowledgeDomainId, knowledgeLevelId } = data;
  const editListenerKey = `${WorkTaskTypeDtoDetailsListenerKey}-${id}`;

  const knowledgeDomainDtos = useEntityListReader<KnowledgeDomainDto>(
    EntityNamesMap.knowledgeDomain,
    editListenerKey
  );
  const knowledgeLevelDtos = useEntityListReader<KnowledgeLevelDto>(
    EntityNamesMap.knowledgeLevel,
    editListenerKey
  );

  const { incrementSimVersion, nodeListRef } =
    useDirectSimRefEditsDispatch<WorkTaskTypeDto>();

  const handleKnowledgeDomainChange = (domainIndex: number) => {
    const updatedDomain = knowledgeDomainDtos[domainIndex];
    if (nodeListRef === null || updatedDomain === undefined) return;
    const find = nodeListRef.current.find((n) => n.id === id);
    if (find === undefined) return;
    find.data.knowledgeDomainId = updatedDomain.id;
    find.data.knowledgeDomainName = updatedDomain.name;
    incrementSimVersion();
  };
  const handleKnowledgeLevelChange = (id: number) => {
    console.log('(Not implemented) New id:', id);
  };

  return (
    <div className={'mt-1'}>
      <div className={'grid grid-cols-3 gap-1 mb-1'}>
        <RenameWorkTaskType node={node} />
        <AssignItemFromObjectEntries
          itemDescriptor={'Subject'}
          currentAssignment={knowledgeDomainDtos.findIndex(
            (kd) => kd.id === knowledgeDomainId
          )}
          onChange={handleKnowledgeDomainChange}
          optionsMap={knowledgeDomainDtos}
          labelAccessor={(kd) => kd.name}
          idAccessor={(kd) => kd.id.toString()}
        />
        <AssignItemFromObjectEntries
          itemDescriptor={'Year'}
          currentAssignment={knowledgeLevelDtos.findIndex(
            (kd) => kd.id === knowledgeLevelId
          )}
          onChange={handleKnowledgeLevelChange}
          optionsMap={knowledgeLevelDtos}
          labelAccessor={(kl) => kl.name}
          idAccessor={(kl) => kl.id.toString()}
        />
      </div>
    </div>
  );
}
