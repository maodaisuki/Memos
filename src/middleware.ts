import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseToken } from "./lib/token";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL('/mine', request.url));
    }
    if (request.nextUrl.pathname.startsWith("/mine") || request.nextUrl.pathname.startsWith("/user") || request.nextUrl.pathname.startsWith("/hashtags") || request.nextUrl.pathname.startsWith("/search")) {
        if (await isJWTExpired()) {
            return NextResponse.redirect(new URL("/center", request.url));
        }
    }
    if (request.nextUrl.pathname.startsWith("/center")) {
        if (!(await isJWTExpired())) {
            return NextResponse.redirect(new URL("/mine", request.url))
        }
    }
}

async function isJWTExpired() {
    var jwtToken = cookies().get('MAOJI-Token') || null;
    if (jwtToken == null) {
        return true;
    }
    const decodedToken = await parseToken(jwtToken.value);
    if ((await decodedToken)?.iss == process.env.NEXT_PUBLIC_API_URL && (await decodedToken)?.aud == process.env.NEXT_PUBLIC_BASE_URL) {
        return false;
    }
    return true;
}
