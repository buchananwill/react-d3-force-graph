
import { deDuplicateNames } from '@/graph-tools/editing/functions/incrementCloneSuffix';
import _ from 'lodash';
import {GraphDto, GraphDtoPutRequestBody, HasName, HasNumberId} from "@/graph-tools/types/types";

export function getGraphUpdaterWithNameDeDuplication<
  T extends HasNumberId & HasName
>(
  putUpdatedGraph: (
    request: GraphDtoPutRequestBody<T>
  ) => Promise<GraphDto<T>>
) {
  return (request: GraphDtoPutRequestBody<T>) => {
    const { graphDto } = request;
    const { nodes } = graphDto;
    const organizationDtos = nodes.map((dn) => dn.data);
    const dtosWithNamesDeDuplicated = deDuplicateNames(organizationDtos);
    const nodesWithDataNamesDeDuplicated = nodes.map((dn, index) => {
      const replacementData = dtosWithNamesDeDuplicated[index];
      if (replacementData.id !== dn.id)
        throw Error('Arrays not aligned. Could not clone nodes.');
      const cloneDeep = _.cloneDeep(dn);
      cloneDeep.data = replacementData;
      return cloneDeep;
    });
    const safeGraph: GraphDto<T> = {
      ...graphDto,
      nodes: nodesWithDataNamesDeDuplicated
    };
    const safeRequest = { ...request, graphDto: safeGraph };
    return putUpdatedGraph(safeRequest);
  };
}