import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Master Pics - Login",
    description: "Đăng nhập hệ thống Master Pics!",
};

export default async function LoginPage() {
    return (
        <Link href="/login">
            Đăng ký
        </Link>
    )
}
