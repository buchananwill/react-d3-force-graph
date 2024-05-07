'use client';
import React, {PropsWithChildren} from 'react';

import OrganizationDetails from './OrganizationDetails';
import {NodePayload} from '@/graph-tools/ForceGraphPage';


import {cloneOrganizationNode} from './cloneOrganizationNode';
import {NodeLinkRefWrapper} from '@/graph-tools/graph/NodeLinkRefWrapper';
import NodeDetails from '../../../../graph-tools/components/NodeDetails';
import {useNodeEditing} from '@/graph-tools/hooks/useNodeEditing';
import {useNodeAndLinkRefs} from '@/graph-tools/hooks/useNodeAndLinkRefs';
import {getGraphUpdaterWithNameDeDuplication} from './getGraphUpdaterWithNameDeDuplication';
import {putGraph} from "@/app/demo/graphs/organization/mockPutServerAction";
import {DataNode} from "@/graph-tools/types/types";
import {OrganizationDto} from "@/app/demo/graphs/organization/OrganizationDto";


const cloneFunctionWrapper = {cachedFunction: cloneOrganizationNode};

const organizationGraphUpdater = getGraphUpdaterWithNameDeDuplication(putGraph);

export default function OrganizationGraph({children}: PropsWithChildren) {
    const {nodes, nodesRef, linksRef} = useNodeAndLinkRefs<OrganizationDto>();

    const unsavedGraphChanges = useNodeEditing<OrganizationDto>(
        nodesRef,
        linksRef,
        cloneFunctionWrapper,
        organizationGraphUpdater
    );


    const classList: string[] = [];
    const descriptionList: string[] = [];

    nodes.forEach((n: DataNode<OrganizationDto>) => {
        classList.push(n.data.name);
        descriptionList.push(n.data.name);
    });

    const titleList = nodes.map(
        (n: DataNode<OrganizationDto>) => n.data?.type.name || ''
    );

    const nodeDetailElements: NodePayload<OrganizationDto>[] = nodesRef.current.map(
        (node) => {
            return {
                node: node
            };
        }
    );

    return (
        <NodeLinkRefWrapper
            nodeListRef={nodesRef}
            linkListRef={linksRef}
            textList={descriptionList}
            titleList={titleList}
            unsavedNodeChangesProps={unsavedGraphChanges}
        >
            {children}
            <NodeDetails
                nodeDetailElements={nodeDetailElements}
                labels={classList}
                detailsUiComponent={OrganizationDetails}
            />
        </NodeLinkRefWrapper>
    );
}
