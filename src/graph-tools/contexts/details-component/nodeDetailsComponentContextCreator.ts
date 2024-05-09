import React, {createContext, Dispatch, FC, ReactNode, SetStateAction} from "react";
import {DataNode, HasNumberId} from "@/graph-tools/types/types";
import OrganizationDetails from "@/app/demo/graphs/organization/OrganizationDetails";

export function defaultLabelAccessor( n: DataNode<any>) {
    return `Node ${n.id}`
}

export const NodeDetailsComponentContext = createContext<NodeDetailsContextInterface<any>>({component: OrganizationDetails, labelAccessor: defaultLabelAccessor})

export const NodeDetailsComponentDispatchContext = createContext<Dispatch<SetStateAction<NodeDetailsContextInterface<any>>>>(() => {})

export interface NodeDetailsProps<T extends HasNumberId> {
    node: DataNode<T>
}

export interface NodeDetailsContextInterface<T extends HasNumberId> {
    component: (props: NodeDetailsProps<T>) => React.JSX.Element
    labelAccessor: (n: DataNode<T>) => string
}

