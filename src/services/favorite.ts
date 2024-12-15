import { TFavorite } from "@/types/favorite";
import { TResponse } from "@/types/response";
import { _get, _post } from "@/utils/request";

export const getListFavorite = async (accessToken?: string): Promise<TResponse<TFavorite>> => {
    const response = await _get("/favorites", accessToken)
    const result: TResponse<TFavorite> = await response.json()
    return result
}

export const likePost = async (id: string) => {
    const response = await _post(`/favorites/like/${id}`)
    const result: TResponse = await response.json()
    return result
}