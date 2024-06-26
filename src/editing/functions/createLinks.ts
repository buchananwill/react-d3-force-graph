import { DataLink, DataNode, HasNumberId, Relation } from "../../types";
import { createSiblingLinks } from "./createSiblingLinks";
import { createChildLink } from "./createChildLink";

export interface LinkParams<T extends HasNumberId> {
  references: DataNode<T>[];
  newNodes: DataNode<T>[];
  allLinks: DataLink<T>[];
  getNextLinkId: () => number;
  relation: Relation;
  templateLink?: DataLink<T>;
}

export function createLinks<T extends HasNumberId>({
  references,
  newNodes,
  allLinks,
  getNextLinkId,
  relation,
  templateLink,
}: LinkParams<T>): {
  allLinksUpdated: DataLink<T>[];
  newLinks: DataLink<T>[];
} {
  let newLinks: DataLink<T>[] = [];
  switch (relation) {
    case "sibling": {
      for (let i = 0; i < newNodes.length; i++) {
        newLinks = [
          ...newLinks,
          ...createSiblingLinks(
            references[i],
            newNodes[i],
            allLinks,
            getNextLinkId,
          ),
        ];
      }
      break;
    }
    case "child": {
      const templateLinkDefined =
        allLinks.length > 0
          ? allLinks[0]
          : templateLink !== undefined
            ? templateLink
            : null;
      if (templateLinkDefined === null)
        throw Error("No template link provided.");
      for (let i = 0; i < references.length; i++) {
        newLinks = [
          ...newLinks,
          createChildLink(
            references[i],
            newNodes[i],
            templateLinkDefined,
            getNextLinkId(),
          ),
        ];
      }
      break;
    }
  }
  const allUpdatedLinks = [...allLinks, ...newLinks].map((l, index) => ({
    ...l,
    index,
  }));
  return { allLinksUpdated: allUpdatedLinks, newLinks };
}
