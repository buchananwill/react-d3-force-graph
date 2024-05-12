'use client';

import {PropsWithChildren} from 'react';
import {GraphContext} from '@/graph-tools/contexts/graphContextCreator';

export default function GraphContextProvider({
  children,
  uniqueGraphName
}: PropsWithChildren & { uniqueGraphName: string }) {
  return (
    <GraphContext.Provider value={{ uniqueGraphName }}>

        {children}

    </GraphContext.Provider>
  );
}
