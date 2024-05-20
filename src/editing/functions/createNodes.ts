import { Relation } from "../hooks/useAddNodes";
import { CloneFunction, DataNode, HasNumberId } from "../../types";

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
    relation,
    cloneFunction,
  } = createNodeParams;
  const createdNodes: DataNode<T>[] = [];
  for (const node of sourceNodes) {
    const { distanceFromRoot, data, ...otherFields } = cloneFunction(node);
    const nextId = getNextNodeId();
    data.id = nextId;
    const newDistance =
      relation === "sibling" ? distanceFromRoot : distanceFromRoot + 1;
    const createdNode = {
      ...otherFields,
      id: `${nextId}`,
      distanceFromRoot: newDistance,
      data: data,
    };
    createdNodes.push(createdNode);
  }

  const allNodes = [...oldNodes, ...createdNodes];
  return { allNodes, createdNodes };
}
