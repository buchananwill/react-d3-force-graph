import graphDto from "@/app/demo/data/graphDto.json";
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList,
} from "@/react-flow";

export const initialNodes = convertDataNodeDtoListToFlowNodeList(
  graphDto.nodes,
);
export const initialEdges = convertClosureDtoListToEdgeList(
  graphDto.closureDtos,
);
