import {GraphDto, HasNumberId} from "@/graph-tools/types/types";
import {PropsWithChildren} from "react";
import {PartialDeep} from "type-fest";
import {ForceAttributeKeys, ForceAttributesDto} from "@/graph-tools/types/forceAttributesMetaData";

export interface ForceGraphPageAllProps<T extends HasNumberId> extends PropsWithChildren {
    dataGraph: GraphDto<T>;
    graphName: string;
    options?: PartialDeep<ForceGraphPageOptionProps>
}

export interface ForceGraphPageOptionProps {
    nodeEditing: boolean;
    forceEditing: boolean;
    sidePanel: boolean;
    defaultInteractiveViewer: boolean;
    useInternalSimEngine: boolean
    forceAttributesInitial: ForceAttributesDto
    forceSlidersVisibleInitial: { [Key in ForceAttributeKeys]: boolean }
}