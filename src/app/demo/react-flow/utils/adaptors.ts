import {
  ClosureDto,
  DataNode,
  DataNodeDto,
  FlowEdge,
  FlowNode,
  HasId,
} from "@/graph-tools/types/types";
import { Coordinate } from "@/app/demo/react-flow/components/edges/EdgeWithDelete";

const nodeType = "organization";

// const stringOrNumber = ["string", "number"] as const;

export function getAnyIdAsString(entity: HasId) {
  const { id } = entity;
  const idType = typeof id;
  if (idType === "string" || idType === "number") return `${id}`;
  else throw Error("Id not valid string or number");
}

export function getNumberFromStringId(id: string) {
  const number = parseInt(id, 10);
  if (isNaN(number)) {
    const colonIndex = id.indexOf(":");
    const afterColon = parseInt(id.substring(colonIndex + 1));
    if (isNaN(afterColon))
      throw Error("Id did not contain valid number after colon separator.");
    return afterColon;
  } else return number;
}

export function convertToReactFlowNode(
  dataNode: DataNodeDto<any> & Partial<Coordinate>,
): FlowNode {
  const stringId = getAnyIdAsString(dataNode);
  const x = dataNode.x || 0;
  const y = dataNode.y || 0;
  const position = { x, y: y };
  return { ...dataNode, id: stringId, position, type: nodeType, x, y };
}

export function convertToReactFlowEdge(closureDto: ClosureDto): FlowEdge {
  const stringId = getAnyIdAsString(closureDto);
  const sourceId = getStringIdFromConnection(closureDto.source);
  const targetId = getStringIdFromConnection(closureDto.target);

  return { ...closureDto, target: targetId, source: sourceId, id: stringId };
}

export function getStringIdFromConnection(
  connection: number | string | DataNode<any>,
) {
  if (typeof connection === "object") return getAnyIdAsString(connection);
  else return `${connection}`;
}

export function convertDataNodeDtoListToFlowNodeList(list: DataNodeDto<any>[]) {
  return list.map((n) => convertToReactFlowNode(n));
}

export function convertClosureDtoListToEdgeList(list: ClosureDto[]) {
  return list.map((l) => convertToReactFlowEdge(l));
}
