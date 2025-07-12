import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Debug log: print token value
  console.log('Middleware token:', request.cookies.get('token')?.value);

  // Protected routes that require authentication
  const protectedRoutes = [
    '/profil',
    '/admin',
    '/sepet'
  ];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get token from cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/giris', request.url));
    }

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      // Redirect to login if invalid token
      return NextResponse.redirect(new URL('/giris', request.url));
    }

    // For admin routes, check if user has admin role
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      // Redirect to home if not admin
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // For login/register pages, redirect to home if already authenticated
  const authRoutes = ['/giris', '/kayit'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isAuthRoute) {
    const token = request.cookies.get('token')?.value;

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        // Redirect to home if already authenticated
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 