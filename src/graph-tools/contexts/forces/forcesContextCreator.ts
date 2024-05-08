import {createContext} from "react";
import {ObjectPlaceholder} from "selective-context";
import {Forces} from "@/graph-tools/types/forces";

export const ForcesContext = createContext<Forces>(ObjectPlaceholder)