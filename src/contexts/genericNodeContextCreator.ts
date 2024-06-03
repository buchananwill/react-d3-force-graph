import { createContext, Dispatch, SetStateAction } from "react";
import { DataNode, HasNumberId } from "../types";

export interface NodeContextInterface<T extends HasNumberId> {
  nodes: DataNode<T>[];
}

export const NodeContext = createContext<
  NodeContextInterface<HasNumberId> | undefined
>(undefined);

export const NodeDispatchContext = createContext<
  Dispatch<SetStateAction<DataNode<HasNumberId>[]>> | undefined
>(undefined);
