import { CloneFunction, DataNode, HasNumberId, Relation } from "../../types";

export interface CreateNodeParams<T extends HasNumberId> {
  getNextNodeId: () => number;
  sourceNodes: DataNode<T>[];
  allNodes: DataNode<T>[];
  relation: Relation;
  cloneFunction: CloneFunction<DataNode<T>>;
}

export function createNodes<T extends HasNumberId>(
  createNodeParams: CreateNodeParams<T>,
): {
  allNodes: DataNode<T>[];
  createdNodes: DataNode<T>[];
} {
  const {
    sourceNodes,
    getNextNodeId,
    allNodes: oldNodes,
    cloneFunction,
  } = createNodeParams;
  const createdNodes: DataNode<T>[] = [];
  for (const node of sourceNodes) {
    const { data, ...otherFields } = cloneFunction(node);
    const nextId = getNextNodeId();
    data.id = nextId;
    const createdNode = {
      ...otherFields,
      id: `${nextId}`,
      data: data,
    };
    createdNodes.push(createdNode);
  }

  const allNodes = [...oldNodes, ...createdNodes];
  return { allNodes, createdNodes };
}
