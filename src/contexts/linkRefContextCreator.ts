import { createContext, MutableRefObject } from "react";
import { DataLink } from "../types";

export const LinkRefContext = createContext<MutableRefObject<
  DataLink<any>[]
> | null>(null);
