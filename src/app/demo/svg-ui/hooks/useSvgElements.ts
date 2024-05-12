import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useLinkElements} from "@/app/demo/svg-ui/hooks/useLinkElements";
import {useNodeElements} from "@/app/demo/svg-ui/hooks/useNodeElements";
import {useTextElements} from "@/app/demo/svg-ui/hooks/useTextElements";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {GraphSelectiveContextKeys} from "@/graph-tools/hooks/graphSelectiveContextKeys";

export function useSvgElements<T extends HasNumberId>(
    nodes: DataNode<T>[],
    links: DataLink<T>[]
) {

  useGraphListener(GraphSelectiveContextKeys.version, 'svg-render-monkey', 0)

  const linkElements = useLinkElements(links);
  const nodeElements = useNodeElements(nodes);
  const textElements = useTextElements(nodes);
  return { nodeElements, linkElements, textElements };
}
