import { DataLink, DataNode, HasNumberId } from "@/graph-tools/types/types";
import { NodeDispatchContext } from "@/graph-tools/contexts/genericNodeContextCreator";
import { LinkDispatchContext } from "@/graph-tools/contexts/genericLinkContextCreator";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import {
  useGraphDispatch,
  useGraphListener,
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import { resetLinks } from "@/graph-tools/editing/functions/resetLinks";
import { Simulation } from "d3";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";

import { useGraphRefs } from "@/graph-tools/hooks/useGraphRefs";

export function useDirectSimRefEditsDispatch<T extends HasNumberId>(
  listenerKey: string,
) {
  // const listenerKey = useMemo(() => {
  //   return crypto.randomUUID();
  // }, []);

  const updateNodes = useContext<
    Dispatch<SetStateAction<DataNode<T>[]>> | undefined
  >(NodeDispatchContext);
  const updateLinks = useContext<
    Dispatch<SetStateAction<DataLink<T>[]>> | undefined
  >(LinkDispatchContext);

  const { dispatchWithoutListen: dispatchUnsavedGraph } =
    useGraphDispatch<boolean>("unsaved-node-data");
  useGraphDispatch(GraphSelectiveContextKeys.running);

  useGraphListener<number>("version", listenerKey, 0);

  const { nodeListRef, linkListRef } = useGraphRefs<T>();
  const { currentState: simRef } = useGraphListener<MutableRefObject<
    Simulation<any, any>
  > | null>(GraphSelectiveContextKeys.sim, listenerKey, null);
  const dispatchNextSimVersion = useMemo(() => {
    return (updatedNodes: DataNode<any>[], updatedLinks: DataLink<any>[]) => {
      if (updateNodes && updateLinks) {
        const resetLinksWithIdNotReferences = resetLinks(updatedLinks);
        console.log(resetLinksWithIdNotReferences);
        updateNodes(updatedNodes);
        updateLinks(resetLinksWithIdNotReferences);
        dispatchUnsavedGraph(true);
      }
    };
  }, [dispatchUnsavedGraph, updateLinks, updateNodes]);
  return { dispatchNextSimVersion, nodeListRef, linkListRef, simRef };
}
