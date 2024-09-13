import { Organization } from "./adaptors";
import { DataNode } from "../../src";
import { incrementCloneSuffix } from "../../src";

function makeIdTransient(id: number) {
  return id < 0 ? id : 0 - id;
}

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
  workSeriesBundleAssignment.id = makeIdTransient(templateNode.data.id);

  return {
    ...clonedNode,
    data: {
      ...clonedNode.data,
      name: cloneName,
    },
  };
}
