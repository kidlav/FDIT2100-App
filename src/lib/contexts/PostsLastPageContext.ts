import { createContext } from "react";
import { type PostsLastPageState } from "../types/post";

export const PostsLastPageContext = createContext<PostsLastPageState | null>(null);

