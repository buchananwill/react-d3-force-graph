import { Organization } from "./adaptors";
import { DataNode } from "../../src/types";
import { incrementCloneSuffix, TransientIdOffset } from "../../src";

export function cloneOrganizationNode(
  templateNode: DataNode<Organization>,
): DataNode<Organization> {
  const {
    data: { name },
  } = templateNode;
  const cloneName = incrementCloneSuffix(name);
  const clonedNode = structuredClone(templateNode);
  const {
    data: { workSeriesBundleAssignment },
  } = clonedNode;
  workSeriesBundleAssignment.id = TransientIdOffset + templateNode.data.id;

  return {
    ...clonedNode,
    data: {
      ...clonedNode.data,
      name: cloneName,
    },
  };
}
