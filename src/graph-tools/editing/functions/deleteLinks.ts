'use client';


import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";

function getPredicates<T extends HasNumberId>(set: Set<number>) {
  const allPredicate = (l: DataLink<T>) => {
    return (
        set.has((l.target as DataNode<T>).id) &&
        set.has((l.source as DataNode<T>).id)
    );
  };

  const anyPredicate = (l: DataLink<T>) => {
    return (
        set.has((l.target as DataNode<T>).id) ||
        set.has((l.source as DataNode<T>).id)
    );
  };
  return {allPredicate, anyPredicate};
}

export function deleteLinks<T extends HasNumberId>(
  linksListRef: DataLink<T>[],
  selectedNodeIds: number[],
  mode: 'any' | 'all'
) {
  const set = new Set(selectedNodeIds);
  const {allPredicate, anyPredicate} = getPredicates(set);
  const deletionPredicate = mode === 'any' ? anyPredicate : allPredicate;
  const toDelete: number[] = [];
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

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
