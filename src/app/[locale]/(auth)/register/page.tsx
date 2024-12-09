import Register from "@/views/register/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Master Pics - Register",
    description: "Đăng ký Master Pics!",
};

export default async function RegisterPage() {
    return (
        <Register />
    )
}
