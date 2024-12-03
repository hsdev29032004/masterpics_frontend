"use client" // <---- error page phải dùng use client
import { redirect } from "next/navigation";

export default function Error() {
    redirect('/hello-world')
}
