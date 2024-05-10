import ReactFlowWrapper from "@/app/demo/react-flow/components/ReactFlowWrapper";
import ForceGraphPage from "@/graph-tools/ForceGraphPage";

export default function Page() {
return <ForceGraphPage graphName={'react-flow'} dataGraph={{nodes: [], closureDtos: []}}><ReactFlowWrapper/></ForceGraphPage>
}