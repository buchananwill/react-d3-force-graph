import {HasNumberId} from "@/graph-tools/types/types";
import {useGenericGraphRefs, useGenericNodeContext} from "@/graph-tools/nodes/genericNodeContextCreator";
import {useMemo} from "react";
import {useGraphController} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {useGenericLinkContext} from "@/graph-tools/links/genericLinkContextCreator";

const EditController = 'edit-controller'

export function useDirectSimRefEditsController<T extends HasNumberId>() {
    useGenericNodeContext()
    useGenericLinkContext()

    const {dispatch} =
        useGraphController<number>(
            'version',
            EditController,
            0
        );



    const incrementSimVersion = () => {
        dispatch(version => version + 1);
    };
    const {nodeListRef, linkListRef} = useGenericGraphRefs<T>();
    return {incrementSimVersion, nodeListRef, linkListRef};
}