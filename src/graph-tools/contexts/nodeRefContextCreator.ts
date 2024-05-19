import { createContext, MutableRefObject } from "react";
import { DataNode } from "@/graph-tools/types/util";

export const NodeRefContext = createContext<MutableRefObject<
  DataNode<any>[]
> | null>(null);
