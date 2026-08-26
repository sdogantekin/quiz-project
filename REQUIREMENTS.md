# Coffee Personality Quiz - Requirements

## Concept
"What's Your Coffee Personality?" — a fun personality quiz that recommends a coffee drink based on the visitor's answers.

## Results (5 personality → coffee pairings)

| # | Personality | Coffee | Tagline | Image |
|---|---|---|---|---|
| 1 | **Bold Adventurer** | Double Espresso | "You live for intensity" | `public/bold-adventurer.jpg` |
| 2 | **Cozy Classic** | Medium Roast Drip | "Comfort in every cup" | `public/cozy-classic.jpg` |
| 3 | **Zen Minimalist** | Black Coffee, Single Origin | "Simple. Clean. Perfect." | `public/zen-minimalist.jpg` |
| 4 | **Night Owl** | Red Eye (coffee + espresso shot) | "Sleep is optional" | `public/night-owl.jpg` |
| 5 | **Health Nut** | Oat Milk Americano | "Wellness in every sip" | `public/health-nut.jpg` |

All images sourced from Unsplash, free to use under the Unsplash License (no attribution required).

## Result Logic

- Each question has 5 answers, one per personality.
- Each answer selected adds one point to that personality.
- At the end, the personality with the most points wins.
- **Display style: Single recommendation** — show only the strongest personality and its one coffee recommendation (not a percentage breakdown of all five).

## Visual Style

Mix of Style 2 (Minimal & Clean) and Style 4 (Warm & Cozy):
- **Layout/structure from Style 2:** lots of whitespace, simple typography, subtle thin progress bar, understated list-style answer options with hover states.
- **Color palette from Style 4:** warm cream background, soft brown/tan tones, gentle warm accents — NOT the stark black-and-white of Style 2.
- **Icons:** Yes — a small icon next to each answer option (polished, visual feel).
- **Images:** Yes — each of the 5 results has a photo (see table above), stored in `public/`.

## Questions (10 total)

Answer order for every question is: **Bold Adventurer → Cozy Classic → Zen Minimalist → Night Owl → Health Nut**

1. **What are your weekend plans?** *(lifestyle)*
   Booking a spontaneous trip somewhere new / Blanket, a book, and doing nothing / A long walk with my phone left at home / Sleeping till noon, up till 3am / An early workout and a green juice

2. **Which fictional character do you relate to most?** *(pop culture)*
   Indiana Jones / Bilbo Baggins / Master Oogway / Batman / Captain America

3. **Pick a color that matches your mood most days.** *(abstract)*
   Fire-engine red / Warm amber / Soft white / Deep midnight blue / Fresh green

4. **What's your ideal vacation?** *(lifestyle)*
   Backpacking somewhere remote / A cabin in the woods with a fireplace / A quiet retreat, no itinerary / A city that never sleeps / An active retreat - hiking, yoga, clean eating

5. **What do you binge on streaming?** *(pop culture)*
   Action/thriller / Feel-good sitcoms / Slow cinema & documentaries / True crime at 2am / Wellness & fitness content

6. **If you were a weather pattern, you'd be...** *(abstract)*
   A sudden thunderstorm / A gentle, steady rain / A clear, calm sky / A foggy midnight / A crisp, sunny morning

7. **What's your go-to comfort food?** *(lifestyle)*
   Spicy street food / Grandma's homemade soup / A simple bowl of rice and veggies / Late-night diner fries / A protein smoothie bowl

8. **Stranded on a desert island, what's the one item you bring?** *(abstract)*
   A knife, for building and exploring / A soft blanket / A journal / A flashlight / A water filter

9. **What's your ideal Friday night?** *(lifestyle)*
   Concert or spontaneous adventure out / Home, pizza, cozy movie night / Quiet night in, tea and silence / Still going strong past midnight / Early night, up for a 6am run tomorrow

10. **Pick a soundtrack for your life.** *(abstract)*
    Fast-paced rock/electronic / Warm acoustic folk / Ambient & instrumental / Moody synth/lo-fi / Upbeat pop

## Assets on Disk

- `style-preview-1.html` … `style-preview-4.html` — style exploration previews (reference only, not part of final build)
- `public/bold-adventurer.jpg`, `public/cozy-classic.jpg`, `public/zen-minimalist.jpg`, `public/night-owl.jpg`, `public/health-nut.jpg` — result images

## Built After Initial Spec

Added during iteration, not part of the original plan above — see [README.md](./README.md) for how to run/test them:

- Confetti burst, a synthesized chime sound, and staggered entrance animations on the result screen
- Share buttons on the result screen (native share sheet, share on X, copy link)
- Unit tests (Vitest) for the scoring logic and quiz data
- End-to-end smoke tests (Playwright)
- CI/CD: a pre-push git hook, a GitHub Actions workflow, and a Vercel build gate — all running the test suite before code can ship
- Opt-in email capture on the result screen (explicit consent checkbox), stored in a Neon Postgres database
- Self-hosted funnel event tracking (Postgres, session-correlated) and an aggregate `/dashboard`
- Custom per-result share pages with branded social preview images
- Question pool expanded from 10 to 25; each attempt draws a random 10, shuffled, so retakes don't repeat the same quiz
