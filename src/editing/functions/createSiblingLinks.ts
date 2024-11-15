import { DataLink, DataNode, HasNumberId } from "../../types";

export function createSiblingLinks<T extends HasNumberId>(
  referenceNode: DataNode<T>,
  newNode: DataNode<T>,
  allLinks: DataLink<T>[],
  getNextLinkId: () => number,
) {
  const newLinks: DataLink<T>[] = [];
  const linksAsChild = allLinks.filter(
    (l) =>
      (l.target as DataNode<T>).id === referenceNode.id ||
      (l.target as string) === referenceNode.id,
  );
  linksAsChild
    .map((l, index) => {
      return {
        ...l,
        target: newNode,
        id: `${getNextLinkId()}`,
        index: index,
      } as DataLink<T>;
    })
    .forEach((l) => newLinks.push(l));
  return newLinks;
}
