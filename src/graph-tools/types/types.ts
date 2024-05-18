/* eslint-disable no-unused-vars */
import { SimulationLinkDatum, SimulationNodeDatum } from "d3";
import { Node, Edge } from "reactflow";
import React from "react";

export type FlowNode = Node & DataNode<any>;

export type FlowEdge = Edge & DataLink<any>;

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

export interface Predicate<T> {
  (arg: T): boolean;
}

export interface CloneFunction<T extends HasId> {
  (object: T): T;
}

export interface GraphDtoPutRequestBody<T extends HasNumberId> {
  graphDto: GraphDto<T>;
  deletedNodeIdList: number[];
  deletedClosureIdList: number[];
}
export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
