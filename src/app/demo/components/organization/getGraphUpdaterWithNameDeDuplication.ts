import _ from "lodash";
import {
  GraphDto,
  GraphDtoPutRequestBody,
  HasName,
  HasNumberId,
} from "@/graph-tools/types/types";
import { deDuplicateNames } from "@/graph-tools/flow-node-editing/functions/incrementCloneSuffix";
import { getNumberFromStringId } from "@/app/demo/react-flow/utils/adaptors";

export function getGraphUpdaterWithNameDeDuplication<
  T extends HasNumberId & HasName,
>(
  putUpdatedGraph: (
    // eslint-disable-next-line no-unused-vars
    request: GraphDtoPutRequestBody<T>,
  ) => Promise<GraphDto<T>>,
) {
  return (request: GraphDtoPutRequestBody<T>) => {
    const { graphDto } = request;
    const { nodes } = graphDto;
    const organizationDtos = nodes.map((dn) => dn.data);
    const dtosWithNamesDeDuplicated = deDuplicateNames(organizationDtos);
    const nodesWithDataNamesDeDuplicated = nodes.map((dn, index) => {
      const replacementData = dtosWithNamesDeDuplicated[index];
      if (replacementData.id !== getNumberFromStringId(dn.id))
        throw Error("Arrays not aligned. Could not clone nodes.");
      const cloneDeep = _.cloneDeep(dn);
      cloneDeep.data = replacementData;
      return cloneDeep;
    });
    const safeGraph: GraphDto<T> = {
      ...graphDto,
      nodes: nodesWithDataNamesDeDuplicated,
    };
    const safeRequest = { ...request, graphDto: safeGraph };
    return putUpdatedGraph(safeRequest);
  };
}
