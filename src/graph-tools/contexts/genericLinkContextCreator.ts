import React, {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {DataLink, HasNumberId} from "@/graph-tools/types/types";


// Define the interface as generic
export interface LinkContextInterface<T extends HasNumberId> {
  links: DataLink<T>[];
}

// Create a generic context with a default value
export const LinkContext = createContext<
  LinkContextInterface<any> | undefined
>(undefined);

export const LinkDispatchContext = createContext<
  Dispatch<SetStateAction<DataLink<any>[]>> | undefined
>(undefined);

// Generic hook to use the context
export function useLinkContext<T extends HasNumberId>() {
  const context = useContext(
    LinkContext as React.Context<
      LinkContextInterface<T> | undefined
    >
  );
  const dispatch = useContext(
    LinkDispatchContext as React.Context<
      Dispatch<SetStateAction<DataLink<T>[]>> | undefined
    >
  );

  if (context === undefined || dispatch === undefined) {
    throw new Error('useGenericArrayContext must be used within a Provider');
  }

  return { ...context, dispatch };
}


