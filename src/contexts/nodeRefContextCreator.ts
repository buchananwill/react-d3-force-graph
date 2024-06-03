import { createContext, MutableRefObject } from "react";
import { DataNode, HasNumberId } from "../types";

export const NodeRefContext = createContext<MutableRefObject<
  DataNode<HasNumberId>[]
> | null>(null);
