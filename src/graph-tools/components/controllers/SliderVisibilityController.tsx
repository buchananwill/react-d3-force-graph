import { useMemo } from "react";

import { PartialDeep } from "type-fest";
import { ForceAttributeKeys } from "@/graph-tools/types/forceAttributes";
import { ForceGraphPageOptionProps } from "@/graph-tools/types/forceGraphPageProps";
import { ForceAttributesInitial } from "@/graph-tools";
import { ControllerComponent } from "selective-context";

export function SliderVisibilityController({
  forceSlidersVisibleInitial,
}: PartialDeep<Pick<ForceGraphPageOptionProps, "forceSlidersVisibleInitial">>) {
  const sliderControllers = useMemo(
    () =>
      Object.entries(ForceAttributesInitial).map((entry) => {
        const key = `${entry[0]}:show`;
        const value =
          forceSlidersVisibleInitial?.[entry[0] as ForceAttributeKeys] ?? true;
        return (
          <ControllerComponent
            key={key}
            contextKey={key}
            initialValue={value ?? true}
          />
        );
      }),
    [forceSlidersVisibleInitial],
  );

  return <>{sliderControllers && sliderControllers}</>;
}
