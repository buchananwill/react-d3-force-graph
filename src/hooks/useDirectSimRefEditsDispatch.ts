import { DataLink, DataNode, HasNumberId } from "../types";

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
} from "./useGraphSelectiveContext";

import { Simulation } from "d3";
import { GraphSelectiveContextKeys } from "../literals";

import { useGraphRefs } from "./useGraphRefs";
import { NodeDispatchContext } from "../contexts/genericNodeContextCreator";
import { LinkDispatchContext } from "../contexts/genericLinkContextCreator";
import { resetLinks } from "../editing/functions/resetLinks";


export function useDirectSimRefEditsDispatch<T extends HasNumberId>(
  listenerKey: string,
) {
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
        updateNodes(
          updatedNodes.map((n) => ({ ...n, position: { x: n.x, y: n.y } })),
        );
        updateLinks(resetLinksWithIdNotReferences);
        dispatchUnsavedGraph(true);
      }
    };
  }, [dispatchUnsavedGraph, updateLinks, updateNodes]);
  return { dispatchNextSimVersion, nodeListRef, linkListRef, simRef };
}
