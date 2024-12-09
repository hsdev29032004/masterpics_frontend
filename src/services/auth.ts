import { TResponse } from "@/types/response";
import { _post, _post_nextserver } from "../utils/request"

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

export const login = async (body: {email: string, password: string}): Promise<TResponse> => {
    const response = await _post_nextserver("/auth/login", body)
    const result: TResponse = await response.json()
    return result
}

export const register = async (body: {email: string, password: string, repassword: string, fullName: string}): Promise<TResponse> => {
    const response = await _post_nextserver("/auth/register", body)
    const result: TResponse = await response.json()
    return result
}