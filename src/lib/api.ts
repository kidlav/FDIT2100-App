import axios from "axios";
import { type PostResponse } from "@/lib/types/post";
import { API_BASE_URL } from "./constants";

export function fetchPosts() {
    return axios.get<PostResponse>(`${API_BASE_URL}/posts`)
    .then(response => response.data)
}