import {
  DataLink,
  DataNode,
  DirectSimRefEditsDispatchReturn,
  HasNumberId,
  useD3ForceSimulationMemo,
  useDirectSimRefEditsDispatch,
} from "../../src";
import React, { MutableRefObject, useRef } from "react";
import { Organization } from "./adaptors";
import { Simulation } from "d3";

export interface CallbackData<T extends HasNumberId> {
  listenerKey: MutableRefObject<`${string}-${string}-${string}-${string}-${string}`>;
  simRefFromMemo: MutableRefObject<Simulation<DataNode<T>, DataLink<T>> | null>;
  dispatchReturn: DirectSimRefEditsDispatchReturn<T>;
}

export interface ForceClientProps<T extends HasNumberId> {
  callback: (data: CallbackData<T>) => void;
}

export default function ForceClient({
  callback,
}: ForceClientProps<Organization>) {
  const listenerKey = useRef(crypto.randomUUID());
  const [simRefFromMemo] = useD3ForceSimulationMemo<Organization>();
  const dispatchReturn = useDirectSimRefEditsDispatch<Organization>(
    listenerKey.current,
  );
  callback({ listenerKey, dispatchReturn, simRefFromMemo });

  return <div></div>;
}
