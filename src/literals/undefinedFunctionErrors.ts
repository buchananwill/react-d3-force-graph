export const undefinedAddNodes = createUndefinedFunction("Add nodes");
export const undefinedDeleteNodes = createUndefinedFunction("Delete nodes");
export const undefinedLabelAccessor = createUndefinedFunction("Label accessor");
export const undefinedEditNodeData = createUndefinedFunction("Edit node data");
export const undefinedAddLinks = createUndefinedFunction("Add links");
export const undefinedDeleteLinks = createUndefinedFunction("Delete links");
export const undefinedCloneNode = createUndefinedFunction("Clone node");

function createUndefinedFunction(name: string) {
  return {
    memoizedFunction: () => {
      throw new Error(`${name} function has not been defined.`);
    },
  };
}
