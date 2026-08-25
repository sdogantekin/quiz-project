// One-off schema setup for the `subscribers` table.
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

console.log("Schema ready: subscribers table exists.");
