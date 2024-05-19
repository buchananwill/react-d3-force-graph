import { useEffect, useRef } from "react";
import { HasNumberId } from "@/graph-tools/types/util";
import { useGraphDispatch } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { useNodeContext } from "@/graph-tools/hooks/useNodeContext";
import { useLinkContext } from "@/graph-tools/hooks/useLinkContext";

export function useSyncRefVersionToNodeAndLinkContext<T extends HasNumberId>() {
  const { nodes } = useNodeContext<T>();
  const { links } = useLinkContext<T>();
  const nodesRef = useRef(nodes);
  const linksRef = useRef(links);
  const { dispatchWithoutListen } = useGraphDispatch<number>("version");

  useEffect(() => {
    nodesRef.current = nodes.map((n) => ({ ...n }));
    linksRef.current = links.map((l) => ({ ...l }));
    dispatchWithoutListen((version) => {
      return version + 1;
    });
  }, [nodes, links, dispatchWithoutListen]);
  return { nodes, links, nodesRef, linksRef };
}
