import { DataLink, DataNode, HasNumberId } from "@/graph-tools/types/types";

export function resetLinks<T extends HasNumberId>(
  allUpdatedLinks: DataLink<T>[],
): DataLink<T>[] {
  return [...allUpdatedLinks].map((link, index) => {
    const source = link.source as DataNode<T>;
    const target = link.target as DataNode<T>;
    return { ...link, source: source.id, target: target.id, index };
  });
}
