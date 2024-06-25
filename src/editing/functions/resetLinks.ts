import { DataLink, HasId, HasNumberId } from "../../types";

export function resetLinks<T extends HasNumberId>(
  allUpdatedLinks: DataLink<T>[],
): DataLink<T>[] {
  return [...allUpdatedLinks].map((link, index) => {
    const source = getIdFromLinkReference(link.source); // as DataNode<T>;
    const target = getIdFromLinkReference(link.target); // as DataNode<T>;
    return { ...link, source, target, index };
  });
}

export function getIdFromLinkReference(
  reference: string | number | HasId,
): string {
  if (typeof reference === "string" || typeof reference == "number")
    return String(reference);
  else return String(reference.id);
}
