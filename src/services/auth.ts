import { TResponse } from "@/types/response";
import { _post } from "../utils/request"

export const checkAccessToken = async (): Promise<TResponse> => {
    const response = await _post("/auth/check-access-token")
    const result: TResponse = await response.json()
    return result
}

export const refreshToken = async (): Promise<TResponse> => {
    const response = await _post("/auth/refresh")
    const result: TResponse = await response.json()
    return result
}