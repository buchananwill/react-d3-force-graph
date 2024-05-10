'use client'
import ForceGraphPage from "@/graph-tools/ForceGraphPage";
import OrganizationGraph from "@/app/demo/graphs/organization/OrganizationGraph";
import graphDto from '@/app/demo/data/graphDto.json'
import {SelectiveContextManagerGlobal} from "selective-context";
import {NextUIProvider} from "@nextui-org/system";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import SimulationSwitch from "@/app/demo/components/SimulationSwitch";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <ForceGraphPage dataGraph={graphDto} graphName={'organization-graph'} options={{sidePanel: true, defaultInteractiveViewer: true}}>
                        <OrganizationGraph>
                            <Card>
                                <CardHeader>Some Graph Info</CardHeader>
                                <CardBody>And then here is the
                            info.
                                    <SimulationSwitch/>
                                </CardBody>
                            </Card>
                        </OrganizationGraph>
                    </ForceGraphPage>

        </main>
    );
}
