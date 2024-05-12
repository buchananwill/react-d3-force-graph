import React from "react";
import {NodeGraphicsElementProps} from "@/app/demo/svg-ui/context/nodeComponentContextCreator";

export function CircleNode({node, ...otherProps}: NodeGraphicsElementProps<any, SVGCircleElement>) {
    return <circle
        {...otherProps}
        cx={0}
        cy={0}
        r={Math.max((4 - (node.distanceFromRoot || 0)) * 2 + 10, 10)}
        className={"fill-transparent stroke-slate-600 stroke-2"}
    ></circle>;
}