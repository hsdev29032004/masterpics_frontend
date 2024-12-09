import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({
        status: "success",
        message: "Đăng xuất thành công",
        data: null,
    })

    response.cookies.set('access_token', '', { path: '/', expires: new Date(0) })
    response.cookies.set('refresh_token', '', { path: '/', expires: new Date(0) })
    
    return response
}