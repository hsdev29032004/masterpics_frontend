"use client";
import { useRouter } from "next/navigation";
import { checkAccessToken, refreshToken } from "@/services/auth";
import { useEffect } from "react";

export default function CheckLoginAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()

    const checkLogin = async () => {
        const result1 = await checkAccessToken()
        if (result1.status == "success") {
            router.push("/")
        } else {
            const result2 = await refreshToken()
            if (result2.status == "success") {
                router.push("/")
            }
        }
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return <>{children}</>
}
