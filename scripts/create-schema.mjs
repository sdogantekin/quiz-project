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
// `session_id` is a random id generated client-side once per quiz attempt
// (see lib/track.ts) - without it, events can't be correlated back to a
// single visitor's attempt, so a real funnel (vs. just raw event counts)
// isn't possible.
await sql`
  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    session_id TEXT,
    properties JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

// ALTER here (not just in the CREATE above) because `events` may already
// exist from before session_id was added.
await sql`
  ALTER TABLE events ADD COLUMN IF NOT EXISTS session_id TEXT
`;

await sql`
  CREATE INDEX IF NOT EXISTS events_name_idx ON events (name)
`;

await sql`
  CREATE INDEX IF NOT EXISTS events_session_id_idx ON events (session_id)
`;

console.log("Schema ready: subscribers and events tables exist.");
