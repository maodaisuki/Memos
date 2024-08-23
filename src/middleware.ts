import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL('/mine', request.url));
    }
    if(request.nextUrl.pathname.startsWith("/mine") && isJWTExpired(request)) {
        return NextResponse.redirect(new URL("/center", request.url));
    }
    if(request.nextUrl.pathname.startsWith("/center")) {
        if(!isJWTExpired(request)) {
            return NextResponse.redirect(new URL("/mine", request.url));
        }
    }
}

function isJWTExpired(request: NextRequest) {
    var jwtToken = request.cookies.get("MAOJI-Token");
    if(!jwtToken) {
        return true;
    }
    try {
        // TODO API 验证 TOKEN 合法性
    } catch (error) {
        console.error("Error decoding token:", error);
        return true;
    }
}
