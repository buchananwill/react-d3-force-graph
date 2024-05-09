'use client';
import React, {PropsWithChildren} from 'react';

import {NodeRefContext} from '../nodes/genericNodeContextCreator';
import {LinkRefContext} from '../links/genericLinkContextCreator';
import {GraphViewer} from './GraphViewer';
import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import ForcesContextProvider from "@/graph-tools/contexts/forces/ForcesContextProvider";
import {useNodeAndLinkRefVersionListen} from "@/graph-tools/hooks/useNodeAndLinkRefVersionListen";


export interface UnsavedNodeChangesProps {
    unsavedChanges: boolean;
    handleOpen?: () => void;
    show?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export function NodeLinkRefWrapper<T extends HasNumberId>({children}:PropsWithChildren) {
    const {nodesRef, linksRef} = useNodeAndLinkRefVersionListen();

    return (
        <NodeRefContext.Provider value={nodesRef}>
            <LinkRefContext.Provider value={linksRef}>
                <div className={'flex-col'}>
                    {children}
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
