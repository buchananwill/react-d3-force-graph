import { useEffect, useRef } from "react";
import { DataLink, DataNode, HasNumberId } from "../types";
import { useGraphDispatch } from "./useGraphSelectiveContext";
import { useNodeContext } from "./useNodeContext";
import { useLinkContext } from "./useLinkContext";

export function useSyncRefVersionToNodeAndLinkContext<T extends HasNumberId>() {
  const { nodes } = useNodeContext<T>();
  const { links } = useLinkContext<T>();
  const nodesRef = useRef(nodes);
  const linksRef = useRef(links);
  const { dispatchWithoutListen } = useGraphDispatch<number>("version");

  useEffect(() => {
    nodesRef.current = nodes.map((n: DataNode<T>) => ({ ...n }));
    linksRef.current = links.map((l: DataLink<T>) => ({ ...l }));
    dispatchWithoutListen((version) => {
      return version + 1;
    });
  }, [nodes, links, dispatchWithoutListen]);
  return { nodes, links, nodesRef, linksRef };
}
