import {createContext, MutableRefObject} from "react";
import {DataLink} from "@/graph-tools/types/types";

export const LinkRefContext = createContext<MutableRefObject<
  DataLink<any>[]
> | null>(null);