import {DataLink, DataNode, HasNumberId} from "@/graph-tools/types/types";
import {useContext} from "react";
import {NodeRefContext} from "@/graph-tools/contexts/nodeRefContextCreator";
import {LinkRefContext} from "@/graph-tools/contexts/linkRefContextCreator";

export function useGraphRefs<T extends HasNumberId>() {
    const nodeListRef = useContext(
        NodeRefContext as React.Context<React.MutableRefObject<
            DataNode<T>[]
        > | null>
    );
    const linkListRef = useContext(
        LinkRefContext as React.Context<React.MutableRefObject<
            DataLink<T>[]
        > | null>
    );
    return {nodeListRef, linkListRef};
}