'use client'
import ForceGraphPage from "@/graph-tools/ForceGraphPage";
import OrganizationGraph from "@/app/demo/graphs/organization/OrganizationGraph";
import graphDto from '@/app/demo/data/graphDto.json'
import {SelectiveContextManagerGlobal} from "selective-context";
import {NextUIProvider} from "@nextui-org/system";
import {Card, CardBody, CardHeader} from "@nextui-org/card";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <NextUIProvider>
                <SelectiveContextManagerGlobal>
                    <ForceGraphPage dataGraph={graphDto} graphName={'organization-graph'} options={{sidePanel: true, defaultInteractiveViewer: false}}>
                        <OrganizationGraph>
                            <Card>
                                <CardHeader>Some Graph Info</CardHeader>
                                <CardBody>And then here is the
                            info.</CardBody>
                            </Card>
                        </OrganizationGraph>
                    </ForceGraphPage>
                </SelectiveContextManagerGlobal>
            </NextUIProvider>
        </main>
    );
}
