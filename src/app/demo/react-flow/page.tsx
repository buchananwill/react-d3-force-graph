import ReactFlowWrapper, {
  initialEdges,
  initialNodes,
} from "@/app/demo/react-flow/components/ReactFlowWrapper";
import ForceGraphPage from "@/graph-tools/components/wrappers/ForceGraphPage";
import { ClosureDto } from "@/graph-tools/types/types";
import DefineModalContent from "@/app/demo/react-flow/components/nodes/DefineModalContent";

export default function Page() {
  return (
    <ForceGraphPage
      graphName={"react-flow"}
      dataGraph={{
        nodes: initialNodes,
        closureDtos: initialEdges as ClosureDto[],
      }}
      options={{
        forceSlidersVisibleInitial: {
          manyBodyTheta: false,
          forceRadialXRelative: false,
          forceRadialYRelative: false,
          centerStrength: false,
        },
        forceAttributesInitial: {
          forceYStrength: 50,
        },
      }}
    >
      <DefineModalContent />
      <ReactFlowWrapper />
    </ForceGraphPage>
  );
}
