import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL('/mine', request.url));
    }
    if(request.nextUrl.pathname.startsWith("/mine") && isJWTExpired()) {
        return NextResponse.redirect(new URL("/center", request.url));
    }
    if(request.nextUrl.pathname.startsWith("/center")) {
        if(!isJWTExpired()) {
            return NextResponse.redirect(new URL("/mine", request.url));
        }
    }
}

function isJWTExpired() {
    var jwtToken = cookies().get('MAOJI-Token');
    if(!jwtToken) {
        return true;
    }
    return false;
    // TODO 考虑从数据库删除用户之后，无法进入页面
}
