# What's Your Coffee Personality?

A quiz that recommends a coffee based on the visitor's personality. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

This is a basic learning project built while working through several vibe coding concepts - planning with a requirements doc, building and iterating with an AI pair, shipping to production, testing, CI/CD, and adding a small backend feature. Not a polished product.

Live at: https://quiz-project-rose-nine-51.vercel.app

See [REQUIREMENTS.md](./REQUIREMENTS.md) for the original spec (results, questions, and visual style).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it.

## Project Structure

- `lib/quiz-data.ts` - the 5 personality/coffee results and the 10 questions
- `lib/scoring.ts` - picks the winning personality from the answer tally
- `lib/chime.ts` - the little sound effect on the result screen
- `components/QuizCard.tsx` - renders one question
- `components/ResultCard.tsx` - renders the result (image, confetti, sound, animations)
- `components/ShareButtons.tsx` - native share / X / copy-link on the result screen
- `components/EmailCapture.tsx` - opt-in email capture form on the result screen
- `app/api/subscribe/route.ts` - validates and stores an opted-in email + result
- `lib/db.ts` - Neon Postgres client
- `app/dashboard/page.tsx` - aggregate stats (no raw emails): total signups, results breakdown, 30-day trend
- `lib/stats.ts` - pure data-shaping for the dashboard charts (unit tested)
- `components/BarChart.tsx`, `components/TrendChart.tsx` - the two dashboard charts, with hover/focus tooltips
- `app/result/[id]/page.tsx`, `app/result/[id]/opengraph-image.tsx` - shareable per-result pages with custom social preview images
- `app/page.tsx` - ties it all together (question index, scores, which screen to show)

## Email Capture

Visitors can opt in (explicit checkbox required) to have their email saved alongside their quiz result, stored in a Neon Postgres database.

- Database is provisioned via Vercel's Neon integration; connection env vars (`DATABASE_URL`, etc.) are already set on the Vercel project across all environments and in local `.env.local` (gitignored).
- Schema lives in `scripts/create-schema.mjs` - run once against a fresh database with `node --env-file=.env.local scripts/create-schema.mjs`.
- `lib/email.ts` has the validation logic (unit tested); `app/api/subscribe/route.ts` re-validates server-side before inserting.

## Dashboard

`/dashboard` shows aggregate stats only - total signups, a results breakdown, a 30-day signup trend. It deliberately does **not** list raw emails (visitors consented to having their email stored, not published); to see the actual email list, query the `subscribers` table directly via the Neon console in the Vercel dashboard.

## Testing

**Unit tests** (Vitest) - the scoring logic and quiz data integrity:

```bash
npm test
```

**End-to-end smoke tests** (Playwright) - loads the quiz in a real browser, answers all 10 questions, checks the result appears, checks "Take it again" resets:

```bash
npm run test:e2e
```

## CI/CD

- **Pre-push git hook** (`.git/hooks/pre-push`) runs `npm test` before any push leaves this machine.
- **GitHub Actions** (`.github/workflows/tests.yml`) runs unit tests + E2E tests on every push to `main`, on GitHub's own runners.
- **Vercel build gate** (`vercel.json`) runs `npm test` as part of the production build - a failing test blocks the deploy.

Pushing to `main` on GitHub auto-deploys to Vercel (the repo is connected via Vercel's GitHub integration).
