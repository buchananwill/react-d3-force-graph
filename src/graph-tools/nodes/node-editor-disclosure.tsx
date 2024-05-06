'use client';

import {AddNodesButton} from '../editing/buttons/add-nodes-button';


import AddLinksButton from '../editing/buttons/add-links-button';
import {DeleteNodesButton} from '../editing/buttons/delete-nodes-button';
import {DeleteLinksButton} from '../editing/buttons/delete-links-button';
import React from 'react';

import InvertLinksButton from '../editing/buttons/invert-links-button';

import {CloneFunction} from '../editing/buttons/clone-function';
import {CachedFunction, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/graph/graph-context-creator";

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

export function NodeEditorDisclosure<T extends HasNumberId>({}: {
  propCloneFunction?: CloneFunction<DataNode<T>>;
}) {
  const {
    currentState: { cachedFunction: cloneFunction }
  } = useGraphListener<CachedFunction<DataNode<T>, DataNode<T>>>(
    NodeCloneFunctionKey,
    ListenerKey,
    { cachedFunction: FallBackCloneFunction }
  );

  return (
    <div className={'sticky -top-0 w-full flex flex-col bg-slate-50 z-10 '}>
      <div className={'h-2'}></div>
      {/*<DisclosureThatGrowsOpen*/}
      {/*  label={'Edit Graph'}*/}
      {/*  heightWhenOpen={'h-[9.5rem]'}*/}
      {/*>*/}
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
      {/*</DisclosureThatGrowsOpen>*/}
      <div className={'h-2  border-t'}></div>
    </div>
  );
}
