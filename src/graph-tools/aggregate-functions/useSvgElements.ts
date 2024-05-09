import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useLinkElements} from "@/graph-tools/aggregate-functions/useLinkElements";
import {useNodeElements} from "@/graph-tools/aggregate-functions/useNodeElements";
import {useTextElements} from "@/graph-tools/aggregate-functions/useTextElements";

export function useSvgElements<T extends HasNumberId>(
    nodes: DataNode<T>[],
    links: DataLink<T>[]
) {

  const linkElements = useLinkElements(links);
  const nodeElements = useNodeElements(nodes);
  const textElements = useTextElements(nodes);
  return { nodeElements, linkElements, textElements };
}
