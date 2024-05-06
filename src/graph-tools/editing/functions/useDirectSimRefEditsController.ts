import {HasNumberId} from "@/graph-tools/types/types";
import {useGenericGraphRefs, useGenericNodeContext} from "@/graph-tools/nodes/generic-node-context-creator";
import {useMemo} from "react";
import {useGraphController} from "@/graph-tools/graph/useGraphSelectiveContext";

const EditController = 'edit-controller'

export function useDirectSimRefEditsController<T extends HasNumberId>() {
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