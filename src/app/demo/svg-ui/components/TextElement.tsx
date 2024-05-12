import {DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import NodeText from "@/app/demo/svg-ui/components/NodeText";
import {TextPositions} from "@/app/demo/svg-ui/hooks/useTextElements";
import {OrganizationDto} from "@/app/demo/types/OrganizationDto";
import {useNodeContext} from "@/graph-tools/contexts/genericNodeContextCreator";

import {useGraphRefs} from "@/graph-tools/hooks/useGraphRefs";

export interface TextPosition {
    plate: { x: number; y: number };
    text: { x: number; y: number };
    title: { x: number; y: number };
}

export function TextElement({
                                                       n
                                                   }: {
    n: DataNode<any>;
}) {
    const {plate, title: titlePos, text: textPos} = TextPositions['center']
    const {nodes} = useNodeContext<OrganizationDto>();
    const {currentState: textSizeMultiplier} =
        useGraphListener(
            'text-size',
            `${n.id}:text-element`,
            1
        );

    if (n.index === undefined || n.index === null) return null

    const node = nodes[n.index];

    const text = node.data.name
    const title = node.data.type.name



    const textScale = textSizeMultiplier
        ? Math.sqrt(textSizeMultiplier) / 4 + 0.5
        : 1;

    return (
            <g>
                <circle {...plate} r={24} className={'fill-white opacity-50'}></circle>
                {n.distanceFromRoot == 0 ? (
                    <text
                        {...titlePos}
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
                    {...textPos}
                    dy=".3em"
                    textAnchor="middle"
                    fontWeight={'bold'}
                    transform={`scale(${textScale})`}
                >
                    {text}
                </text>
            </g>

    );
}