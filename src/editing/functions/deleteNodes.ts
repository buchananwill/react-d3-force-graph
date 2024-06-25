import { DataNode, HasNumberId } from "../../types";

export function deleteNodes<T extends HasNumberId>(
  nodeIdDeletionList: string[],
  current: DataNode<T>[],
) {
  const remainingNodes = current.filter(
    (n) => !nodeIdDeletionList.includes(n.id),
  );

  return { nodesForDeletion: nodeIdDeletionList, remainingNodes };
}
