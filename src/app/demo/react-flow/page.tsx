import ReactFlowWrapper, {initialEdges, initialNodes} from "@/app/demo/react-flow/components/ReactFlowWrapper";
import ForceGraphPage from "@/graph-tools/ForceGraphPage";
import {ClosureDto, DataLink} from "@/graph-tools/types/types";

export default function Page() {
    return (
        <ForceGraphPage
            graphName={'react-flow'}
            dataGraph={{
                               nodes: initialNodes,
                               closureDtos: (initialEdges as ClosureDto[])
                           }}
            options={{forceSlidersVisibleInitial:{manyBodyTheta: false, forceRadialXRelative: false, forceRadialYRelative: false, centerStrength: false}}}
        >
            <ReactFlowWrapper/>
        </ForceGraphPage>
    )
}