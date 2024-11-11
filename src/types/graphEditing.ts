import { Context } from "react";
import { DataLink, DataNode, DispatchState, HasNumberId } from "./util";

export type Relation = "sibling" | "child";

export interface AddNodesParams {
  sourceNodeIdList: string[];
  relation: Relation;
}

export type EditNodeDispatchContext<T extends HasNumberId> = Context<
  DispatchState<DataNode<T>[]> | undefined
>;
export type EditLinkDispatchContext<T extends HasNumberId> = Context<
  DispatchState<DataLink<T>[]> | undefined
>;
