'use client';
import React, {PropsWithChildren} from 'react';

import OrganizationDetails from './OrganizationDetails';


import {cloneOrganizationNode} from './cloneOrganizationNode';
import NodeDetails from '../../../../graph-tools/components/NodeDetails';
import {useNodeEditing} from '@/graph-tools/hooks/useNodeEditing';
import {getGraphUpdaterWithNameDeDuplication} from './getGraphUpdaterWithNameDeDuplication';
import {putGraph} from "@/app/demo/graphs/organization/mockPutServerAction";
import {DataNode} from "@/graph-tools/types/types";
import {OrganizationDto} from "@/app/demo/types/OrganizationDto";
import {useGraphRefs} from "@/graph-tools/nodes/genericNodeContextCreator";


const cloneFunctionWrapper = {cachedFunction: cloneOrganizationNode};

const organizationGraphUpdater = getGraphUpdaterWithNameDeDuplication(putGraph);

export default function OrganizationGraph({children}: PropsWithChildren) {
    const {nodeListRef, linkListRef} = useGraphRefs<OrganizationDto>();

    const unsavedGraphChanges = useNodeEditing<OrganizationDto>(
        cloneFunctionWrapper,
        organizationGraphUpdater
    );

    const classList: string[] = [];
    const descriptionList: string[] = [];

    nodeListRef?.current.forEach((n: DataNode<OrganizationDto>) => {
        classList.push(n.data.name);
        descriptionList.push(n.data.name);
    });
    nodeListRef?.current.map(
        (n: DataNode<OrganizationDto>) => n.data?.type.name || ''
    );
    const nodeDetailElements = nodeListRef?.current.map(
        (node) => {
            return {
                node: node
            };
        }
    ) || [];

    return (
        <>
            {children}

        </>
    );
}
