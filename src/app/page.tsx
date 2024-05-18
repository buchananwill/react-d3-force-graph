import ReactFlowWrapper, {
  initialEdges,
  initialNodes,
} from "@/react-flow/components/wrappers/ReactFlowWrapper";
import ForceGraphPage from "@/graph-tools/components/wrappers/ForceGraphPage";
import DefineModalContent from "@/graph-tools/components/controllers/DefineModalContent";

export default function Page() {
  return (
    <ForceGraphPage
      graphName={"react-flow"}
      flowNodes={initialNodes}
      edges={initialEdges}
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
