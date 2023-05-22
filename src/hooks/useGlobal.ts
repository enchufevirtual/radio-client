import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useGlobal() {
  return useContext(GlobalContext)
}
