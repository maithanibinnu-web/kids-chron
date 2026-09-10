# KidsChron — The Newspaper for Curious Minds

The KidsChron website: a children's knowledge platform for
**Prakritik India Initiatives Pvt. Ltd.**

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint
```

Node 20 or later. No database, no external services and no API keys are needed
to run it — see **Things that need connecting** below for what to add before
going live.

---

## Deploying

The app is a standard Next.js application and deploys to Vercel, Netlify,
Render, Railway, or any Node host, with no configuration.

**Vercel (simplest):** push the repository to GitHub, import it at
vercel.com/new, and deploy. Add the environment variables from
`.env.example` in the project settings.

**Any Node host:** `npm run build`, then `npm start` behind a reverse proxy.

Set `site.url` in `src/content/site.ts` to the live domain before launch —
it is used for canonical URLs, Open Graph tags, the sitemap and structured data.

---

## How the code is organised

```
src/
  app/                     Routes (App Router)
    api/                   Server routes: subscriptions, forms, payment webhook
  components/
    brand/                 Logo lock-ups (the two supplied marks)
    layout/                Navbar, Footer, PageHeader
    ui/                    Design system: primitives, Icon, ArtScene, Reveal
    cards/                 ArticleCard, QuizCard, PuzzleCard, EditionCard, …
    home/                  Homepage sections
    forms/                 Field primitives + the four forms
    subscribe/             Checkout wizard, payment panel
    quiz/                  Quiz player
    seo/                   JSON-LD structured data
  content/                 ← THE CONTENT LAYER (see below)
  lib/                     Payments, orders, validation, notifications
```

### The content layer is the important part

`src/content/` is the contract between editorial and the interface.
**No component contains editorial copy.** Every headline, article, quiz,
puzzle, competition, price, FAQ answer and section blurb lives in a typed
data file, and components import from `@/content` — never from an
individual data file.

| File | What an editor owns there |
|---|---|
| `site.ts` | Brand messages, contact details, bank details, navigation |
| `homepage.ts` | Every homepage slot: Did You Know, Today's Curiosity, Why cards, activities |
| `articles.ts` | Articles, authored as structured blocks (not HTML) |
| `quizzes.ts` `puzzles.ts` | Questions, answers, explanations |
| `competitions.ts` | Competitions, rules, dates, prizes |
| `editions.ts` | Monthly editions and the Theme of the Month |
| `plans.ts` | Subscription plans and prices |
| `faqs.ts` | FAQ, with `answer: null` for anything unconfirmed |
| `reader-corner.ts` | Approved reader submissions (intentionally empty) |
| `types.ts` | The schema all of the above satisfies |
| `index.ts` | The single import surface + the search index |

**Moving to a CMS** (Sanity, Payload, Strapi, Contentful) means rewriting the
accessors in `src/content/index.ts` to fetch instead of import. The types stay
the same, so no component changes. The `types.ts` interfaces map directly onto
CMS schemas.

---

## Design system

Tokens live in `src/app/globals.css` under `@theme`. Components consume tokens
only — no component hard-codes a hex value.

- **Palette** sampled from the two supplied logos: KidsChron blue `#1d4189`,
  KidsChron red `#d0201f`, Prakritik navy `#12324f`, Prakritik greens
  `#6e9e28` / `#2a4718`, plus a warm yellow accent `#fbb914`.
- **Type**: Fraunces (display) + Inter (body), both self-hosted variable fonts
  in `public/fonts/` — no third-party font request, no layout shift. Headings
  use Fraunces' `SOFT` axis for warmth with `WONK` at 0 for legibility.
- **Illustration**: twelve hand-built SVG scenes in
  `components/ui/ArtScene.tsx` instead of stock photography — zero network
  requests, perfect at any size, and nothing that looks like a stock library.
  Real photography can be added later via `Artwork.imageUrl`.
- **Motion**: reveal-on-scroll and floating elements, all disabled under
  `prefers-reduced-motion`, and content stays visible if JavaScript fails.

---

## Accessibility

- Semantic landmarks, one `h1` per page, ordered heading levels
- Skip-to-content link; visible 3px focus rings on everything interactive
- Every form control has a real `<label>`; errors use `aria-invalid`,
  `aria-describedby` and `role="alert"`
- Minimum 44px touch targets throughout
- `prefers-reduced-motion` fully respected
- The FAQ, puzzle answers and mobile navigation use native `<details>`,
  so they work without JavaScript
- Search is a plain GET form and works with JavaScript disabled

---

## SEO

Semantic HTML, per-page metadata and canonicals, Open Graph, a generated
`sitemap.xml` and `robots.txt`, and JSON-LD for Organization, WebSite,
Article, Quiz, Event, BreadcrumbList, FAQPage and Product/Offer.

Structured data only ever asserts things that are true — there is no
`aggregateRating`, no review count and no award markup, and the FAQ schema
includes only questions that actually have confirmed answers.

