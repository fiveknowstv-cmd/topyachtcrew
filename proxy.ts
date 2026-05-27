import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@/lib/supabase/server';

// Force Node.js runtime + dynamic rendering for Supabase SSR compatibility on Vercel.
// This completely disables Edge runtime for the proxy (the Next.js 16+ replacement for middleware).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function proxy(request: NextRequest) {
  // DEMO_MODE bypass — keeps everything simple while developing.
  // When disabled, the code below runs fully on Node.js (no Edge modules).
  const DEMO_MODE = true;
  if (DEMO_MODE) {
    return NextResponse.next();
  }

  // Essential session handling + auth redirects (role-based protection)
  const response = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  // Public routes and static assets
  const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/crew', '/employers'];
  if (publicPaths.some(p => pathname.startsWith(p)) || pathname.includes('.')) {
    return response;
  }

  // Protected dashboard + profile routes — role enforcement
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single<{ role: 'crew' | 'employer' }>();

    const role = profile?.role;

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
