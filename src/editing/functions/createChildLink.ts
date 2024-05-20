import { DataLink, DataNode, HasNumberId } from "../../types";

export function createChildLink<T extends HasNumberId>(
  sourceNode: DataNode<T>,
  targetNode: DataNode<T>,
  templateLink: DataLink<T>,
  nextLinkId: number,
) {
  return {
    ...templateLink,
    source: sourceNode,
    target: targetNode,
    index: 0,
    id: `${nextLinkId}`,
  } as DataLink<T>;
}
