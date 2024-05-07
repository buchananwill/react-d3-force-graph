import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useLinkElements} from "@/graph-tools/aggregate-functions/useLinkElements";
import {useNodeElements} from "@/graph-tools/aggregate-functions/useNodeElements";
import {useTextElements} from "@/graph-tools/aggregate-functions/useTextElements";

export function useSvgElements<T extends HasNumberId>(
  nodes: DataNode<T>[],
  links: DataLink<T>[],
  textAccessor: (n: number) => string,
  titleAccessor: (n: number) => string
) {

  const linkElements = useLinkElements(links);
  const nodeElements = useNodeElements(nodes);
  const textElements = useTextElements(nodes, textAccessor, titleAccessor);
  return { nodeElements, linkElements, textElements };
}
