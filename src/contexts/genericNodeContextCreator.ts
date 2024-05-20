import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
} from "react";
import { DataLink, DataNode, HasNumberId } from "../types";
import { LinkRefContext } from "./linkRefContextCreator";

export interface NodeContextInterface<T extends HasNumberId> {
  nodes: DataNode<T>[];
}

export const NodeContext = createContext<NodeContextInterface<any> | undefined>(
  undefined,
);

export const NodeDispatchContext = createContext<
  Dispatch<SetStateAction<DataNode<any>[]>> | undefined
>(undefined);
