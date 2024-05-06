'use client';
import React, { PropsWithChildren } from 'react';

import { GenericNodeRefContext } from '../nodes/genericNodeContextCreator';
import { GenericLinkRefContext } from '../links/genericLinkContextCreator';
import { GraphViewer } from './GraphViewer';
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";



export interface UnsavedNodeChangesProps {
  unsavedChanges: boolean;
  handleOpen?: () => void;
  show?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function NodeLinkRefWrapper<T extends HasNumberId>({
  unsavedNodeChangesProps,
  textList,
  titleList,
  nodeListRef,
  linkListRef,
  children
}: {
  nodeListRef: React.MutableRefObject<DataNode<T>[]>;
  linkListRef: React.MutableRefObject<DataLink<T>[]>;
  textList: string[];
  titleList: string[];
  unsavedNodeChangesProps?: UnsavedNodeChangesProps;
} & PropsWithChildren) {
  return (
    <GenericNodeRefContext.Provider value={nodeListRef}>
      <GenericLinkRefContext.Provider value={linkListRef}>
        <div className={'flex-col'}>
          <GraphViewer textList={textList} titleList={titleList}>
            {children}
          </GraphViewer>
        </div>
        {/*{unsavedNodeChangesProps && (*/}
        {/*  <UnsavedChangesModal {...unsavedNodeChangesProps}>*/}
        {/*    <p>Save graph changes to database?</p>*/}
        {/*  </UnsavedChangesModal>*/}
        {/*)}*/}
      </GenericLinkRefContext.Provider>
    </GenericNodeRefContext.Provider>
  );
}
