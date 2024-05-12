// Defining the GraphSelectiveKeys as a constant object
export const GraphSelectiveContextKeys = {
    arrowsToParents: 'arrows-to-parents',
    arrowsToChildren: 'arrows-to-children',
    highlightFromSource: 'highlight-from-source',
    highlightFromTarget: 'highlight-from-target',
    version: 'version',
    transientNodeIds: 'transient-node-ids',
    transientLinkIds: 'transient-link-ids',
    nextNodeId: 'next-node-id',
    nextLinkId: 'next-link-id',
    nodePositionsKey: 'node-positions-key',
    debouncing: 'debouncing',
    noNodeSelected: 'no-node-selected',
    deletedLinkIds: 'deleted-link-ids',
    deletedNodeIds: 'deleted-node-ids',
    dimensions: 'dimensions',
    mounted: 'mounted',
    showNodeEditing: 'show-node-editing',
    nodeCloneFunction: 'node-clone-function',
    showForceEditing: 'show-force-editing',
    unsavedNodeData: 'unsaved-node-data',
    lockTextWithSelect: 'lock-text-with-select',
    textSize: 'text-size',
    ready: 'ready',
    sim: 'simulationRef',
    zoom: 'zoom',
    svgScale: 'svg-scale'
} as const; // Redefining the GraphSelectiveContext type to use the values of GraphSelectiveKeys

export type GraphSelectiveContextKey = typeof GraphSelectiveContextKeys[keyof typeof GraphSelectiveContextKeys];