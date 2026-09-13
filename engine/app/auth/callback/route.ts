/**
 * /auth/callback
 *
 * Handles the magic-link redirect from Supabase. The user lands here
 * after clicking the link in their email. We exchange the code for a
 * session, then redirect to /welcome.
 *
 * The session cookie is set by Supabase's auth helpers.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/welcome";
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? url.origin;

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => cookieStore.get(name)?.value,
          set: (name: string, value: string, options: any) => {
            try {
              cookieStore.set({ name, value, ...options });
            } catch {
              // Server components can't set cookies. Server actions can.
            }
          },
          remove: (name: string, options: any) => {
            try {
              cookieStore.set({ name, value: "", ...options });
            } catch {}
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, baseUrl));
    }
  }

  // Fallback: if no code or exchange failed, redirect to login with error
  return NextResponse.redirect(new URL("/pro?error=auth", baseUrl));
}
