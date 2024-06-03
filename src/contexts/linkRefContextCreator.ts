import { createContext, MutableRefObject } from "react";
import { DataLink, HasNumberId } from "../types";

export const LinkRefContext = createContext<MutableRefObject<
  DataLink<HasNumberId>[]
> | null>(null);
