'use client';
import { PropsWithChildren } from 'react';
import {
  LeftCtrlListener,
  LeftShiftListener,
  SpaceListener
} from './keyListenerContextCreator';
import {
  useLeftCtrlHeldListener,
  useShiftHeldListener,
  useSpaceHeldListener
} from "@/graph-tools/hooks/useKeyHeldListener";


export default function KeyListenerManager({ children }: PropsWithChildren) {
  const spaceHeld = useSpaceHeldListener(); //useKeyHeldListener(' ', 'Space');

  const shiftHeld = useShiftHeldListener();

  const leftCtrlHeld = useLeftCtrlHeldListener();

  return (
    <SpaceListener.Provider value={spaceHeld}>
      <LeftShiftListener.Provider value={shiftHeld}>
        <LeftCtrlListener.Provider value={leftCtrlHeld}>
          {children}
        </LeftCtrlListener.Provider>
      </LeftShiftListener.Provider>
    </SpaceListener.Provider>
  );
}
