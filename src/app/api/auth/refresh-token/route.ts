import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Lấy refresh_token từ header
        const refreshToken = request.headers.get("Authorization")?.replace("Bearer ", "");

        if (!refreshToken) {
            return NextResponse.json(
                { status: "error", message: "Refresh token không tồn tại" },
                { status: 401 }
            );
        }

        const res = await fetch("http://localhost:3001/api/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        const result = await res.json();

        if (result.status !== "success") {
            return NextResponse.json(
                { status: "error", message: result.message },
                { status: 401 }
            );
        }

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
        });

        response.cookies.set("refresh_token", result.data?.refresh_token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            path: "/",
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 năm
        });

        return response;
    } catch (error) {
        console.error("Lỗi refresh token:", error);
        return NextResponse.json(
            { status: "error", message: "Lỗi hệ thống", data: null },
            { status: 500 }
        );
    }
}
