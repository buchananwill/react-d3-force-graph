"use client";

import { DataLink, DataNode, HasNumberId } from "../../types";

function getPredicate<T extends HasNumberId>(set: Set<string>) {
  return (l: DataLink<T>) => {
    return (
      set.has((l.target as DataNode<T>).id) ||
      set.has((l.source as DataNode<T>).id)
    );
  };
}

export function deleteLinks<T extends HasNumberId>(
  linksListRef: DataLink<T>[],
  selectedNodeIds: string[],
) {
  const set = new Set(selectedNodeIds);
  const deletionPredicate = getPredicate(set);
  const toDelete: string[] = [];
  const remainingLinks = linksListRef
    .map((l) => {
      const deleteThisLink = deletionPredicate(l);
      if (deleteThisLink) {
        toDelete.push(l.id);
        return null;
      } else {
        return l;
      }
    })
    .filter(isNotNull);
  return { toDelete, remainingLinks };
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}
