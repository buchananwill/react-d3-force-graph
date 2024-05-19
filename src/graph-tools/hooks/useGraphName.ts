import { useContext } from "react";
import { GraphContext } from "@/graph-tools/contexts/graphContextCreator";

export function useGraphName() {
  const { uniqueGraphName } = useContext(GraphContext);
  return uniqueGraphName;
}