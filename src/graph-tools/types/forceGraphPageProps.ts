import { DataLink, DataNode, HasNumberId } from "@/graph-tools/types/util";
import { PropsWithChildren } from "react";
import { PartialDeep } from "type-fest";
import {
  ForceAttributeKeys,
  ForceAttributesDto,
} from "@/graph-tools/types/forceAttributes";

export interface ForceGraphPageAllProps<T extends HasNumberId>
  extends PropsWithChildren {
  dataNodes: DataNode<T>[];
  dataLinks: DataLink<T>[];
  graphName: string;
  options?: ForceGraphPageOptions;
}

export type ForceGraphPageOptions = PartialDeep<ForceGraphPageOptionProps>;

export interface ForceGraphPageOptionProps {
  nodeEditing: boolean;
  forceEditing: boolean;
  sidePanel: boolean;
  defaultInteractiveViewer: boolean;
  useInternalSimEngine: boolean;
  forceAttributesInitial: ForceAttributesDto;
  // eslint-disable-next-line no-unused-vars
  forceSlidersVisibleInitial: { [Key in ForceAttributeKeys]: boolean };
}
