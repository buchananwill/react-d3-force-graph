import {SimulationLinkDatum, SimulationNodeDatum} from "d3";
import {Node, Edge } from 'reactflow'

export type FlowNode = Node & DataNode<any>

export type FlowEdge = Edge & Omit<DataLink<any>, 'id'> & HasStringId

export type DataNode<T extends HasNumberId> = SimulationNodeDatum & {
    id: string;
    distanceFromRoot: number;
    data: T;
};
export type DataLink<T extends HasNumberId> = SimulationLinkDatum<
    DataNode<T>
> &
    ClosureDto;

export interface ClosureDto extends HasStringId {
    closureType: string
    target: string
    source: string,
    value: number,
    weighting: number,
}

export interface HasNumberId {
    id: number
}
export interface HasStringId {
    id: string
}

export type HasId = HasNumberId | HasStringId

export interface HasName {
    name: string
}

export interface GraphDto<T extends HasNumberId> {
    nodes: DataNode<T>[];
    closureDtos: ClosureDto[];
}

export interface CachedFunction<T, U> {
    cachedFunction: (param: T) => U
}

export interface Predicate<T> {
    (arg: T): boolean
}



export interface CloneFunction<T extends HasNumberId> {
    (object: T): T;
}

export interface GraphDtoPutRequestBody<T extends HasNumberId> {
    graphDto: GraphDto<T>;
    deletedNodeIdList: number[];
    deletedClosureIdList: number[];
}

export interface NodeDetailsUiComponentProps<T extends HasNumberId> {
    node: DataNode<T>;
}