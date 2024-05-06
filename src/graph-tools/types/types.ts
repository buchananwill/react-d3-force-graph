import {SimulationLinkDatum, SimulationNodeDatum} from "d3";

export type DataNode<T extends HasNumberId> = SimulationNodeDatum & {
    id: number;
    distanceFromRoot: number;
    data: T;
};
export type DataLink<T extends HasNumberId> = SimulationLinkDatum<
    DataNode<T>
> &
    ClosureDto;

export interface ClosureDto extends HasNumberId {
    closureType: string
    target: number
    source: number,
    value: number,
    weighting: number,
}

export interface HasNumberId {
    id: number
}

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