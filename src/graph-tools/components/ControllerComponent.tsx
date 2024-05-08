import {useGlobalController} from "selective-context";

export default function ControllerComponent({contextKey, listenerKey = 'controller', initialValue}:{contextKey: string, listenerKey?: string, initialValue: number}) {
    useGlobalController({contextKey , listenerKey, initialValue})

    return null

}