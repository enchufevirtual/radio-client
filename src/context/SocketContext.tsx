import { createContext } from "react";
import { SocketContextProps } from "./types";

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);
