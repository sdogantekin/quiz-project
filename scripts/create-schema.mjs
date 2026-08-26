// One-off schema setup for the `subscribers` and `events` tables.
// Run with: node --env-file=.env.local scripts/create-schema.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    personality TEXT NOT NULL,
    consented_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers (email)
`;

// Self-hosted event tracking (funnel events), a free stand-in for Vercel's
// Custom Events until/unless the project upgrades to a Pro team.
await sql`
  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    properties JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS events_name_idx ON events (name)
`;

console.log("Schema ready: subscribers and events tables exist.");
