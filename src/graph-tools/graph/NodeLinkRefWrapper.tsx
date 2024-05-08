'use client';
import React, {PropsWithChildren} from 'react';

import {NodeRefContext} from '../nodes/genericNodeContextCreator';
import {LinkRefContext} from '../links/genericLinkContextCreator';
import {GraphViewer} from './GraphViewer';
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import ForcesContextProvider from "@/graph-tools/contexts/forces/ForcesContextProvider";


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
        <NodeRefContext.Provider value={nodeListRef}>
            <LinkRefContext.Provider value={linkListRef}>
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
            </LinkRefContext.Provider>
        </NodeRefContext.Provider>
    );
}
