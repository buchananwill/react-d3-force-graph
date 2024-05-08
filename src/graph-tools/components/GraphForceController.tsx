import {useGlobalController} from "selective-context";
import {SelectiveContextRangeSlider} from "@/app/demo/components/SelectiveContextRangeSlider";

export default function GraphForceController({contextKey, listenerKey, initialValue}:{contextKey: string, listenerKey: string, initialValue: number}) {
    // useGlobalController({contextKey , listenerKey, initialValue})

    return <SelectiveContextRangeSlider contextKey={contextKey} initialValue={initialValue} listenerKey={listenerKey}/>;

}