import { DataNode, HasName, HasNumberId } from "@/graph-tools/types/types";
import { incrementCloneSuffix } from "@/graph-tools/flow-node-editing/functions/incrementCloneSuffix";

export const NameCharLimit = 255;
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
