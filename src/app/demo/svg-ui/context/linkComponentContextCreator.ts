import {DataLink, HasNumberId} from "@/graph-tools/types/types";
import React, {createContext, ReactSVGElement} from "react";
import {Coordinate} from "@/app/demo/svg-ui/components/LinkComponent";
import CurvedLinkComponent from "@/app/demo/svg-ui/components/CurvedLinkComponent";


export interface LinkGraphicsElementProps<T extends HasNumberId, G extends SVGElement> extends React.SVGProps<G> {
    linkData: DataLink<T>;
    linkIndex: number;
    sourceNodeLocation: Coordinate
    targetNodeLocation: Coordinate;
    showEdgesFromChildren: boolean
    sourceSelected: boolean
    showEdgesFromParents: boolean
    targetSelected: boolean
    showArrowsToParents: boolean
    showArrowsToChildren: boolean

}

export interface NodeComponentContextInterface<T extends HasNumberId> {
    component: (props: LinkGraphicsElementProps<any, any>) => React.ReactElement<ReactSVGElement>
}

export const LinkComponentContext = createContext<NodeComponentContextInterface<any>>({component: CurvedLinkComponent})