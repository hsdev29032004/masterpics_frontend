"use client";
import { checkAccessToken, refreshToken } from "@/services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckLogin({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useDispatch()
    const router = useRouter()
    const checkLogin = async () => {
        const result1 = await checkAccessToken()
        if (result1.status == "success") {
            dispatch(setUser(result1.data))
        } else {
            const result2 = await refreshToken()
            if (result2.status == "success") {
                dispatch(setUser(result2.data.user))
                router.refresh()
            } else {
                dispatch(setUser(null))
            }
        }
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return <>{children}</>
}
