'use client';

import { PropsWithChildren } from 'react';
import { GraphContext } from './graphContextCreator';
import { RootSvgContext } from '../rootSvgContextCreator';

export default function GraphContextProvider({
  children,
  uniqueGraphName
}: PropsWithChildren & { uniqueGraphName: string }) {
  return (
    <GraphContext.Provider value={{ uniqueGraphName }}>
      <RootSvgContext.Provider value={uniqueGraphName}>
        {children}
      </RootSvgContext.Provider>
    </GraphContext.Provider>
  );
}
