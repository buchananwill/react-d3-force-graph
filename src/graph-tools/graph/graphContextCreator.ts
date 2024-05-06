import {createContext, useContext} from 'react';

export interface GraphContextInterface {
    uniqueGraphName: string;
}

export const GraphContext = createContext<GraphContextInterface>({
    uniqueGraphName: 'default'
});

export function useGraphName() {
    const {uniqueGraphName} = useContext(GraphContext);
    return uniqueGraphName;
}

