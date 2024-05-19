import { createContext, Dispatch, SetStateAction } from "react";
import { DataLink, HasNumberId } from "@/graph-tools/types/util";

// Define the interface as generic
export interface LinkContextInterface<T extends HasNumberId> {
  links: DataLink<T>[];
}

// Create a generic context with a default value
export const LinkContext = createContext<LinkContextInterface<any> | undefined>(
  undefined,
);

export const LinkDispatchContext = createContext<
  Dispatch<SetStateAction<DataLink<any>[]>> | undefined
>(undefined);
