import { createContext, Dispatch, SetStateAction } from "react";
import { DataLink, HasNumberId } from "../types";

// Define the interface as generic
export interface LinkContextInterface<T extends HasNumberId> {
  links: DataLink<T>[];
}

// Create a generic context with a default value
export const LinkContext = createContext<
  LinkContextInterface<HasNumberId> | undefined
>(undefined);

export const LinkDispatchContext = createContext<
  Dispatch<SetStateAction<DataLink<HasNumberId>[]>> | undefined
>(undefined);
