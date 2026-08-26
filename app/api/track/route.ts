import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { isValidEventName } from "@/lib/track";

const MAX_PROPERTIES = 5;
const MAX_VALUE_LENGTH = 100;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name : "";

  if (!isValidEventName(name)) {
    return NextResponse.json({ error: "Unknown event." }, { status: 400 });
  }

  const rawProperties =
    body?.properties && typeof body.properties === "object"
      ? (body.properties as Record<string, unknown>)
      : {};

  const properties: Record<string, string> = {};
  for (const [key, value] of Object.entries(rawProperties).slice(
    0,
    MAX_PROPERTIES
  )) {
    if (typeof value === "string") {
      properties[key] = value.slice(0, MAX_VALUE_LENGTH);
    }
  }

  await sql`
    INSERT INTO events (name, properties)
    VALUES (${name}, ${JSON.stringify(properties)}::jsonb)
  `;

  return NextResponse.json({ ok: true });
}
