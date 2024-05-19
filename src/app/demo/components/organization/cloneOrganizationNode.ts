import { DataNode, HasName, HasNumberId } from "@/graph-tools/types/util";
import { incrementCloneSuffix } from "@/graph-tools/editing/functions/incrementCloneSuffix";

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
