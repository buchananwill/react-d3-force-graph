
import { useGenericNodeContext } from '../nodes/genericNodeContextCreator';
import { useGenericLinkContext } from '../links/genericLinkContextCreator';
import { useEffect, useRef } from 'react';
import {HasNumberId} from "@/graph-tools/types/types";
import {useGraphDispatch} from "@/graph-tools/hooks/useGraphSelectiveContext";

export function useNodeAndLinkRefs<T extends HasNumberId>() {
  const { nodes } = useGenericNodeContext<T>();
  const { links } = useGenericLinkContext<T>();
  const nodesRef = useRef(nodes);
  const linksRef = useRef(links);
  const {dispatchWithoutListen} = useGraphDispatch<number>('version');

  useEffect(() => {
    nodesRef.current = nodes;
    linksRef.current = links;
    dispatchWithoutListen(version => {
      return version + 1
    });
  }, [nodes, links, dispatchWithoutListen]);
  return { nodes, nodesRef, linksRef };
}
