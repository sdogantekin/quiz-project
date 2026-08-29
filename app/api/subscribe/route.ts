import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { isValidEmail } from "@/lib/email";
import { personalities } from "@/lib/quiz-data";
import { checkRateLimit } from "@/lib/rate-limit-db";
import { getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const { allowed } = await checkRateLimit(
    `subscribe:${getClientIp(request)}`,
    { windowSeconds: 600, maxRequests: 5 }
  );
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const personality =
    typeof body?.personality === "string" ? body.personality : "";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  if (!personalities.some((p) => p.id === personality)) {
    return NextResponse.json({ error: "Invalid result." }, { status: 400 });
  }

  await sql`
    INSERT INTO subscribers (email, personality)
    VALUES (${email}, ${personality})
  `;

  return NextResponse.json({ ok: true });
}
