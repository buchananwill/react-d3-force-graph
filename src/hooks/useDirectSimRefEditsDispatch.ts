import {
  DataLink,
  DataNode,
  DirectSimRefEditsDispatchReturn,
  EditLinkDispatchContext,
  EditNodeDispatchContext,
  HasNumberId,
} from "../types";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { useGraphDispatch, useGraphListener } from "./useGraphSelectiveContext";

import { Simulation } from "d3";
import { GraphSelectiveContextKeys } from "../literals";

import { useGraphRefs } from "./useGraphRefs";
import { NodeDispatchContext } from "../contexts/genericNodeContextCreator";
import { LinkDispatchContext } from "../contexts/genericLinkContextCreator";
import { resetLinks } from "../editing/functions/resetLinks";

export function useDirectSimRefEditsDispatch<T extends HasNumberId>(
  listenerKey: string,
): DirectSimRefEditsDispatchReturn<T> {
  const updateNodes = useContext<
    Dispatch<SetStateAction<DataNode<T>[]>> | undefined
  >(NodeDispatchContext as EditNodeDispatchContext<T>);
  const updateLinks = useContext<
    Dispatch<SetStateAction<DataLink<T>[]>> | undefined
  >(LinkDispatchContext as EditLinkDispatchContext<T>);

  const { dispatchWithoutListen: dispatchUnsavedGraph } =
    useGraphDispatch<boolean>("unsaved-node-data");
  useGraphDispatch(GraphSelectiveContextKeys.running);

  useGraphListener<number>("version", listenerKey, 0);

  const { nodeListRef, linkListRef } = useGraphRefs<T>();
  const { currentState: simRef } = useGraphListener<MutableRefObject<
    Simulation<DataNode<T>, DataLink<T>>
  > | null>(GraphSelectiveContextKeys.sim, listenerKey, null);
  const dispatchNextSimVersion = useMemo(() => {
    return (updatedNodes: DataNode<T>[], updatedLinks: DataLink<T>[]) => {
      if (updateNodes && updateLinks) {
        const resetLinksWithIdNotReferences = resetLinks(updatedLinks);
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
