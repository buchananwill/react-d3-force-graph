import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {EmptyArray, TransientIdOffset} from "@/graph-tools/literals/constants";
import {useNodeContext} from "@/graph-tools/contexts/genericNodeContextCreator";
import {useLinkContext} from "@/graph-tools/contexts/genericLinkContextCreator";
import {HasNumberId} from "@/graph-tools/types/types";

import {useGraphRefs} from "@/graph-tools/hooks/useGraphRefs";

const listenerKey = 'graph-edit-controller-key';
const dimensionsStaticArray: number[] = [1800, 1200];

export function useGraphEditController() {

    useGraphController('next-link-id', listenerKey, TransientIdOffset);
    useGraphController('next-node-id', listenerKey, TransientIdOffset);
    useGraphController<number[]>('transient-link-ids', listenerKey, EmptyArray);
    useGraphController('transient-node-ids', listenerKey, EmptyArray);
    useGraphController('deleted-link-ids', listenerKey, EmptyArray);
    useGraphController('deleted-node-ids', listenerKey, EmptyArray);
    useGraphController('dimensions', listenerKey, dimensionsStaticArray);
    useGraphController<number>('version', listenerKey, 0);

    useNodeContext()
    useLinkContext()
    useGraphRefs<HasNumberId>();


}

