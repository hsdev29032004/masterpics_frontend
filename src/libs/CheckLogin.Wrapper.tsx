"use client";
import { checkAccessToken, refreshToken } from "@/services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/userSlice";

export default function CheckLogin({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useDispatch()

    const checkLogin = async () => {
        const result1 = await checkAccessToken()
        if (result1.status == "success") {
            dispatch(setUser(result1.data))
        } else {
            const result2 = await refreshToken()
            if (result2.status == "success") {
                dispatch(setUser(result2.data.user))
            } else {
                dispatch(setUser(null))
            }
        }
    }

    checkLogin()

    return <>{children}</>
}
