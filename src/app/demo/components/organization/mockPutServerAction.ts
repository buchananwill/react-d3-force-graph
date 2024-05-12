'use server'

import {GraphDtoPutRequestBody, HasName, HasNumberId} from "@/graph-tools/types/types";

export async function putGraph<T extends HasNumberId & HasName>(graphRequest: GraphDtoPutRequestBody<T>) {

    console.log(graphRequest)

    return graphRequest.graphDto
}