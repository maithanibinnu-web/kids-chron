import Link from "next/link";
import { ArtScene } from "@/components/ui/ArtScene";
import { Icon } from "@/components/ui/Icon";
import { Card, Chip, SampleBadge, ButtonLink } from "@/components/ui/primitives";
import {
  COMPETITION_STATUS,
  PUZZLE_KIND_LABELS,
  categoryBySlug,
  formatINR,
  styleFor,
  themeStyles,
  type Category,
  type Competition,
  type Edition,
  type Puzzle,
  type Quiz,
  type SubscriptionPlan,
  type Testimonial,
} from "@/content";

/* ============================================================
   CategoryCard — the child's main discovery surface
   ============================================================ */

export function CategoryCard({ category }: { category: Category }) {
  const s = themeStyles[category.theme];
  return (
    <Link
      href={`/explore/${category.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-card ${s.tint} p-5 ring-1 ring-inset ${s.chipRing} transition-all duration-300 hover:shadow-lift motion-safe:hover:-translate-y-1`}
    >
      <span
        aria-hidden
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${s.glow} to-transparent opacity-70 transition-transform duration-500 motion-safe:group-hover:scale-125`}
      />
      <span className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-paper ${s.accent} shadow-soft`}>
        <Icon name={category.icon} className="h-6 w-6" />
      </span>
      <h3 className="relative mt-4 text-lg">{category.name}</h3>
      <p className="relative mt-1 text-[0.88rem] text-ink-soft">{category.tagline}</p>
      <span className={`relative mt-4 inline-flex items-center gap-1 text-[0.82rem] font-bold ${s.accent}`}>
        Explore
        <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

/* ============================================================
   QuizCard
   ============================================================ */

export function QuizCard({ quiz }: { quiz: Quiz }) {
  const cat = categoryBySlug(quiz.category);
  const s = styleFor(quiz.category);
  return (
    <Card as="article" interactive className="flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden">
        <ArtScene art={quiz.artwork.art} alt={quiz.artwork.alt} className="h-full w-full" />
        <Chip className="absolute left-3 top-3 bg-paper/95 text-navy-800 ring-navy-200 backdrop-blur">
          <Icon name="quiz" className="h-3.5 w-3.5" strokeWidth={2} />
          {quiz.questions.length} questions
        </Chip>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Chip className={`${s.chipBg} ${s.chipText} ${s.chipRing} self-start`}>{cat?.name}</Chip>
        <h3 className="mt-3 text-xl">
          <Link href={`/play/quizzes/${quiz.slug}`} className="after:absolute after:inset-0 hover:text-blue-800">
            {quiz.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.94rem] text-ink-soft">{quiz.summary}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
          <span className="text-sm font-bold text-blue-700">Start quiz →</span>
          {quiz.provenance === "sample" && <SampleBadge />}
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   PuzzleCard — answer hidden behind a native <details>
   ============================================================ */

export function PuzzleCard({ puzzle }: { puzzle: Puzzle }) {
  return (
    <Card as="article" id={puzzle.slug} className="scroll-mt-28 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Chip className="bg-sun-50 text-sun-800 ring-sun-200">
          <Icon name="puzzle" className="h-3.5 w-3.5" strokeWidth={2} />
          {PUZZLE_KIND_LABELS[puzzle.kind]}
        </Chip>
        <span
          className="flex items-center gap-1 text-[0.75rem] font-semibold text-ink-mute"
          aria-label={`Difficulty ${puzzle.difficulty} of 3`}
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              aria-hidden
              className={`h-1.5 w-4 rounded-full ${n <= puzzle.difficulty ? "bg-coral-400" : "bg-navy-100"}`}
            />
          ))}
        </span>
        {puzzle.provenance === "sample" && <SampleBadge className="ml-auto" />}
      </div>

      <h3 className="mt-3 text-xl">{puzzle.title}</h3>
      <p className="mt-2 text-ink-soft">{puzzle.prompt}</p>

      <div className="mt-4 space-y-2">
        {puzzle.hint && (
          <details className="group rounded-xl bg-blue-50 px-4 py-3 ring-1 ring-inset ring-blue-100">
            <summary className="cursor-pointer list-none text-sm font-bold text-blue-800 [&::-webkit-details-marker]:hidden">
              Need a nudge? <span className="font-normal group-open:hidden">Show hint</span>
            </summary>
            <p className="mt-2 text-[0.92rem] text-blue-900">{puzzle.hint}</p>
          </details>
        )}
        <details className="group rounded-xl bg-leaf-50 px-4 py-3 ring-1 ring-inset ring-leaf-200">
          <summary className="cursor-pointer list-none text-sm font-bold text-leaf-800 [&::-webkit-details-marker]:hidden">
            Had a proper go? <span className="font-normal group-open:hidden">Check the answer</span>
          </summary>
          <p className="mt-2 text-[0.92rem] text-leaf-900">{puzzle.answer}</p>
          {puzzle.learn && (
            <p className="mt-3 border-t border-leaf-200 pt-3 text-[0.88rem] text-leaf-800">
              <strong className="font-bold">What this teaches: </strong>
              {puzzle.learn}
            </p>
          )}
        </details>
      </div>
    </Card>
  );
}

/* ============================================================
   CompetitionCard
   ============================================================ */

