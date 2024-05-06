'use client'
import ForceGraphPage from "@/graph-tools/ForceGraphPage";
import OrganizationGraph from "@/app/demo/graphs/organization/OrganizationGraph";
import graphDto from '@/app/demo/data/graphDto.json'
import {SelectiveContextManagerGlobal} from "selective-context";
import {NextUIProvider} from "@nextui-org/system";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <NextUIProvider>
        <SelectiveContextManagerGlobal>
      <ForceGraphPage dataGraph={graphDto} graphName={'organization-graph'}>
        <OrganizationGraph/>
      </ForceGraphPage>
        </SelectiveContextManagerGlobal>
        </NextUIProvider>
    </main>
  );
}
