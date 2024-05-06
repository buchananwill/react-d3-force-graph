
import { Relation } from '../buttons/AddNodesButton';
import {CloneFunction, DataNode, HasNumberId} from "@/graph-tools/types/types";

export interface CreateNodeParams<T extends HasNumberId> {
  startIdAt: number;
  targetNodes: DataNode<T>[];
  allNodes: DataNode<T>[];
  relation: Relation;
  cloneFunction: CloneFunction<DataNode<T>>;
}

export function createNodes<T extends HasNumberId>(
  createNodeParams: CreateNodeParams<T>
): {
  allNodes: DataNode<T>[];
  createdNodes: DataNode<T>[];
} {
  const {
    targetNodes,
    startIdAt,
    allNodes: oldNodes,
    relation,
    cloneFunction
  } = createNodeParams;
  let createdNodes: DataNode<T>[] = [];
  let counter = 0;
  for (const node of targetNodes) {
    const { distanceFromRoot, data, ...otherFields } = cloneFunction(node);
    const nextId = startIdAt + counter;
    data.id = nextId;
    const newDistance =
      relation === 'sibling' ? distanceFromRoot : distanceFromRoot + 1;
    const createdNode = {
      ...otherFields,
      id: nextId,
      distanceFromRoot: newDistance,
      data: data
    };
    createdNodes.push(createdNode);
    counter++;
  }

  const allNodes = [...oldNodes, ...createdNodes];
  return { allNodes, createdNodes };
}
