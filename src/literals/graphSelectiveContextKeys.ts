// Defining the GraphSelectiveKeys as a constant object
export const GraphSelectiveContextKeys = {
  version: "version",
  transientNodeIds: "transient-node-ids",
  transientLinkIds: "transient-link-ids",
  nextNodeId: "next-node-id",
  nextLinkId: "next-link-id",
  deletedLinkIds: "deleted-link-ids",
  deletedNodeIds: "deleted-node-ids",
  dimensions: "dimensions",
  mounted: "mounted",
  showNodeEditing: "show-node-editing",
  nodeCloneFunction: "node-clone-function",
  showForceEditing: "show-force-editing",
  unsavedNodeData: "unsaved-node-data",
  ready: "ready",
  sim: "simulationRef",
  addNodes: "add-nodes",
  templateNode: "template-node",
  templateLink: "template-link",
  addLinks: "add-links",
  deleteLinks: "delete-links",
  deleteNodes: "delete-nodes",
  editNodeData: "edit-node-data",
  running: "running",
  nodeDetailsModalOpen: "node-details-modal-open",
  nodeInModal: "node-in-modal",
  nodeModalContent: "node-modal-component-content",
  nodeLabelAccessor: "node-label-accessor",
  forceOptions: "force-options",
  forceNormalization: "force-normalization",
} as const;

// Defining the GraphSelectiveContext type to use the values of GraphSelectiveKeys
export type GraphSelectiveContextKey =
  (typeof GraphSelectiveContextKeys)[keyof typeof GraphSelectiveContextKeys];
