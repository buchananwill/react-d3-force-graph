import {DataLink, DataNode, FlowNode, HasId, HasNumberId} from "@/graph-tools/types/types";
import {Edge, Node} from "reactflow";

const nodeType = 'default'

function getAnyIdAsString(entity: HasId) {
    return `${entity.id}`;
}

export function convertToReactFlowNode(dataNode: DataNode<any>): FlowNode {
    const stringId = getAnyIdAsString(dataNode);
    const x = dataNode.x || 0
    const y = dataNode.y || 0;
    const position = {x, y: y}
    return {...dataNode, id: stringId, position, type: nodeType, x, y }
}

export function convertToReactFlowEdge(dataLink: DataLink<any>): Edge {

    const stringId = getAnyIdAsString(dataLink)
    const sourceId = getStringIdFromConnection(dataLink.source)
    const targetId = getStringIdFromConnection(dataLink.target)

    return {...dataLink, target: targetId, source: sourceId, id: stringId}

}

export function getStringIdFromConnection(connection: number| string | DataNode<any>) {
    if (typeof connection === 'object')
        return getAnyIdAsString(connection)
    else
        return `${connection}`
}

export function convertDataNodeListToNodeList(list: DataNode<any>[]) {
    return list.map(n => convertToReactFlowNode(n))
}

export function convertDataLinkListToEdgeList(list: DataLink<any>[]) {
    return list.map(l => convertToReactFlowEdge(l))
}
