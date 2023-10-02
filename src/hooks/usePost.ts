import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export function usePost() {
  return useContext(PostContext);
}
