import { useMemo } from "react";
import { DataLink, HasNumberId, Predicate } from "../types";

export function useFilteredLinkMemo<T extends HasNumberId>(
  closureList: DataLink<T>[],
  closurePredicate: Predicate<DataLink<T>> = (c: DataLink<T>) => c.value == 1,
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
