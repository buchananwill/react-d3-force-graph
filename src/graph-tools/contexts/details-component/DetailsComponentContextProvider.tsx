'use client'

import {PropsWithChildren, useState} from "react";
import {
    defaultLabelAccessor,
    NodeDetailsComponentContext, NodeDetailsComponentDispatchContext,
    NodeDetailsContextInterface
} from "@/graph-tools/contexts/details-component/nodeDetailsComponentContextCreator";
import OrganizationDetails from "@/app/demo/graphs/organization/OrganizationDetails";

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