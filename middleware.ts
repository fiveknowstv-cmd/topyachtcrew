import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
  // TEMPORARY DEMO MODE — Supabase auth disabled for signup/login demo.
  // Remove this bypass once real Supabase integration is re-enabled.
  const DEMO_MODE = true;
  if (DEMO_MODE) {
    return NextResponse.next();
  }

  const response = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  // Skip auth checks for public routes and static assets
  const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/crew', '/employers'];
  if (publicPaths.some(p => pathname.startsWith(p)) || pathname.includes('.')) {
    return response;
  }

  // Check for dashboard routes that require authentication + role
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    // Fetch profile to get role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single<{ role: 'crew' | 'employer' }>();

    const role = profile?.role;

    // Role-based protection
    if (pathname.startsWith('/dashboard/crew') && role !== 'crew') {
      return NextResponse.redirect(new URL('/dashboard/employer', request.url));
    }

    if (pathname.startsWith('/dashboard/employer') && role !== 'employer') {
      return NextResponse.redirect(new URL('/dashboard/crew', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
