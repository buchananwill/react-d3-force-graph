import { DataLink, DataNode, HasNumberId } from "../types";
import React, { useContext } from "react";
import { NodeRefContext } from "../contexts/nodeRefContextCreator";
import { LinkRefContext } from "../contexts/linkRefContextCreator";


export function useGraphRefs<T extends HasNumberId>() {
  const nodeListRef = useContext(
    NodeRefContext as React.Context<React.MutableRefObject<
      DataNode<T>[]
    > | null>,
  );
  const linkListRef = useContext(
    LinkRefContext as React.Context<React.MutableRefObject<
      DataLink<T>[]
    > | null>,
  );
  return { nodeListRef, linkListRef };
}