---

## The subscription and payment architecture

`src/lib/payments/`

The model exists to enforce one rule:

> **A subscription is never shown as paid until something has actually
> confirmed the money arrived.**

Order statuses: `created → payment_initiated → payment_reported →
payment_verified → active`, with `payment_failed`, `refund_requested`,
`refunded` and `cancelled`. `payment_reported` means *the subscriber typed in
a transaction reference* — a claim, not a confirmation.

- `gateway.ts` defines a small `PaymentGateway` interface. `offlineGateway`
  (the default) is the real UPI/NEFT route KidsChron uses today, with manual
  verification. `razorpayGateway()` is wired and activates the moment keys are
  present.
- `/api/payments/webhook` is the **only** code path that can mark a payment
  verified, and it refuses anything without a valid HMAC signature.
- The confirmation screen's wording is derived from the order status by
  `paymentStatementFor()`, so no component can accidentally claim success.

---

## Child safety

Treated as a product requirement, not a policy page.

- The submission form asks for a **first name only** — there is no surname
  field anywhere
- A parent or guardian's name, email and explicit consent are required, and
  enforced **server-side** in `/api/forms`, not only in the browser
- School is never published; city is published only with a separate opt-in
- Nothing is published automatically; every entry is queued for review
- No child accounts, no public profiles, no child-to-child messaging
- Quiz results are never stored or transmitted
- The site never claims to be "100% safe" or COPPA/GDPR/DPDP compliant —
  those claims need legal review, and `/privacy` and `/terms` say so plainly

---

## What is real and what is sample content

**Authoritative** (supplied by KidsChron, never invented): brand messages,
mission, the 12 print sections, subscription plans and prices, bank details,
contact details, the organisation name, and both logos.

**Sample content** (clearly labelled in the interface with a "Sample content"
badge, and marked `provenance: "sample"` in the data): all articles, quizzes,
puzzles, competitions and editions. These are written on accurate, evergreen
subjects so nothing is factually false, but they are **not** official KidsChron
editorial and should be replaced before launch.

**Deliberately empty**: the Reader Corner and the testimonials. Those spaces
belong to real children and real families. They render as labelled open slots
rather than being filled with invented quotes and submissions.

---

## Things that need connecting before launch

Nothing below is guessed at in the code — each one is a marked, explicit gap.

| What | Where | Currently |
|---|---|---|
| **UPI QR code** | `payment.qrImage` in `src/content/site.ts` | A labelled placeholder frame. Drop the verified QR at `public/brand/upi-qr.png` and set the path. No QR is invented. |
| **Form delivery** | `KIDSCHRON_WEBHOOK_URL` or `RESEND_API_KEY` + `KIDSCHRON_NOTIFY_EMAIL` | Submissions are validated and logged server-side only. The UI **tells the visitor** when nothing received it and gives them the phone number instead. |
| **Order storage** | `src/lib/orders.ts` | In-memory (process lifetime). Swap the three functions for database calls and set `store.durable = true`. |
| **Payment gateway** | `RAZORPAY_KEY_ID` etc. | Offline UPI/NEFT with manual verification — which is how KidsChron takes payment today. |
| **Social accounts** | `socials` in `src/content/site.ts` | Rendered as disabled, labelled slots. No handles invented. |
| **Publication frequency** | `publication.frequency` | `null`. The FAQ says it is unconfirmed rather than guessing "fortnightly" from 24 editions/year. |
| **Delivery timeline, refund & cancellation policy** | `/terms` | Marked as outstanding on the page itself. |
| **Privacy/terms legal review** | `/privacy`, `/terms` | Drafted and flagged for review against India's DPDP Act 2023. |

Copy `.env.example` to `.env.local` and fill in what you have.

---

## Adding content

**A new article** — add an entry to `src/content/articles.ts`. It appears
automatically in the Knowledge Hub, its category page, search, the sitemap and
related-article lists.

**A new category** — add an entry to `src/content/categories.ts`. A page,
navigation entry and colour treatment are generated from it.

**A new edition** — add an entry to `src/content/editions.ts` and set
`isCurrent: true`. The homepage, the archive and the "this month" panels update.

**Switch the Theme of the Month** — edit `monthlyTheme` in
`src/content/editions.ts`.

---

## Admin / CMS notes

There is no admin UI in this build. The content model was designed so one can
be added without restructuring: every content type is a flat, typed record with
a slug, and every editor-owned homepage slot is already isolated in
`src/content/homepage.ts`.

A future dashboard would cover: articles (create, edit, schedule, feature),
editions (cover, stories, activities), quizzes, puzzles, competitions
(including entries and moderation), reader submissions (review, approve,
reject, publish), subscriptions (status, payment, delivery), homepage
highlights, FAQs and announcements.

---

© Prakritik India Initiatives Pvt. Ltd. — *Because Curious Minds Build a
Better World!*
