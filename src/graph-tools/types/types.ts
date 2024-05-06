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

export interface GraphDto<T extends HasNumberId> {
    nodes: DataNode<T>[];
    closureDtos: ClosureDto[];
}

export interface CachedFunction<T, U> {
    cachedFunction: (param: T) => U
}