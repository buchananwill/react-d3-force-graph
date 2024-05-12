'use client';

import {AddNodesButton} from '../../../graph-tools/editing/buttons/AddNodesButton';


import AddLinksButton from '../../../graph-tools/editing/buttons/AddLinksButton';
import {DeleteNodesButton} from '../../../graph-tools/editing/buttons/DeleteNodesButton';
import {DeleteLinksButton} from '../../../graph-tools/editing/buttons/DeleteLinksButton';
import React from 'react';

import InvertLinksButton from '../../../graph-tools/editing/buttons/InvertLinksButton';

import {CachedFunction, CloneFunction, DataNode, HasNumberId} from "@/graph-tools/types/types";

import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";

export function FallBackCloneFunction<T extends HasNumberId>(
  original: DataNode<T>
): DataNode<T> {
  const { data } = original;
  const clonedData = { ...data };
  return { ...original, data: clonedData };
}

export const NodeCloneFunctionKey = 'node-clone-function';

export const ListenerKey = 'node-editor-disclosure';

export const ShowNodeEditingKey = '';

export function NodeEditorPanel<T extends HasNumberId>({}: {
  propCloneFunction?: CloneFunction<DataNode<T>>;
}) {
  const {
    currentState: { cachedFunction: cloneFunction }
  } = useGraphListener<CachedFunction<DataNode<T>, DataNode<T>>>(
    NodeCloneFunctionKey,
    ListenerKey,
    { cachedFunction: FallBackCloneFunction }
  );

  return (<>

        <div className={'w-full grid grid-cols-2 gap-1 relative mb-1'}>
          <AddNodesButton relation={'sibling'} cloneFunction={cloneFunction}>
            Add Sibling
          </AddNodesButton>
          <AddNodesButton relation={'child'} cloneFunction={cloneFunction}>
            Add Child
          </AddNodesButton>
        </div>
        <div className={'w-full grid grid-cols-2 gap-1 relative mb-1'}>
          <AddLinksButton>Add Links</AddLinksButton>
          <InvertLinksButton>Invert Links</InvertLinksButton>
        </div>
        <div className={'w-full grid grid-cols-2 gap-1 relative'}>
          <DeleteNodesButton>Delete Nodes</DeleteNodesButton>
          <DeleteLinksButton>Delete Links</DeleteLinksButton>
        </div>

    </>
  );
}
