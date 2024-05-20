'use client';
import React, { PropsWithChildren } from 'react';
import {
  AnimationSyncContext,
  createSineLut
} from '../../contexts/animationSyncContextCreator';

export default function AnimationSyncContextProvider({
  children
}: PropsWithChildren) {
  return (
    <AnimationSyncContext.Provider value={{ sineLut: createSineLut() }}>
      {children}
    </AnimationSyncContext.Provider>
  );
}
