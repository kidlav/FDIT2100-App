import axios from "axios";
import { type PostResponse } from "@/lib/types/post";
import { API_BASE_URL, POSTS_PER_PAGE } from "@/lib/constants";
import { type MembersResponse } from "@/lib/types/member";

export function fetchPosts(page: number) {
    return axios.get<PostResponse>(`${API_BASE_URL}/posts?limit=${POSTS_PER_PAGE}&skip=${page * POSTS_PER_PAGE}`)
    .then(response => response.data)
}

export function fetchMembers(): Promise<MembersResponse> {
    return axios.get(`${API_BASE_URL}/users`)
    .then(response => response.data);
}