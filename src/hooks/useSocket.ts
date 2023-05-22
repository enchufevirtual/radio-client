import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export function useSocket() {
  return useContext(SocketContext);
}
