
import { useGenericNodeContext } from '../nodes/generic-node-context-creator';
import { useGenericLinkContext } from '../links/generic-link-context-creator';
import { useEffect, useRef } from 'react';
import {HasNumberId} from "@/graph-tools/types/types";

export function useNodeAndLinkRefs<T extends HasNumberId>() {
  const { nodes } = useGenericNodeContext<T>();
  const { links } = useGenericLinkContext<T>();
  const nodesRef = useRef(nodes);
  const linksRef = useRef(links);

  useEffect(() => {
    nodesRef.current = nodes;
    linksRef.current = links;
  }, [nodes, links]);
  return { nodes, nodesRef, linksRef };
}
