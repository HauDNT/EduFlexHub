import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/home'];
const authPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('eduflexhub-authentication')?.value.valueOf('accessToken');

    // Nếu truy cập vào các trang cần session mà không có token => chuyển hướng đến login
    if (privatePaths.some(path => pathname.startsWith(path))) {
        if (!accessToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Nếu đã có token mà truy cập vào trang login/register => chuyển hướng đến /me
    if (authPaths.some(path => pathname.startsWith(path))) {
        if (accessToken) {
            return NextResponse.redirect(new URL('/home', request.url));
        }
    }

    // Nếu không thuộc bất kỳ trường hợp nào trên, cho phép tiếp tục
    return NextResponse.next();
}

// Config matcher
export const config = {
    matcher: ['/', '/home', '/login', '/register'],
};
