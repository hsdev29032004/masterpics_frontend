import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {        
        const body = await request.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const result = await res.json();

        const response = NextResponse.json({
            status: result.status,
            message: result.message,
            data: { user: result.data?.user },
        });

        response.cookies.set("access_token", result.data?.access_token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            path: "/",
            expires: new Date(Date.now() + 60 * 60 * 1000),
        })

        response.cookies.set("refresh_token", result.data?.refresh_token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            path: "/",
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        })

        return response
    } catch (error) {
        return NextResponse.json(
            {
                status: "error",
                message: "Lỗi hệ thống",
                data: null,
            },
            { status: 500 }
        );
    }
}
