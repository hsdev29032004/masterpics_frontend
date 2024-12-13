import { TPost } from "@/types/post"
import { TResponse } from "@/types/response"
import { _get } from "@/utils/request"

export const getDetailPostBySlug = async (slug: string): Promise<TResponse<TPost>> => {
    const response = await _get(`/posts/slug/${slug}`)
    const result: TResponse<TPost> = await response.json()
    return result
}