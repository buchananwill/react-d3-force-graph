'use client';
import React, {PropsWithChildren} from 'react';

import {HasNumberId} from "@/graph-tools/types/types";
import {useSyncRefVersionToNodeAndLinkContext} from "@/graph-tools/hooks/useSyncRefVersionToNodeAndLinkContext";
import {NodeRefContext} from "@/graph-tools/contexts/nodeRefContextCreator";
import {LinkRefContext} from "@/graph-tools/contexts/linkRefContextCreator";


export function NodeLinkRefContextProvider<T extends HasNumberId>({children}: PropsWithChildren) {
    const {nodesRef, linksRef} = useSyncRefVersionToNodeAndLinkContext();

    return (
        <NodeRefContext.Provider value={nodesRef}>
            <LinkRefContext.Provider value={linksRef}>
                {children}
            </LinkRefContext.Provider>
        </NodeRefContext.Provider>
    );
}