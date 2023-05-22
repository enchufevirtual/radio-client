import { createContext } from "react";
import { ContextProps } from "./types";

export const GlobalContext = createContext<ContextProps>({} as ContextProps);
