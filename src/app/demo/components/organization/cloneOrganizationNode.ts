import {
  DataNode,
  HasName,
  HasNumberId,
  incrementCloneSuffix,
} from "@/graph-tools";

export function cloneOrganizationNode<T extends HasNumberId & HasName>(
  templateNode: DataNode<T>,
): DataNode<T> {
  const {
    data: { name },
  } = templateNode;
  let cloneName = incrementCloneSuffix(name);

  return {
    ...templateNode,
    data: { ...templateNode.data, name: cloneName },
  };
}
