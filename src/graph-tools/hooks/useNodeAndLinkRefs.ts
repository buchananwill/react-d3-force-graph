import {useNodeContext} from '../nodes/genericNodeContextCreator';
import {useLinkContext} from '../links/genericLinkContextCreator';
import {useEffect, useRef} from 'react';
import {HasNumberId} from "@/graph-tools/types/types";
import {useGraphDispatch} from "@/graph-tools/hooks/useGraphSelectiveContext";

export function useNodeAndLinkRefs<T extends HasNumberId>() {
  const { nodes } = useNodeContext<T>();
  const { links } = useLinkContext<T>();
  const nodesRef = useRef(nodes);
  const linksRef = useRef(links);
  const {dispatchWithoutListen} = useGraphDispatch<number>('version');

  useEffect(() => {
    console.log('Setting nodesRef', nodes, nodesRef)
    nodesRef.current = nodes.map(n => ({...n}));
    linksRef.current = links.map(l => ({...l}));
    dispatchWithoutListen(version => {
      return version + 1
    });
  }, [nodes, links, dispatchWithoutListen]);
  return { nodes, nodesRef, linksRef };
}
