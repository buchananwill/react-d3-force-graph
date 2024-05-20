'use client';

import React, {PropsWithChildren} from 'react';
import {GraphContext} from "../../contexts/graphContextCreator";

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
