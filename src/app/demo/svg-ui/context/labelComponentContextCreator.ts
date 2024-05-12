import {DataNode, HasNumberId} from "@/graph-tools/types/types";
import React, {createContext, ReactSVGElement} from "react";
import {CircleNode} from "@/app/demo/svg-ui/components/CircleNode";



export interface NodeLabelElementProps<T extends HasNumberId, G extends SVGElement> extends React.SVGProps<G> {
    node: DataNode<T>
}

export interface NodeLabelContextInterface<T extends HasNumberId> {
    component: (props: NodeLabelElementProps<any, any>) => React.ReactElement<ReactSVGElement>
}

export const NodeLabelContext = createContext<NodeLabelContextInterface<any>>({component: CircleNode})