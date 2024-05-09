import {DataNode, HasNumberId} from "@/graph-tools/types/types";
import {TextElement} from "@/graph-tools/aggregate-functions/TextElement";
import {useMemo} from "react";
import NodeText from "@/graph-tools/nodes/NodeText";

export const TextPositions = {
    top: {
        plate: {x: -50, y: -45},
        text: {x: 0, y: -30},
        title: {x: 0, y: -50}
    },
    bottom: {
        plate: {x: 50, y: 45},
        text: {x: 0, y: 30},
        title: {x: 0, y: 50}
    },
    left: {
        plate: {x: -120, y: -15},
        text: {x: -50, y: 0},
        title: {x: -50, y: -20}
    },
    right: {
        plate: {x: 120, y: 0},
        text: {x: 50, y: 0},
        title: {x: 50, y: -20}
    },
    center: {
        plate: {x: 0, y: 0},
        text: {x: 0, y: 0},
        title: {x: -50, y: -20}
    }
};

export type TextPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

export function useTextElements<T extends HasNumberId>(
    nodes: DataNode<T>[]
) {



    return useMemo(() =>
            nodes.map((n, index) => (
                <NodeText key={`text-${n.id}`} nodeIndex={index}>
                <TextElement
                    key={`${index}-${n.id}`}
                    n={n}
                />
                </NodeText>
            ))
        , [nodes]);
}

