import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenEdge } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDev = process.env.NODE_ENV === 'development';

  // Debug: JWT Secret kontrolü
  if (isDev && pathname === '/profil') {
    console.log('[Middleware] JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('[Middleware] JWT_SECRET length:', process.env.JWT_SECRET?.length || 0);
  }

  // Debug log: print current path and token
  if (isDev) {
    console.log(`[Middleware] Path: ${pathname}`);
    console.log(`[Middleware] Token:`, request.cookies.get('token')?.value ? 'EXISTS' : 'MISSING');
  }

  // Protected routes that require authentication
  const protectedRoutes = [
    '/profil',
    '/admin',
    '/sepet',
    '/hesap',
    '/siparislerim',
    '/profil/siparislerim',
    '/sepet/checkout'
  ];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (isDev) console.log(`[Middleware] Protected route detected: ${pathname}`);
    
    // Get token from cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
      if (isDev) console.log('[Middleware] No token found, redirecting to login');
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/giris', request.url));
    }

    if (isDev) console.log('[Middleware] Token found, attempting verification...');

    // Verify token with Edge Runtime compatible function
    try {
      const payload = await verifyTokenEdge(token);
      
      if (!payload) {
        if (isDev) console.log('[Middleware] Token verification FAILED, redirecting to login');
        // Redirect to login if invalid token
        return NextResponse.redirect(new URL('/giris', request.url));
      }

      if (isDev) console.log(`[Middleware] Token verification SUCCESS for user: ${payload.email}, role: ${payload.role}`);

      // For admin routes, check if user has admin role
      if (pathname.startsWith('/admin') && payload.role !== 'admin') {
        if (isDev) console.log('[Middleware] Non-admin user trying to access admin, redirecting to home');
        // Redirect to home if not admin
        return NextResponse.redirect(new URL('/', request.url));
      }

      if (isDev) console.log(`[Middleware] Access GRANTED to ${pathname}`);
    } catch (error) {
      if (isDev) console.log('[Middleware] Token verification ERROR:', error);
      return NextResponse.redirect(new URL('/giris', request.url));
    }
  }

  // For login/register pages, redirect to home if already authenticated
  const authRoutes = ['/giris', '/kayit'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isAuthRoute) {
    const token = request.cookies.get('token')?.value;

    if (token) {
      try {
        const payload = await verifyTokenEdge(token);
        if (payload) {
          if (isDev) console.log('[Middleware] Already authenticated user accessing auth route, redirecting to home');
          // Redirect to home if already authenticated
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {
        // Token invalid, continue to auth page
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