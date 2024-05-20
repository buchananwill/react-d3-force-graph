import { useMemo } from "react";
import { DataLink, Predicate } from "../types";

export function useFilteredLinkMemo(
  closureList: DataLink<any>[],
  closurePredicate: Predicate<DataLink<any>> = (c: DataLink<any>) =>
    c.value == 1,
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
