import React from "react";
import {NodeGraphicsElementProps} from "@/graph-tools/nodes/nodeComponentContextCreator";

export function SquareNode({node, ...otherProps}: NodeGraphicsElementProps<any, SVGRectElement>) {
    const dimension = (80 - (node.distanceFromRoot)*20)

    return <rect
        {...otherProps}
        x={-dimension/2}
        y={-dimension/2}
        width={dimension}
        height={dimension}
        className={"fill-transparent stroke-slate-600 stroke-2"}
    ></rect>;
}