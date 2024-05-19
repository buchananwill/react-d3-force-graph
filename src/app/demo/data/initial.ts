import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList,
} from "@/react-flow/utils/adaptors";
import graphDto from "@/app/demo/data/graphDto.json";

export const initialNodes = convertDataNodeDtoListToFlowNodeList(
  graphDto.nodes,
);
export const initialEdges = convertClosureDtoListToEdgeList(
  graphDto.closureDtos,
);
