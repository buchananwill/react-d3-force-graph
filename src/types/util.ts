import { Simulation, SimulationLinkDatum, SimulationNodeDatum } from "d3";
import React, { MutableRefObject } from "react";

export type DataNode<T extends HasNumberId> = SimulationNodeDatum & {
  id: string;
  distanceFromRoot: number;
  data: T;
};

export interface DataNodeDto<T extends HasNumberId> {
  id: number;
  distanceFromRoot: number;
  data: T;
}

export type DataLink<T extends HasNumberId> = SimulationLinkDatum<DataNode<T>> &
  Omit<ClosureDto, "id" | "source" | "target"> &
  HasStringId;

export interface ClosureDto extends HasNumberId {
  closureType: string;
  source: number;
  target: number;
  value: number;
  weighting: number;
}

export interface HasNumberId {
  id: number;
}
export interface HasStringId {
  id: string;
}

export type HasId = HasNumberId | HasStringId;

export interface HasName {
  name: string;
}

export interface GraphDto<T extends HasNumberId> {
  nodes: DataNodeDto<T>[];
  closureDtos: ClosureDto[];
}

export interface MemoizedFunction<T, U> {
  memoizedFunction: (param: T) => U;
}

export interface MemoizedSupplier<T> {
  get: () => T;
}

export type Predicate<T> = (arg: T) => boolean;

export type CloneFunction<T extends HasId> = (object: T) => T;

export interface GraphDtoPutRequestBody<T extends HasNumberId> {
  graphDto: GraphDto<T>;
  deletedNodeIdList: number[];
  deletedClosureIdList: number[];
}
export interface NodeModalContentProps {
  onClose: () => void;
}

export type NodeModalContentComponent = MemoizedFunction<
  NodeModalContentProps,
  React.JSX.Element
>;

export interface AddLinksParams {
  nodeIdList: string[];
}

export interface DirectSimRefEditsDispatchReturn<T extends HasNumberId> {
  dispatchNextSimVersion: (
    updatedNodes: DataNode<T>[],
    updatedLinks: DataLink<T>[],
  ) => void;
  linkListRef: null | MutableRefObject<DataLink<T>[]>;
  nodeListRef: null | MutableRefObject<DataNode<T>[]>;
  simRef: null | MutableRefObject<Simulation<DataNode<T>, DataLink<T>>>;
}
