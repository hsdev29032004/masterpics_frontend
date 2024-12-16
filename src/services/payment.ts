import { TResponse } from "@/types/response"
import { _post } from "@/utils/request"
import { refreshToken } from "./auth"
import { Dispatch } from "@reduxjs/toolkit"
import { setUser } from "@/stores/userSlice"

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
    }else{
        const refresh = await refreshToken()
        if(refresh.status == "success"){
            dispatch(setUser(refresh.data.user))
        }else{
            return refresh
        }
    }
    return result
}