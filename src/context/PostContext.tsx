import { createContext } from "react";
import { PostContextProps } from "./types";

export const PostContext = createContext<PostContextProps>({} as PostContextProps);
