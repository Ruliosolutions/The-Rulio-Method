/**
 * GET /api/workshop/capacity
 *
 * Returns the seat count and next workshop date.
 * Public — no auth required. Used by the form to show the
 * "17 / 24 seats left" counter.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const CAPACITY = 24;

export async function GET() {
  // The checkout route computes the next date too; here we hard-code
  // the same logic so this route is independently callable.
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const offset = (2 - firstOfMonth.getUTCDay() + 7) % 7;
  const firstTuesday = new Date(Date.UTC(year, month, 1 + offset));
  let target = firstTuesday;
  if (firstTuesday <= now) {
    const next = new Date(Date.UTC(year, month + 1, 1));
    const nextOffset = (2 - next.getUTCDay() + 7) % 7;
    target = new Date(Date.UTC(year, month + 1, 1 + nextOffset));
  }
  const dateStr = target.toISOString().slice(0, 10);

  const { count, error } = await supabaseAdmin
    .from("workshop_attendees")
    .select("*", { count: "exact", head: true })
    .eq("workshop_date", dateStr)
    .neq("status", "refunded");

  if (error) {
    console.error("[capacity] supabase error:", error);
    return NextResponse.json(
      { error: "Could not check capacity" },
      { status: 500 }
    );
  }

  const booked = count ?? 0;
  return NextResponse.json(
    {
      date: dateStr,
      capacity: CAPACITY,
      booked,
      remaining: Math.max(0, CAPACITY - booked),
      soldOut: booked >= CAPACITY,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    }
  );
}
