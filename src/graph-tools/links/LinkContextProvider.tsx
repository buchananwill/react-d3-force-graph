'use client';

import React from 'react';
import {
  LinkContext,
  LinkDispatchContext
} from './genericLinkContextCreator';

import { useFilteredLinkMemo } from '../aggregate-functions/useFilteredLinkMemo';

import { useGraphName } from '../graph/graphContextCreator';
import {DataLink, HasNumberId} from "@/graph-tools/types/types";

// Example of a generic Provider component that can be used to wrap parts of your app
export const LinkContextProvider = <T extends HasNumberId>({
  children,
  links
}: {
  children: React.ReactNode;
  links: DataLink<T>[];
}) => {
  const { filteredLinks } = useFilteredLinkMemo(
    links,
    (closure) => closure.value == 1
  );
  const uniqueGraphName = useGraphName();

  const [linkState, setLinkState] =
    React.useState<DataLink<T>[]>(filteredLinks);

  return (
    <LinkContext.Provider value={{ links: linkState, uniqueGraphName }}>
      <LinkDispatchContext.Provider value={setLinkState}>
        {children}
      </LinkDispatchContext.Provider>
    </LinkContext.Provider>
  );
};
