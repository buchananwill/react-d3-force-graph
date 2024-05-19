import ReactFlowWrapper from "@/react-flow/components/wrappers/ReactFlowWrapper";
import ForceGraphPage from "@/graph-tools/components/wrappers/ForceGraphPage";
import { ExampleLayoutFlowWithForces } from "@/app/demo/components/ExampleLayoutFlowWithForces";
import React from "react";
import { ForceGraphPageOptions } from "@/graph-tools/types/forceGraphPageProps";
import { initialEdges, initialNodes } from "@/app/demo/data/initial";

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
