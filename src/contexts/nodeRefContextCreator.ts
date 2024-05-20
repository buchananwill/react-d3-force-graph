import { createContext, MutableRefObject } from "react";
import { DataNode } from "../types";

export const NodeRefContext = createContext<MutableRefObject<
  DataNode<any>[]
> | null>(null);
