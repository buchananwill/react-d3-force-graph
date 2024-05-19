import { Edge, Node } from "reactflow";
import { DataLink, DataNode } from "@/graph-tools/types/util";

export type FlowNode = Node & DataNode<any>;
export type FlowEdge = Edge & DataLink<any>;
