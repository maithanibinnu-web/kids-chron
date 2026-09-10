import Link from "next/link";
import { HeroScene } from "./HeroScene";
import { DidYouKnow } from "./DidYouKnow";
import { ArticleCard, ArticleListItem } from "@/components/cards/ArticleCard";
import {
  CategoryCard,
  CompetitionCard,
  EditionCard,
  QuizCard,
  SubscriptionPlanCard,
  TestimonialCard,
} from "@/components/cards/cards";
import { PuzzleCard } from "@/components/cards/cards";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import {
  Button,
  ButtonLink,
  Card,
  Chip,
  Highlight,
  Container,
  Rule,
  SampleBadge,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { PrakritikLogo } from "@/components/brand/Logo";
import {
  articleBySlug,
  categories,
  competitions,
  contentModes,
  currentEdition,
  discoverChips,
  familyActivities,
  featuredArticles,
  monthlyTheme,
  plans,
  positiveMinds,
  puzzles,
  quizzes,
  readerGroups,
  site,
  sortedArticles,
  testimonials,
  todaysCuriosity,
  themeStyles,
  whatsInside,
  whyAnswer,
  whyPoints,
  microcopy,
  articlesByCategory,
} from "@/content";

/* ============================================================
   1 · HERO
   ============================================================ */

const heroStars = Array.from({ length: 64 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 61 + 7) % 92}%`,
  size: `${1.5 + (index % 3) * 0.75}px`,
  delay: `${(index % 9) * 0.38}s`,
  duration: `${2.6 + (index % 5) * 0.45}s`,
}));

export function Hero() {
  return (
    <section className="kidschron-space-hero relative isolate overflow-hidden text-white">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {heroStars.map((star, index) => (
          <span
            key={index}
            className="hero-space-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
        <span className="hero-planet hero-planet-warm" />
        <span className="hero-planet-ring" />
        <span className="hero-planet hero-planet-violet" />
      </div>
      <Container className="relative z-10 grid items-center gap-12 pb-28 pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-36 lg:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white shadow-soft ring-1 ring-white/25 backdrop-blur-sm">
            <Icon name="sparkle" className="h-3.5 w-3.5" strokeWidth={2.2} />
            {microcopy.heroKicker}
          </p>

          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.1rem]">
            The Newspaper for <Highlight>Curious Minds</Highlight>
          </h1>

          <p className="mt-5 font-display text-2xl text-sun-300 sm:text-[1.75rem]">
            Read. Discover. Think. Grow.
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-blue-50/90">
            Twelve printed pages of news, science, nature, history and sport —
            written for young readers, with puzzles, quizzes and space for their
            own stories and artwork. {site.supporting}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/subscribe" variant="sun" size="lg">
              Subscribe Now
            </ButtonLink>
            <ButtonLink href="/whats-inside" variant="onDark" size="lg">
              Explore KidsChron
            </ButtonLink>
          </div>

          <p className="mt-5">
            <Link
              href={`/editions/${currentEdition().slug}`}
              className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-sun-200 underline decoration-white/30 decoration-2 underline-offset-4 hover:decoration-sun-300"
            >
              Read this month&apos;s highlights
              <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </p>

          <div className="mt-9 flex items-center gap-3.5 border-t border-white/15 pt-6">
            <PrakritikLogo size={44} />
            <p className="text-sm leading-snug text-blue-100">
              An initiative of{" "}
              <span className="font-semibold text-white">{site.legalEntity}</span>
              <br />
              <span className="text-[0.8rem]">{site.philosophy.join(" | ")}</span>
            </p>
          </div>
        </div>

        <div className="lg:pl-4">
          <HeroScene />
        </div>
      </Container>
      <div aria-hidden className="absolute inset-x-0 bottom-[-1px] z-20 h-16 sm:h-20 lg:h-24">
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="h-full w-full">
          <path fill="var(--color-paper)" d="M0 50c236 43 472-33 720-8 256 26 483-18 720 13v41H0Z" />
        </svg>
      </div>
    </section>
  );
}

/* ============================================================
   2 · DISCOVER PICKER
   ============================================================ */

export function DiscoverPicker() {
  return (
    <section className="border-y border-line bg-paper py-8">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <h2 className="shrink-0 font-display text-xl text-navy-900 lg:text-[1.35rem]">
            {microcopy.discoverPrompt}
          </h2>
          <ul className="flex snap-x gap-2 overflow-x-auto pb-1 no-scrollbar lg:flex-wrap lg:overflow-visible">
            {discoverChips.map((c) => (
              <li key={c.label} className="snap-start">
                <Link
                  href={c.href}
                  className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-navy-200 bg-paper px-4 py-2 text-[0.9rem] font-semibold text-navy-800 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800 motion-safe:hover:-translate-y-0.5"
                >
                  <Icon name={c.icon} className="h-4 w-4 text-blue-600" strokeWidth={2} />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   3 · WHY KIDSCHRON
   ============================================================ */

export function WhyKidsChron() {
  return (
    <Section tone="cream" labelledBy="why-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="why-heading"
            kicker="Why KidsChron?"
            title="Children today meet more information than any generation before them."
            lead="Very little of it arrives sorted, checked or written for them. KidsChron is not a complaint about that — it is a practical answer to it."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <Card className="h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-50 text-navy-700">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg leading-snug">{p.title}</h3>
                <p className="mt-2 text-[0.92rem] text-ink-soft">{p.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-6 overflow-hidden rounded-xl2 bg-leaf-50 ring-1 ring-inset ring-leaf-200">
            <div className="grid gap-6 p-7 sm:p-9 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-9">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-leaf-600 text-white">
                <Icon name="book" className="h-7 w-7" />
              </span>
              <div>
                <h3 className="text-2xl text-leaf-900">{whyAnswer.heading}</h3>
                <p className="mt-2.5 max-w-3xl text-[1.02rem] leading-relaxed text-leaf-800">
                  {whyAnswer.body}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   4 · DISCOVER THE WORLD
   ============================================================ */

export function DiscoverTheWorld() {
  return (
    <Section tone="paper" labelledBy="discover-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              id="discover-heading"
              kicker="Discover the World"
              title="Nine ways in. Start anywhere."
              lead="Every subject in KidsChron is a door, not a syllabus. Follow whichever one looks interesting today."
            />
          </Reveal>
          <Reveal delay={100}>
            <ButtonLink href="/explore" variant="secondary">
              See the Knowledge Hub
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={(i % 3) * 80}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ============================================================
   5 · THE FOUR MODES — inform / engage / inspire / create
   ============================================================ */

export function ContentModes() {
  return (
    <Section tone="navy" className="relative overflow-hidden" labelledBy="modes-heading">
      <div aria-hidden className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div aria-hidden className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-leaf-500/15 blur-3xl" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            id="modes-heading"
            kicker="How KidsChron works"
            invert
            align="center"
            title="Four things every edition tries to do"
            lead="Inform, engage, inspire and create — in every issue, and across this whole site."
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contentModes.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 90}>
              <Link
                href={m.href}
                className="group flex h-full flex-col rounded-card bg-navy-800/70 p-6 ring-1 ring-inset ring-navy-700 transition-all hover:bg-navy-800 hover:ring-navy-600 motion-safe:hover:-translate-y-1"
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${
                    { blue: "bg-blue-500", sun: "bg-sun-400 text-navy-900", coral: "bg-coral-500", leaf: "bg-leaf-500" }[m.theme]
                  } text-white`}
                >
                  <Icon name={m.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl text-white">{m.label}</h3>
                <p className="mt-2 flex-1 text-[0.92rem] text-navy-200">{m.line}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-sun-300">
                  {m.cta}
                  <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ============================================================
   6 · THINK & SOLVE
   ============================================================ */

export function ThinkAndSolve() {
  const quiz = quizzes[0];
  const puzzle = puzzles[0];
  return (
    <Section tone="sun" labelledBy="think-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              id="think-heading"
              kicker="Think & Solve"
              title="Thinking, disguised as playing"
              lead="Quizzes, riddles, logic puzzles and brain teasers. Nothing is scored against you and no result is stored — the explanation is the point."
            />
          </Reveal>
          <Reveal delay={100}>
            <ButtonLink href="/play" variant="secondary">
              Challenge Your Mind
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <QuizCard quiz={quiz} />
          </Reveal>
          <Reveal delay={100}>
            <PuzzleCard puzzle={puzzle} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   7 · LEARN EVERY DAY  (featured reading + curiosity + facts)
   ============================================================ */

export function LearnEveryDay() {
  const featured = featuredArticles();
  const lead = featured[0] ?? sortedArticles()[0];
  const rest = sortedArticles()
    .filter((a) => a.slug !== lead.slug)
    .slice(0, 5);

  return (
    <Section tone="paper" labelledBy="learn-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="learn-heading"
            kicker="Learn Every Day"
            title="Something worth knowing, every time you visit"
            lead="Articles from the Knowledge Hub — written to leave a young reader with a question, not only an answer."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <ArticleCard article={lead} size="lg" className="group h-full" />
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={80}>
              <div className="rounded-xl2 bg-blue-50 p-6 ring-1 ring-inset ring-blue-100">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-700 text-white">
                    <Icon name="search" className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </span>
                  <h3 className="text-lg text-blue-900">Today&apos;s Curiosity</h3>
                </div>
                <p className="mt-3 font-display text-xl text-navy-900">
                  {todaysCuriosity.question}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                  {todaysCuriosity.answer}
                </p>
                <p className="mt-3 rounded-xl bg-paper px-4 py-3 text-[0.88rem] text-blue-900 ring-1 ring-inset ring-blue-100">
                  <strong className="font-bold">Try it: </strong>
                  {todaysCuriosity.tryThis}
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <DidYouKnow />
            </Reveal>
          </div>
        </div>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <h3 className="text-xl">Explorer&apos;s pick — more to read</h3>
              <ol className="mt-3">
                {rest.map((a, i) => (
                  <ArticleListItem key={a.slug} article={a} index={i} />
                ))}
              </ol>
            </div>
            <ButtonLink href="/explore" variant="secondary" className="lg:mt-12">
              Discover Something New
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   8 · CREATE & IMAGINE
   ============================================================ */

export function CreateAndImagine() {
  const kinds = [
    { label: "Stories", icon: "book" as const },
    { label: "Poems", icon: "pen" as const },
    { label: "Drawing & Painting", icon: "palette" as const },
    { label: "Photography", icon: "camera" as const },
    { label: "DIY & Crafts", icon: "hands" as const },
    { label: "Experiments", icon: "atom" as const },
  ];
  return (
    <Section tone="cream" labelledBy="create-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              id="create-heading"
              kicker="Create & Imagine"
              title="Reading is half of it. The other half is making something."
              lead="Write a story, draw what you imagined, build something, run an experiment — and send it in. Selected work appears in the Reader Corner and in the printed edition."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/create/submit" size="lg">
                Show Your Creativity
              </ButtonLink>
              <ButtonLink href="/create" variant="secondary" size="lg">
                Creativity Corner
              </ButtonLink>
            </div>
            <p className="mt-4 flex items-start gap-2 text-[0.88rem] text-ink-mute">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" strokeWidth={2} />
              {microcopy.submitNudge}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {kinds.map((k, i) => (
                <li key={k.label}>
                  <div
                    className={`flex items-center gap-3 rounded-card bg-paper p-4 shadow-soft ring-1 ring-line ${
                      i % 2 ? "sm:translate-y-4" : ""
                    }`}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-coral-50 text-coral-600">
                      <Icon name={k.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-navy-900">{k.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   9 · POSITIVE MINDS
   ============================================================ */

export function PositiveMinds() {
  return (
    <Section tone="blue" labelledBy="positive-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading
              id="positive-heading"
              kicker="Positive Minds"
              title="Growing up is a subject too"
              lead="The guidance and counselling pages treat empathy, honesty, decision-making and responsibility as skills that can be learned and practised — not as lectures."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {positiveMinds.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <Card className="h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-coral-50 text-coral-600">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{p.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] text-ink-soft">{p.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   10 · EXPLORE NATURE
   ============================================================ */

export function ExploreNature() {
  const natureArticles = [
    ...articlesByCategory("nature"),
    ...articlesByCategory("environment"),
  ].slice(0, 3);

  return (
    <Section tone="leaf" className="relative overflow-hidden" labelledBy="nature-heading">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
          <path d="M0 120V64c120-28 240 12 360 20s240-20 360-36 240 4 360 24 240 8 360-16v64Z" fill="#c8e3a9" opacity=".55" />
        </svg>
      </div>
      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              id="nature-heading"
              kicker="People | Planet | Positive Change"
              title="Explore Nature"
              lead="Wildlife, forests, rivers and the habits that look after them. Practical and hopeful — never frightening."
            />
          </Reveal>
          <Reveal delay={100}>
            <ButtonLink href="/explore/environment" variant="secondary">
              Environment &amp; Nature
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {natureArticles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 90}>
              <ArticleCard article={a} className="group h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   11 · PARENT & CHILD ZONE
   ============================================================ */

export function ParentChildZone() {
  return (
    <Section tone="paper" labelledBy="family-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="family-heading"
            kicker="Parent & Child Zone"
            title="Things to do together, not things to supervise"
            lead="Short activities built around what is in the edition. Most take fifteen minutes and need nothing you do not already have."
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {familyActivities.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 3) * 80}>
              <Card className="h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sun-100 text-sun-800">
                    <Icon name={a.icon} className="h-5 w-5" />
                  </span>
                  <Chip className="bg-navy-50 text-navy-700 ring-navy-200">{a.minutes}</Chip>
                </div>
                <h3 className="mt-4 text-lg">{a.title}</h3>
                <p className="mt-1.5 text-[0.92rem] text-ink-soft">{a.body}</p>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl2 bg-mist p-6 ring-1 ring-inset ring-line">
            <p className="max-w-2xl text-ink-soft">
              <strong className="font-semibold text-navy-900">For parents: </strong>
              the Parent Zone explains what KidsChron supports, how content is
              chosen, and how submissions and consent are handled.
            </p>
            <ButtonLink href="/parents" variant="secondary">
              Visit the Parent Zone
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   12 · MONTHLY EDITION + THEME OF THE MONTH
   ============================================================ */

export function MonthlyEditionSection() {
  const edition = currentEdition();
  const themeArticles = monthlyTheme.articleSlugs
    .map(articleBySlug)
    .filter(Boolean);

  return (
    <Section tone="cream" labelledBy="edition-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="edition-heading"
            kicker="This month's edition"
            title={
              <>
                {edition.month}: <Highlight tone="leaf">{edition.themeTitle}</Highlight>
              </>
            }
            lead={edition.themeBlurb}
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-12">
          <Reveal>
            <EditionCard edition={edition} />
          </Reveal>

          <div>
            <Reveal delay={80}>
              <h3 className="text-xl">In this edition</h3>
              <ul className="mt-4 divide-y divide-line rounded-card bg-paper ring-1 ring-line">
                {edition.highlights.map((h) => (
                  <li key={h.headline} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-5">
                    <span className="w-44 shrink-0 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-blue-700">
                      {h.section}
                    </span>
                    <span className="font-medium text-navy-900">{h.headline}</span>
                  </li>
                ))}
              </ul>
              {edition.provenance === "sample" && (
                <p className="mt-3">
                  <SampleBadge />
                </p>
              )}
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 rounded-xl2 bg-navy-900 p-6 text-navy-100 sm:p-8">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-sun-300">
                  Theme of the Month · {monthlyTheme.month}
                </p>
                <h3 className="mt-2 text-2xl text-white">{monthlyTheme.title}</h3>
                <p className="mt-2.5 text-navy-200">{monthlyTheme.description}</p>

                <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                  {themeArticles.map((a) => (
                    <li key={a!.slug}>
                      <Link
                        href={`/article/${a!.slug}`}
                        className="flex h-full flex-col rounded-xl bg-navy-800 p-3.5 text-[0.88rem] font-medium text-white ring-1 ring-inset ring-navy-700 transition-colors hover:bg-navy-700"
                      >
                        {a!.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={`/editions/${edition.slug}`} variant="onDark">
                    See the full edition
                  </ButtonLink>
                  <ButtonLink href="/subscribe" variant="sun">
                    Subscribe Now
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   13 · WHAT'S INSIDE — the 12 printed pages
   ============================================================ */

export function WhatsInsideGrid() {
  return (
    <Section tone="paper" labelledBy="inside-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="inside-heading"
            align="center"
            kicker="What's Inside KidsChron?"
            title="Twelve pages. Twelve different reasons to keep reading."
            lead="Every edition carries the same spine of sections, so a young reader always knows where to find their favourite part — and always meets something new next to it."
          />
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {whatsInside.map((s, i) => {
            const st = themeStyles[s.theme];
            return (
              <Reveal as="li" key={s.section} delay={(i % 3) * 70}>
                <div className={`flex h-full items-start gap-4 rounded-card ${st.tint} p-5 ring-1 ring-inset ${st.chipRing}`}>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-paper ${st.accent}`}>
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-mute">
                      Page {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[1.05rem] leading-snug">{s.section}</h3>
                    <p className="mt-1 text-[0.88rem] text-ink-soft">{s.blurb}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <p className="mt-10 text-center">
            <ButtonLink href="/whats-inside" variant="secondary" size="lg">
              See a full edition, section by section
            </ButtonLink>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   14 · COMPETITIONS
   ============================================================ */

export function CompetitionsStrip() {
  const shown = competitions.slice(0, 3);
  return (
    <Section tone="cream" labelledBy="comp-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              id="comp-heading"
              kicker="Competitions & Challenges"
              title="Enter something. Win something. Learn something."
              lead="Drawing, writing, general knowledge and science challenges run through the year. Where a date or a prize has not been announced yet, we say so rather than guessing."
            />
          </Reveal>
          <Reveal delay={100}>
            <ButtonLink href="/competitions" variant="secondary">
              All competitions
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <CompetitionCard competition={c} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   15 · READER CORNER
   ============================================================ */

export function ReaderCornerStrip() {
  return (
    <Section tone="mist" labelledBy="reader-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="reader-heading"
            kicker="Reader Corner"
            title="This space belongs to young readers"
            lead="Selected stories, poems, artwork, experiments and ideas sent in by children — reviewed by the editorial team, published only with a parent or guardian's consent."
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {readerGroups.map((g, i) => (
            <Reveal as="li" key={g.id} delay={i * 80}>
              <div className="flex h-full flex-col rounded-card border-2 border-dashed border-navy-200 bg-paper/70 p-6">
                <h3 className="text-lg">{g.title}</h3>
                <p className="mt-1.5 text-[0.9rem] text-ink-soft">{g.blurb}</p>
                <p className="mt-4 flex-1 rounded-xl bg-mist px-3.5 py-3 text-[0.85rem] italic text-ink-mute">
                  {g.invitation}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl2 bg-navy-900 p-6 text-navy-100 sm:p-8">
            <div>
              <h3 className="text-xl text-white">Be one of the first</h3>
              <p className="mt-1.5 max-w-2xl text-navy-200">
                Nothing here is invented. Every piece that appears will be real
                work by a real young reader, checked by the editorial team.
              </p>
            </div>
            <ButtonLink href="/create/submit" variant="sun">
              Submit Your Creation
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   16 · FOR SCHOOLS
   ============================================================ */

export function SchoolsCta() {
  return (
    <Section tone="paper" labelledBy="schools-heading">
      <Container>
        <div className="overflow-hidden rounded-blob bg-gradient-to-br from-navy-900 to-blue-800 text-navy-100">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <Reveal>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-sun-300">
                For schools &amp; institutions
              </p>
              <h2 id="schools-heading" className="mt-2.5 text-3xl text-white sm:text-4xl">
                Bring KidsChron to Your School
              </h2>
              <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-navy-200">
                Copies for a class, a year group or the library. School
                competitions, reader contributions and knowledge activities that
                fit into a reading period. Tell us what you need and we will work
                out the arrangement with you.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/schools" variant="onDark" size="lg">
                  School &amp; Institution Zone
                </ButtonLink>
                <ButtonLink href="/schools#enquiry" variant="sun" size="lg">
                  Make an Enquiry
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {[
                  "Institutional subscriptions",
                  "In-school competitions",
                  "Reader contributions",
                  "Puzzle & quiz activities",
                  "Workshops on request",
                  "Library reading copies",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3 text-[0.92rem] font-medium text-white ring-1 ring-inset ring-white/15"
                  >
                    <Icon name="shield" className="h-4 w-4 shrink-0 text-leaf-300" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   17 · SUBSCRIPTION
   ============================================================ */

export function SubscriptionSection() {
  return (
    <Section tone="cream" id="subscribe" labelledBy="sub-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="sub-heading"
            align="center"
            kicker="Subscription"
            title="Get KidsChron delivered"
            lead="Twelve printed pages, delivered to your address. Choose the plan that suits you — both are currently on offer."
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <SubscriptionPlanCard plan={p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-8 max-w-4xl">
            <Rule />
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { icon: "shield" as const, t: "Pay by UPI or bank transfer", d: "NEFT, IMPS, UPI or bank transfer to the KidsChron account. Your reference number confirms it." },
                { icon: "book" as const, t: "12 pages every edition", d: "News, knowledge, activities, puzzles and reader work in every issue." },
                { icon: "hands" as const, t: "Questions before you subscribe?", d: "Call or email — the team is in Dehradun and answers directly." },
              ].map((f) => (
                <div key={f.t} className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">{f.t}</p>
                    <p className="mt-0.5 text-[0.88rem] text-ink-soft">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   18 · TESTIMONIALS  (placeholders only — never invented)
   ============================================================ */

export function Testimonials() {
  return (
    <Section tone="paper" labelledBy="testimonial-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonial-heading"
            align="center"
            kicker="From our readers"
            title="We would rather leave this empty than make it up"
            lead="These slots are reserved for real parents, students and schools. Nothing here is written by us."
          />
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 90}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </ul>
        <Reveal delay={120}>
          <p className="mt-8 text-center text-[0.92rem] text-ink-mute">
            Already reading KidsChron?{" "}
            <Link href="/contact" className="font-semibold text-blue-700 underline underline-offset-4">
              Tell us how it is going
            </Link>{" "}
            — with your permission we would love to put your words here.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   Closing band
   ============================================================ */

export function ClosingBand() {
  return (
    <section className="bg-sun-400">
      <Container className="py-12 text-center">
        <p className="font-display text-2xl text-navy-900 sm:text-3xl">
          {site.closing}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/subscribe" size="lg" variant="primary">
            Subscribe to KidsChron
          </ButtonLink>
          <ButtonLink href="/explore" size="lg" variant="onDark">
            Start Exploring
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/** Re-export so the page file reads as a table of contents. */
export { Button };
