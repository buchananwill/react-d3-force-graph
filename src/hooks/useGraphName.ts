import { useContext } from "react";
import { GraphContext } from "../contexts/graphContextCreator";


export function useGraphName() {
  const { uniqueGraphName } = useContext(GraphContext);
  return uniqueGraphName;
}