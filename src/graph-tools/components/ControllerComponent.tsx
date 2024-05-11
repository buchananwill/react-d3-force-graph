import {useGlobalController} from "selective-context";

export default function ControllerComponent<T>({contextKey, listenerKey = 'controller', initialValue}:{contextKey: string, listenerKey?: string, initialValue: T}) {
    useGlobalController<T>({contextKey , listenerKey, initialValue})

    return null

}