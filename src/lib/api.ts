import axios from "axios";
import { PostsResponse } from "./types/post";

export function fetchPosts() {
    return axios.get<PostsResponse>('https://dummyjson.com/posts')
    .then(response => response.data)
}