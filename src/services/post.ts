import { TEditPost, TPost } from "@/types/post"
import { TResponse } from "@/types/response"
import { _delete, _get, _patch, _post } from "@/utils/request"
import { refreshToken } from "./auth"

export const getDetailPostBySlug = async (slug: string): Promise<TResponse<TPost>> => {
    const response = await _get(`/posts/slug/${slug}`)
    const result: TResponse<TPost> = await response.json()
    return result
}

export const editPost = async (idPost: string, data: TEditPost): Promise<TResponse<TPost | undefined>> => {
    const response = await _patch(`/posts/${idPost}`, data)
    const result: TResponse<TPost> = await response.json()
    if(response.status === 401){
        const refresh = await refreshToken()
        if(refresh.status == "success"){
            return editPost(idPost, data)
        }else{
            return refresh
        }
    }
    return result
}

export const deletePost = async (idPost: string): Promise<TResponse<TPost | undefined>> => {
    const response = await _delete(`/posts/${idPost}`)
    const result: TResponse<TPost> = await response.json()
    if(response.status === 401){
        const refresh = await refreshToken()
        if(refresh.status == "success"){
            return deletePost(idPost)
        }else{
            return refresh
        }
    }
    return result
}