import { DataNode, HasNumberId } from "@/graph-tools/types/util";

export function deleteNodes<T extends HasNumberId>(
  nodeIdDeletionList: string[],
  current: DataNode<T>[],
) {
  const nodesForDeletion: number[] = [];
  const remainingNodes = current.filter(
    (n) => !nodeIdDeletionList.includes(n.id),
  );

  return { nodesForDeletion, remainingNodes };
}
