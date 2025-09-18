import axios from "axios";
import { type PostResponse } from "@/lib/types/post";

export function fetchPosts() {
    return axios.get<PostResponse>('https://dummyjson.com/posts')
    .then(response => response.data)
}