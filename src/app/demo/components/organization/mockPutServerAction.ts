"use server";

import {
  GraphDtoPutRequestBody,
  HasName,
  HasNumberId,
} from "@/graph-tools/types/util";

export async function putGraph<T extends HasNumberId & HasName>(
  graphRequest: GraphDtoPutRequestBody<T>,
) {
  console.log(graphRequest);

  return graphRequest.graphDto;
}
