'use client';
import React, {PropsWithChildren} from 'react';


import {cloneOrganizationNode} from './cloneOrganizationNode';
import {useNodeEditing} from '@/graph-tools/hooks/useNodeEditing';
import {getGraphUpdaterWithNameDeDuplication} from './getGraphUpdaterWithNameDeDuplication';
import {putGraph} from "@/app/demo/graphs/organization/mockPutServerAction";
import {OrganizationDto} from "@/app/demo/types/OrganizationDto";
import {useGraphRefs} from "@/graph-tools/nodes/genericNodeContextCreator";


const cloneFunctionWrapper = {cachedFunction: cloneOrganizationNode};

const organizationGraphUpdater = getGraphUpdaterWithNameDeDuplication(putGraph);

export default function OrganizationGraph({children}: PropsWithChildren) {


    const unsavedGraphChanges = useNodeEditing<OrganizationDto>(
        cloneFunctionWrapper,
        organizationGraphUpdater
    );


    return (
        <>
            {children}

        </>
    );
}
