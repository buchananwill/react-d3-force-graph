'use client'

import {PropsWithChildren, useState} from "react";
import {
    defaultLabelAccessor,
    NodeDetailsComponentContext, NodeDetailsComponentDispatchContext,
    NodeDetailsContextInterface
} from "@/app/demo/components/details-component-context/nodeDetailsComponentContextCreator";
import OrganizationDetails from "@/app/demo/components/organization/OrganizationDetails";

export default function DetailsComponentContextProvider({children}: PropsWithChildren) {
    const [context, setContext] = useState<NodeDetailsContextInterface<any>>({
        component: OrganizationDetails,
        labelAccessor: defaultLabelAccessor
    });

    return <NodeDetailsComponentContext.Provider value={context}>
        <NodeDetailsComponentDispatchContext.Provider
        value={setContext}>
        {children}
    </NodeDetailsComponentDispatchContext.Provider>
    </NodeDetailsComponentContext.Provider>
}