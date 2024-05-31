import { DataLink, DataNode, HasNumberId } from "./util";
import { PropsWithChildren } from "react";
import { PartialDeep } from "type-fest";
import { ForceAttributeKeys, ForceAttributesDto } from "./forceAttributes";
import { ForceKey } from "./forces";

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
  forceAttributesInitial: ForceAttributesDto;
  forces: ForceOptions;
  forceSlidersVisibleInitial: { [Key in ForceAttributeKeys]: boolean };
}

export type ForceOptions = Partial<{
  [K in ForceKey]: boolean;
}>;
