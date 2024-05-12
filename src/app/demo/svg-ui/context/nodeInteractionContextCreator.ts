import React, { createContext } from 'react';
import {
  NodeInteractionAction,
  NodeInteractionContextInterface
} from './NodeInteractionContext';

export const NodeInteractionContext =
  createContext<NodeInteractionContextInterface>({
    hover: null,
    selected: []
  });
export const DispatchContext = createContext<
  React.Dispatch<NodeInteractionAction>
>(() => {});
