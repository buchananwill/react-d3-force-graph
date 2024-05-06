
import { SimulationLinkDatum } from 'd3';
import {ClosureDto, DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";


export function resetLinks<T extends HasNumberId>(
  allUpdatedLinks: DataLink<T>[]
): (SimulationLinkDatum<DataNode<T>> & ClosureDto)[] {
  const resetLinks =  [...allUpdatedLinks].map((link, index) => {
    const source = link.source as DataNode<T>;
    const target = link.target as DataNode<T>;
    const resetLink = { ...link, source: source.id, target: target.id, index };
    console.log('reset link', resetLink)
    return resetLink
  });
  console.log('in the reset function:', resetLinks)
  return resetLinks
}