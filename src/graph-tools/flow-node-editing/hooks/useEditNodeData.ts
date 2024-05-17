import { useGraphEditHooks } from "@/graph-tools/hooks/useGraphEditHooks";
import { useMemo } from "react";
import { HasId } from "@/graph-tools/types/types";
import { getAnyIdAsString } from "@/app/demo/react-flow/utils/adaptors";
import { useGraphController } from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { useEffectSyncToMemo } from "@/graph-tools/flow-node-editing/hooks/useAddLinks";


export function useEditNodeData<T extends HasId>() {
    const {nodeListRef, linkListRef, dispatchNextSimVersion} = useGraphEditHooks('edit-node-data-controller');

    const memoizedEditNodeData = useMemo(() => {
        const replaceNodeData = (data: T) => {
            if (nodeListRef === null || linkListRef === null) return
            
            const nextNodeList = nodeListRef.current.map(n => {
                if (n.id !== getAnyIdAsString(data)) return n
                else return {...n, data}
            });
            dispatchNextSimVersion(nextNodeList, linkListRef.current)
            
        }
        
        return {memoizedFunction: replaceNodeData}
    }, [nodeListRef, linkListRef, dispatchNextSimVersion]);
    
    const {dispatch} = useGraphController(GraphSelectiveContextKeys.editNodeData, memoizedEditNodeData);
    
    useEffectSyncToMemo(dispatch, memoizedEditNodeData)
    
}