"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  LinkContext,
  LinkDispatchContext,
} from "../../contexts/genericLinkContextCreator";

import { useFilteredLinkMemo } from "../../functions/useFilteredLinkMemo";
import { DataLink, HasNumberId } from "../../types";

// Example of a generic Provider component that can be used to wrap parts of your app
export const LinkContextProvider = <T extends HasNumberId>({
  children,
  links,
}: {
  children: React.ReactNode;
  links: DataLink<T>[];
}) => {
  const { filteredLinks } = useFilteredLinkMemo(links);

  const [linkState, setLinkState] =
    React.useState<DataLink<T>[]>(filteredLinks);

  return (
    <LinkContext.Provider value={{ links: linkState }}>
      <LinkDispatchContext.Provider
        value={
          setLinkState as Dispatch<SetStateAction<DataLink<HasNumberId>[]>>
        }
      >
        {children}
      </LinkDispatchContext.Provider>
    </LinkContext.Provider>
  );
};
