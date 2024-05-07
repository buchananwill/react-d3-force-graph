import {SimulationLinkDatum} from 'd3';
import {ClosureDto, DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";


export function resetLinks<T extends HasNumberId>(
  allUpdatedLinks: DataLink<T>[]
): (SimulationLinkDatum<DataNode<T>> & ClosureDto)[] {
  return [...allUpdatedLinks].map((link, index) => {
    const source = link.source as DataNode<T>;
    const target = link.target as DataNode<T>;
    return {...link, source: source.id, target: target.id, index}
  })
}