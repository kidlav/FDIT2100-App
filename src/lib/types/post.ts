import type { Dispatch, SetStateAction } from "react";

export interface PostsLastPageState {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}


export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    }
    views: number;
    userId: number;
}


export interface PostResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}

export interface ClassnameProps {
    isActive: boolean;
    isPending: boolean;
    isTransitioning: boolean;
}

export interface PostsCacheState {
    pageParams: number[];
    pages: PostResponse[];
}