
import { useMemo } from 'react';
import {ClosureDto, Predicate} from "@/graph-tools/types/types";


export function useFilteredLinkMemo(
  closureList: ClosureDto[],
  closurePredicate: Predicate<ClosureDto> = (c: ClosureDto) => c.value == 1
) {
  const filteredLinks = useMemo(
    () =>
      closureList
          .filter(closurePredicate)
          .map((d) => ({
        ...d
      })),
    [closurePredicate, closureList]
  );

  return { filteredLinks };
}
