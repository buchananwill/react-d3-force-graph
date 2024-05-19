// Generic hook to use the context
import { DataLink, HasNumberId } from "@/graph-tools";
import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  LinkContext,
  LinkContextInterface,
  LinkDispatchContext,
} from "@/graph-tools/contexts/genericLinkContextCreator";

export function useLinkContext<T extends HasNumberId>() {
  const context = useContext(
    LinkContext as React.Context<LinkContextInterface<T> | undefined>,
  );
  const dispatch = useContext(
    LinkDispatchContext as React.Context<
      Dispatch<SetStateAction<DataLink<T>[]>> | undefined
    >,
  );

  if (context === undefined || dispatch === undefined) {
    throw new Error("useGenericArrayContext must be used within a Provider");
  }

  return { ...context, dispatch };
}
