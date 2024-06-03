import { useMemo } from "react";
import { DataLink, HasNumberId, Predicate } from "../types";

export function getClosurePredicate<T extends { value: number }>(
  value: number,
) {
  return (c: T) => c.value == value;
}

export const DirectConnectionDistance = 1;

export function useFilteredLinkMemo<T extends HasNumberId>(
  closureList: DataLink<T>[],
  closurePredicate: Predicate<DataLink<T>> = getClosurePredicate(
    DirectConnectionDistance,
  ),
) {
  const filteredLinks = useMemo(
    () =>
      closureList.filter(closurePredicate).map((d) => ({
        ...d,
      })),
    [closurePredicate, closureList],
  );

  return { filteredLinks };
}
