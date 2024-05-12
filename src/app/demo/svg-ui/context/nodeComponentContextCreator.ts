import {DataNode, HasNumberId} from "@/graph-tools/types/types";
import React, {createContext, ReactSVGElement} from "react";
import {CircleNode} from "@/app/demo/svg-ui/components/CircleNode";

// Define a type for SVG elements that draw graphics
export type GraphGraphicsElements = SVGCircleElement | SVGEllipseElement | SVGLineElement | SVGPathElement | SVGPolygonElement | SVGPolylineElement

export interface NodeGraphicsElementProps<T extends HasNumberId, G extends SVGElement> extends React.SVGProps<G> {
    node: DataNode<T>
}

export interface NodeComponentContextInterface<T extends HasNumberId> {
    component: (props: NodeGraphicsElementProps<any, any>) => React.ReactElement<ReactSVGElement>
}

export const NodeComponentContext = createContext<NodeComponentContextInterface<any>>({component: CircleNode})