export function CompetitionCard({ competition }: { competition: Competition }) {
  const status = COMPETITION_STATUS[competition.status];
  const toneClass = {
    open: "bg-leaf-100 text-leaf-800 ring-leaf-300",
    soon: "bg-sun-100 text-sun-900 ring-sun-300",
    closed: "bg-navy-100 text-navy-700 ring-navy-200",
  }[status.tone];

  return (
    <Card as="article" interactive className="flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden">
        <ArtScene art={competition.artwork.art} alt={competition.artwork.alt} className="h-full w-full" />
        <Chip className={`absolute left-3 top-3 ${toneClass} backdrop-blur`}>{status.label}</Chip>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl">
          <Link href={`/competitions/${competition.slug}`} className="after:absolute after:inset-0 hover:text-blue-800">
            {competition.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.94rem] text-ink-soft">{competition.summary}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
          <span className="text-sm font-bold text-blue-700">
            {competition.status === "open" ? "How to enter →" : "See details →"}
          </span>
          {competition.provenance === "sample" && <SampleBadge />}
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   EditionCard
   ============================================================ */

export function EditionCard({ edition }: { edition: Edition }) {
  return (
    <Card as="article" interactive className="flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-navy-900">
        <ArtScene art={edition.coverArt} alt={edition.coverAlt} className="h-full w-full" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sun-300">
            {edition.issueLabel} · {edition.month}
          </p>
          <p className="font-display text-2xl text-white">{edition.themeTitle}</p>
        </div>
        {edition.isCurrent && (
          <Chip className="absolute right-3 top-3 bg-coral-500 text-white ring-coral-400">
            Current edition
          </Chip>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex-1 text-[0.94rem] text-ink-soft">{edition.themeBlurb}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5 text-[0.8rem] text-ink-mute">
          <span>
            {edition.pageCount} pages · {edition.puzzleCount} puzzles
          </span>
          <Link href={`/editions/${edition.slug}`} className="font-bold text-blue-700 after:absolute after:inset-0">
            What&apos;s inside →
          </Link>
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   SubscriptionPlanCard
   ============================================================ */

export function SubscriptionPlanCard({
  plan,
  href = "/subscribe/checkout",
  compact = false,
}: {
  plan: SubscriptionPlan;
  href?: string;
  compact?: boolean;
}) {
  const featured = plan.recommended;
  return (
    <Card
      as="article"
      className={`flex flex-col p-6 sm:p-7 ${
        featured
          ? "ring-2 ring-blue-600 shadow-lift"
          : "ring-1 ring-line shadow-soft"
      }`}
    >
      {/* The badge slot is reserved on both cards so the prices sit on
          the same line — a price row that jumps between cards makes the
          two plans harder to compare, which is the one job here. */}
      <div className="mb-4 h-7">
        {featured && (
          <Chip className="bg-blue-700 text-white ring-blue-700">
            <Icon name="sparkle" className="h-3.5 w-3.5" strokeWidth={2} />
            Best value
          </Chip>
        )}
      </div>

      <h3 className="text-2xl">{plan.name}</h3>
      <p className="mt-1 font-semibold text-blue-700">
        {plan.editions} editions · {plan.months} months
      </p>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-4xl text-navy-900">
          {formatINR(plan.offerPrice)}
        </span>
        <span className="text-lg text-ink-mute line-through">
          {formatINR(plan.regularPrice)}
        </span>
        <Chip className="bg-coral-50 text-coral-700 ring-coral-200">
          Save {formatINR(plan.savings)}
        </Chip>
      </div>
      <p className="mt-1.5 text-[0.85rem] text-ink-mute">
        Works out at about {formatINR(plan.perMonthReference)} a month.
      </p>

      {!compact && (
        <ul className="mt-6 flex-1 space-y-2.5 text-[0.94rem] text-ink-soft">
          {plan.inclusions.map((inc) => (
            <li key={inc} className="flex gap-2.5">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" strokeWidth={2} />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      )}

      <ButtonLink
        href={`${href}?plan=${plan.id}`}
        variant={featured ? "primary" : "secondary"}
        size="lg"
        className="mt-7 w-full"
      >
        Subscribe Now
      </ButtonLink>
      <p className="mt-3 text-center text-[0.76rem] text-ink-mute">
        Currently displayed offer. Prices may change.
      </p>
    </Card>
  );
}

/* ============================================================
   TestimonialCard — placeholder-aware. Never invents a quote.
   ============================================================ */

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.placeholder) {
    return (
      <div className="flex h-full flex-col justify-between rounded-card border-2 border-dashed border-navy-200 bg-paper/60 p-6">
        <p className="font-display text-xl leading-snug text-navy-400">
          “Your child&apos;s learning story could appear here.”
        </p>
        <p className="mt-6 text-sm text-ink-mute">
          <span className="font-semibold text-navy-700">{testimonial.role}</span>
          <br />
          Awaiting a real story — we do not write these ourselves.
        </p>
      </div>
    );
  }
  return (
    <figure className="flex h-full flex-col justify-between rounded-card bg-paper p-6 shadow-soft ring-1 ring-line">
      <blockquote className="font-display text-xl leading-snug text-navy-900">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 text-sm text-ink-mute">
        <span className="font-semibold text-navy-800">{testimonial.author}</span>
        {testimonial.role ? <> · {testimonial.role}</> : null}
      </figcaption>
    </figure>
  );
}
