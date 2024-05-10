import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {Edge, Node} from "reactflow";

const nodeType = 'default'

function getNumberIdAsString(entity: HasNumberId) {
    return `${entity.id}`;
}

export function convertToReactFlowNode(dataNode: DataNode<any>): Node {
    const stringId = getNumberIdAsString(dataNode);
    const position = {x: dataNode.x || 0, y: dataNode.y || 0}
    return {...dataNode, id: stringId, position, type: nodeType}
}

export function convertToReactFlowEdge(dataLink: DataLink<any>): Edge {

    const stringId = getNumberIdAsString(dataLink)
    const sourceId = getStringIdFromConnection(dataLink.source)
    const targetId = getStringIdFromConnection(dataLink.target)

    return {...dataLink, target: targetId, source: sourceId, id: stringId}

}

export function getStringIdFromConnection(connection: number | DataNode<any>) {
    if (typeof connection === 'number') return `${connection}`
    else return getNumberIdAsString(connection)
}

export function convertDataNodeListToNodeList(list: DataNode<any>[]) {
    return list.map(n => convertToReactFlowNode(n))
}

export function convertDataLinkListToEdgeList(list: DataLink<any>[]) {
    return list.map(l => convertToReactFlowEdge(l))
}
