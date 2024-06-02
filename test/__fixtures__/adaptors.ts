import {
  ClosureDto,
  DataLink,
  DataNode,
  DataNodeDto,
  getAnyIdAsString,
  HasNumberId,
} from "../../src";

export interface Coordinate {
  x: number;
  y: number;
}

// Define the interface for the "type" object
export interface OrganizationType {
  id: number;
  name: string;
}

// Define the interface for the "workSeriesBundleAssignment" object
export interface WorkSeriesBundleAssignment {
  id: number;
  organizationId: number;
  workSeriesSchemaBundleId: string;
}

// Define the main interface for the JSON structure
export interface Organization extends HasNumberId {
  name: string;
  type: OrganizationType;
  workSeriesBundleAssignment: WorkSeriesBundleAssignment;
}

export function convertToDataNode<T extends HasNumberId>(
  dataNode: DataNodeDto<T> & Partial<Coordinate>,
): DataNode<T> {
  const stringId = getAnyIdAsString(dataNode);
  const x = dataNode.x || 0;
  const y = dataNode.y || 0;

  return { ...dataNode, id: stringId, x, y };
}

export function convertToDataLink<T extends HasNumberId>(
  closureDto: ClosureDto,
): DataLink<T> {
  const stringId = getAnyIdAsString(closureDto);
  const sourceId = getStringIdFromConnection(closureDto.source);
  const targetId = getStringIdFromConnection(closureDto.target);

  return { ...closureDto, target: targetId, source: sourceId, id: stringId };
}

export function getStringIdFromConnection(
  connection: number | string | DataNode<HasNumberId>,
) {
  if (typeof connection === "object") return getAnyIdAsString(connection);
  else return `${connection}`;
}

export function convertDataNodeDtoListToDataNodeList<T extends HasNumberId>(
  list: DataNodeDto<T>[],
) {
  return list.map((n) => convertToDataNode(n));
}

export function convertClosureDtoListToDataLinkList(list: ClosureDto[]) {
  return list.map((l) => convertToDataLink(l));
}
