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
    return <Login />;
}
