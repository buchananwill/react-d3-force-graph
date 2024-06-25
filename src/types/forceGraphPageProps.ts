import { DataLink, DataNode, HasNumberId } from "./util";
import { PropsWithChildren } from "react";
import { PartialDeep } from "type-fest";
import { ForceAttributeKey, ForceAttributesDto } from "./forceAttributes";
import { ForceKey } from "./forces";

export interface ForceGraphPageAllProps<T extends HasNumberId>
  extends PropsWithChildren {
  dataNodes: DataNode<T>[];
  dataLinks: DataLink<T>[];
  graphName: string;
  options?: ForceGraphPageOptions;
}

export type ForceGraphPageOptions = PartialDeep<ForceGraphPageOptionProps>;

export type ForceNormalizationCoefficients = Partial<{
  [Key in ForceAttributeKey]: number;
}>;

export interface ForceGraphPageOptionProps {
  nodeEditing: boolean;
  forceEditing: boolean;
  sidePanel: boolean;
  defaultInteractiveViewer: boolean;
  forceAttributesInitial: ForceAttributesDto;
  forces: ForceOptions;
  forceSlidersVisibleInitial: { [Key in ForceAttributeKey]: boolean };
  normalizationCoefficients: ForceNormalizationCoefficients;
}

export type ForceOptions = Partial<{
  [K in ForceKey]: boolean;
}>;
