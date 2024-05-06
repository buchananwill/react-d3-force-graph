import {useGlobalController} from "selective-context";

export default function GraphForceController({contextKey, listenerKey, initialValue}:{contextKey: string, listenerKey: string, initialValue: number}) {
    useGlobalController({contextKey , listenerKey, initialValue})

    return null;

}