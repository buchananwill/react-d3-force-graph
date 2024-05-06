import {DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import NodeText from "@/graph-tools/nodes/NodeText";

export interface TextPosition {
    plate: { x: number; y: number };
    text: { x: number; y: number };
    title: { x: number; y: number };
}

export function TextElement<T extends HasNumberId>({
                                                       n,
                                                       index,
                                                       text,
                                                       title,
                                                       textPosition: {plate, text: textPosition, title: titlePosition}
                                                   }: {
    n: DataNode<T>;
    index: number;
    text: string;
    title: string;
    textPosition: TextPosition;
}) {

    const {currentState: textSizeMultiplier} =
        useGraphListener(
            'text-size',
            `${n.id}-${text}`,
            1
        );

    const textScale = textSizeMultiplier
        ? Math.sqrt(textSizeMultiplier) / 4 + 0.5
        : 1;

    return (
        <NodeText key={`text-${n.id}`} textIndex={index}>
            <g>
                <circle {...plate} r={24} className={'fill-white opacity-50'}></circle>
                {n.distanceFromRoot == 0 ? (
                    <text
                        {...titlePosition}
                        textAnchor="middle"
                        fontSize={'12'}
                        transform={`scale(${textScale})`}
                    >
                        {title}
                    </text>
                ) : (
                    ''
                )}
                <text
                    {...textPosition}
                    dy=".3em"
                    textAnchor="middle"
                    fontWeight={'bold'}
                    transform={`scale(${textScale})`}
                >
                    {text}
                </text>
            </g>
        </NodeText>
    );
}