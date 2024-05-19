import { ExampleLayoutFlowWithForces } from "@/app/demo/components/ExampleLayoutFlowWithForces";
import React from "react";

import { initialEdges, initialNodes } from "@/app/demo/data/initial";
import { ForceGraphPage, ForceGraphPageOptions } from "@/graph-tools";
import { ReactFlowWrapper } from "@/react-flow";

const defaultForceGraphPageOptions: ForceGraphPageOptions = {
  forceSlidersVisibleInitial: {
    manyBodyTheta: false,
    forceRadialXRelative: false,
    forceRadialYRelative: false,
    centerStrength: false,
  },
  forceAttributesInitial: {
    forceYStrength: 50,
    linkStrength: 50,
  },
};
export default function Page() {
  return (
    <ForceGraphPage
      graphName={"react-flow"}
      dataNodes={initialNodes}
      dataLinks={initialEdges}
      options={defaultForceGraphPageOptions}
    >
      <ReactFlowWrapper>
        <ExampleLayoutFlowWithForces></ExampleLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}
