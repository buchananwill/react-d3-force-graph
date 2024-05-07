import {HasNumberId} from "@/graph-tools/types/types";
import {useGraphRefs, useNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {useLinkContext} from "@/graph-tools/links/genericLinkContextCreator";

const EditController = 'edit-controller'

export function useDirectSimRefEditsController<T extends HasNumberId>() {
    useNodeContext()
    useLinkContext()

    useGraphController<number>(
        'version',
        EditController,
        0
    );

    const {nodeListRef, linkListRef} = useGraphRefs<T>();
    return {nodeListRef, linkListRef};
}