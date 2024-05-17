import { DataLink, DataNode, FlowNode, HasId } from "@/graph-tools/types/types";
import { Edge } from "reactflow";

const nodeType = "organization";

const stringOrNumber = ["string", "number"] as const;

function getAnyIdAsString(entity: HasId) {
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

export function convertToReactFlowNode(dataNode: DataNode<any>): FlowNode {
  const stringId = getAnyIdAsString(dataNode);
  const x = dataNode.x || 0;
  const y = dataNode.y || 0;
  const position = { x, y: y };
  return { ...dataNode, id: stringId, position, type: nodeType, x, y };
}

export function convertToReactFlowEdge(dataLink: DataLink<any>): Edge {
  const stringId = getAnyIdAsString(dataLink);
  const sourceId = getStringIdFromConnection(dataLink.source);
  const targetId = getStringIdFromConnection(dataLink.target);

  return { ...dataLink, target: targetId, source: sourceId, id: stringId };
}

export function getStringIdFromConnection(
  connection: number | string | DataNode<any>,
) {
  if (typeof connection === "object") return getAnyIdAsString(connection);
  else return `${connection}`;
}

export function convertDataNodeListToNodeList(list: DataNode<any>[]) {
  return list.map((n) => convertToReactFlowNode(n));
}

export function convertDataLinkListToEdgeList(list: DataLink<any>[]) {
  return list.map((l) => convertToReactFlowEdge(l));
}
