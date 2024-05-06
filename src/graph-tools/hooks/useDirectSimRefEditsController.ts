import {HasNumberId} from "@/graph-tools/types/types";
import {useGenericGraphRefs, useGenericNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {useGenericLinkContext} from "@/graph-tools/links/genericLinkContextCreator";

const EditController = 'edit-controller'

export function useDirectSimRefEditsController<T extends HasNumberId>() {
    useGenericNodeContext()
    useGenericLinkContext()

    useGraphController<number>(
        'version',
        EditController,
        0
    );

    const {nodeListRef, linkListRef} = useGenericGraphRefs<T>();
    return {nodeListRef, linkListRef};
}