import { DataLink, DataNode, HasNumberId } from "@/graph-tools/types/types";

export function createSiblingLinks<T extends HasNumberId>(
  referenceNode: DataNode<T>,
  newNode: DataNode<T>,
  allLinks: DataLink<T>[],
  getNextLinkId: () => number,
) {
  const newLinks: DataLink<T>[] = [];
  const linksAsChild = allLinks.filter(
    (l) => (l.source as DataNode<T>).id === referenceNode.id,
  );
  linksAsChild
    .map((l, index) => {
      return {
        ...l,
        source: newNode,
        id: `${getNextLinkId()}`,
        index: index,
      } as DataLink<T>;
    })
    .forEach((l) => newLinks.push(l));
  return newLinks;
}