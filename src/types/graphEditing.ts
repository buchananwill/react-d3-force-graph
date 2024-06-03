import { Context, Dispatch, SetStateAction } from "react";
import { DataLink, DataNode, HasNumberId } from "./util";

export type Relation = "sibling" | "child";

export interface AddNodesParams {
  sourceNodeIdList: string[];
  relation: Relation;
}

export type EditNodeDispatchContext<T extends HasNumberId> = Context<
  Dispatch<SetStateAction<DataNode<T>[]>> | undefined
>;
export type EditLinkDispatchContext<T extends HasNumberId> = Context<
  Dispatch<SetStateAction<DataLink<T>[]>> | undefined
>;
