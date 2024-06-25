import { DataLink, HasNumberId } from "../types";

import { getNumberFromStringId } from "./utils";
import { getIdFromLinkReference } from "../editing/functions/resetLinks";

export function mapLinkBackToClosureDto<T extends HasNumberId>(l: DataLink<T>) {
  const source = getNumberFromStringId(getIdFromLinkReference(l.source));
  const target = getNumberFromStringId(getIdFromLinkReference(l.target));
  return {
    ...l,
    source,
    target,
    id: getNumberFromStringId(l.id),
  };
}
