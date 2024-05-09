import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useLinkElements} from "@/graph-tools/aggregate-functions/useLinkElements";
import {useNodeElements} from "@/graph-tools/aggregate-functions/useNodeElements";
import {useTextElements} from "@/graph-tools/aggregate-functions/useTextElements";
import {GraphSelectiveKeys, useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";

export function useSvgElements<T extends HasNumberId>(
    nodes: DataNode<T>[],
    links: DataLink<T>[]
) {

  useGraphListener(GraphSelectiveKeys.version, 'svg-render-monkey', 0)

  const linkElements = useLinkElements(links);
  const nodeElements = useNodeElements(nodes);
  const textElements = useTextElements(nodes);
  return { nodeElements, linkElements, textElements };
}
