import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";


export function mapLinksBackToIdRefs<T extends HasNumberId>(l: DataLink<T>) {
  const objectRefSource = l.source as DataNode<T>;
  const objectRefTarget = l.target as DataNode<T>;
  return { ...l, source: objectRefSource.id, target: objectRefTarget.id };
}