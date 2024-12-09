import { TResponse } from "@/types/response";
import Login from "@/views/login/Login";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Master Pics - Login",
    description: "Đăng nhập hệ thống Master Pics!",
};

export default async function LoginPage() {
    // const cookieStore = cookies();
    // const accessToken = cookieStore.get("access_token")?.value;
    // const refreshToken = cookieStore.get("refresh_token")?.value;

    // // Check access token
    // const response1 = await fetch("http://localhost:3001/api/auth/check-access-token", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    // });
    // const result1: TResponse = await response1.json();

    // if (result1.status === "success") {
    //     redirect("/");
    // } else if (refreshToken) {
    //     // Gọi API refresh token, truyền refresh_token qua header
    //     const response2 = await fetch("http://localhost:3000/api/auth/refresh-token", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${refreshToken}`, // Truyền refresh_token vào header
    //         },
    //     });

    //     const result2: TResponse = await response2.json();

    //     if (result2.status === "success") {
    //         redirect("/");
    //     }
    // }

    return <Login />;
}
