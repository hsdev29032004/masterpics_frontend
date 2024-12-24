import { TResponse } from "@/types/response"
import { _get, _post } from "@/utils/request"
import { refreshToken } from "./auth"
import { Dispatch } from "@reduxjs/toolkit"
import { setUser } from "@/stores/userSlice"
import { TListPayment } from "@/types/payment"

export const buy = async (idPost: string, dispatch: Dispatch): Promise<TResponse> => {
    const response = await _post(`/payments/buy/${idPost}`)
    const result: TResponse = await response.json()
    if(response.status === 401){
        const refresh = await refreshToken()
        if(refresh.status == "success"){
            dispatch(setUser(refresh.data.user))
            return buy(idPost, dispatch)
        }else{
            return refresh
        }
    }else if(result.status == "success"){
        const refresh = await refreshToken()
        if(refresh.status == "success"){
            dispatch(setUser(refresh.data.user))
        }else{
            return refresh
        }
    }
    return result
}

export const getPurchased = async (accessToken?: string): Promise<TResponse<TListPayment>> => {
    const response = await _get(`/payments/purchase`, accessToken)
    const result: TResponse<TListPayment> = await response.json()
    return result
}