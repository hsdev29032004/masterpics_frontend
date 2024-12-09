import { TResponse } from "@/types/response";
import { _get, _post } from "../utils/request"

export const checkAccessToken = async (): Promise<TResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-access-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });
    const result: TResponse = await response.json()
    return result
}

export const refreshToken = async (): Promise<TResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });
    const result: TResponse = await response.json()
    return result
}