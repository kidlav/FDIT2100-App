import React, { useState} from "react";
import { PostsLastPageContext } from "./PostsLastPageContext";
import type { PostsLastPageState } from "../types/post";

export function PostsLastPageProvider({children}: {children: React.ReactNode}) {
    const[page, setPage] = useState(0);

    const context: PostsLastPageState = {
        page,
        setPage,
    };

    return (
        <PostsLastPageContext.Provider value={context}>
            {children}
        </PostsLastPageContext.Provider>
    );
}

