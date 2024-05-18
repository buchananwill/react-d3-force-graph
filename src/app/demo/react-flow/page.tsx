import ReactFlowWrapper, {
  initialEdges,
  initialNodes,
} from "@/app/demo/react-flow/components/ReactFlowWrapper";
import ForceGraphPage from "@/graph-tools/components/wrappers/ForceGraphPage";
import DefineModalContent from "@/app/demo/react-flow/components/nodes/DefineModalContent";

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
