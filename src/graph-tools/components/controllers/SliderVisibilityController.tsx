import {useMemo} from "react";
import ControllerComponent from "@/graph-tools/components/ControllerComponent";
import {PartialDeep} from "type-fest";
import {ForceAttributeKeys, ForceAttributesInitial} from "@/graph-tools/types/forceAttributesMetaData";
import {ForceGraphPageOptionProps} from "@/graph-tools/types/forceGraphPageProps";

export function SliderVisibilityController({forceSlidersVisibleInitial}: PartialDeep<Pick<ForceGraphPageOptionProps, 'forceSlidersVisibleInitial'>>) {

    const sliderControllers = useMemo(() => Object.entries(ForceAttributesInitial).map(entry => {
        const key = `${entry[0]}:show`;
        const value = forceSlidersVisibleInitial?.[entry[0] as ForceAttributeKeys] ?? true;
        return <ControllerComponent key={key} contextKey={key} initialValue={value ?? true}/>
    }), [forceSlidersVisibleInitial])

    return (
        <>{sliderControllers && sliderControllers}</>
    )
}