import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  NodeContext,
  NodeContextInterface,
  NodeDispatchContext,
} from "@/graph-tools/contexts/genericNodeContextCreator";
import { DataNode, HasNumberId } from "@/graph-tools";

export function useNodeContext<T extends HasNumberId>() {
  const context = useContext(
    NodeContext as React.Context<NodeContextInterface<T> | undefined>,
  );
  const dispatch = useContext(
    NodeDispatchContext as React.Context<
      Dispatch<SetStateAction<DataNode<T>[]>> | undefined
    >,
  );

  if (context === undefined || dispatch === undefined) {
    throw new Error("useGenericArrayContext must be used within a Provider");
  }

  return { ...context, dispatch };
}
