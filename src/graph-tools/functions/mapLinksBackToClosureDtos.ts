import { DataLink, DataNode, HasNumberId } from "@/graph-tools/types/types";
import { getNumberFromStringId } from "@/react-flow/utils/adaptors";

export function mapLinksBackToClosureDtos<T extends HasNumberId>(
  l: DataLink<T>,
) {
  const objectRefSource = l.source as DataNode<T>;
  const objectRefTarget = l.target as DataNode<T>;
  return {
    ...l,
    source: getNumberFromStringId(objectRefSource.id),
    target: getNumberFromStringId(objectRefTarget.id),
    id: getNumberFromStringId(l.id),
  };
}
