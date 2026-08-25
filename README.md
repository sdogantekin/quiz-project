# What's Your Coffee Personality?

A quiz that recommends a coffee based on the visitor's personality. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

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
- `app/page.tsx` - ties it all together (question index, scores, which screen to show)

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
