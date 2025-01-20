import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPaths = ['/login', '/register'];
const insidePaths = ['/home'];

export const config = {
    matcher: [...authPaths, ...insidePaths],
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookieToken = request.cookies.get('accessToken')?.value;

    if (insidePaths.some(path => pathname.startsWith(path))) {
        if (!cookieToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    
    if (authPaths.some(path => pathname.startsWith(path))) {
        if (cookieToken) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next();
}