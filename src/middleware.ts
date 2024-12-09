import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "@/app/i18nConfig";

export async function middleware(request: NextRequest) {
    return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};
