import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('admin_session');
  const isAuthenticated = session?.value === 'true';

  // Protect workspace routes
  if (pathname.startsWith('/workspace')) {
    if (!isAuthenticated) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If visiting login page but already authenticated, redirect to workspace
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/workspace', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/workspace/:path*', '/login'],
};
