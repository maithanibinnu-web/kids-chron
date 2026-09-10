/**
 * KIDSCHRON CONTENT MODEL
 * ------------------------------------------------------------------
 * These types are the contract between the editorial layer and the UI.
 * Today they are satisfied by local TypeScript files in /src/content.
 * Tomorrow they can be satisfied by a headless CMS (Sanity / Payload /
 * Strapi / Contentful) with zero changes to any component, because
 * every component imports from `@/content` — never from a data file.
 *
 * RULE: no component may hard-code editorial copy that an editor
 * should be able to change. If an editor would want to change it,
 * it belongs in this layer.
 */

/** Every editorially-authored record carries provenance. `sample`
 *  records are demonstration content shipped with the build and are
 *  labelled as such in the UI so nothing invented reads as official. */
export type ContentProvenance = "sample" | "official";

export interface Timestamped {
  publishedAt: string; // ISO date
  updatedAt?: string;
}

/** Age bands. Optional on every record: the taxonomy exists so it can
 *  be applied progressively, not retro-fitted onto all content. */
export type AgeBand = "6-8" | "9-11" | "12+";

export const AGE_BANDS: { id: AgeBand; label: string; short: string }[] = [
  { id: "6-8", label: "6–8 years", short: "6–8" },
  { id: "9-11", label: "9–11 years", short: "9–11" },
  { id: "12+", label: "12+ years", short: "12+" },
];

/** The nine knowledge categories. `theme` drives colour/iconography
 *  so a new category needs no component changes. */
export type CategoryTheme = "blue" | "leaf" | "sun" | "coral" | "navy";

export interface Category {
  slug: string;
  name: string;
  /** Child-facing one-liner used on discovery cards. */
  tagline: string;
  /** Parent/SEO-facing description used on category landing pages. */
  description: string;
  theme: CategoryTheme;
  icon: IconName;
  /** Which top-level nav group this category sits under. */
  group: "explore" | "learn";
}

export type IconName =
  | "atom"
  | "leaf"
  | "globe"
  | "flag"
  | "recycle"
  | "scroll"
  | "trophy"
  | "chip"
  | "brain"
  | "rocket"
  | "paw"
  | "palette"
  | "book"
  | "bulb"
  | "heart"
  | "puzzle"
  | "quiz"
  | "pen"
  | "camera"
  | "hands"
  | "shield"
  | "sparkle"
  | "search"
  | "compass";

/** Editorial pillars. Every content record declares which learning
 *  outcomes it serves — this is what makes the site a curriculum
 *  rather than a pile of articles, and it powers "why this matters"
 *  messaging in the Parent Zone. */
export type EditorialPillar =
  | "knowledge"
  | "curiosity"
  | "critical-thinking"
  | "creativity"
  | "communication"
  | "empathy"
  | "problem-solving"
  | "citizenship"
  | "environment"
  | "healthy-habits";

export const PILLAR_LABELS: Record<EditorialPillar, string> = {
  knowledge: "Knowledge",
  curiosity: "Curiosity",
  "critical-thinking": "Critical Thinking",
  creativity: "Creativity",
  communication: "Communication",
  empathy: "Empathy",
  "problem-solving": "Problem Solving",
  citizenship: "Responsible Citizenship",
  environment: "Environmental Awareness",
  "healthy-habits": "Healthy Learning Habits",
};

/** The four content modes the information architecture balances. */
export type ContentMode = "inform" | "engage" | "inspire" | "create";

/** Artwork is described, not sourced from stock. `art` selects one of
 *  the built-in illustrated covers so the site ships with zero image
 *  weight; a CMS can later add `imageUrl` and the card falls back to
 *  the illustration when it is absent. */
export interface Artwork {
  art: ArtKey;
  imageUrl?: string;
  alt: string;
}

export type ArtKey =
  | "space"
  | "wildlife"
  | "ocean"
  | "forest"
  | "lab"
  | "circuit"
  | "monument"
  | "stadium"
  | "globe"
  | "weather"
  | "art"
  | "leaves"
  | "harvest";

export interface Article extends Timestamped {
  slug: string;
  title: string;
  /** One-sentence card summary. Plain language, no clickbait. */
  summary: string;
  category: string; // Category.slug
  ageBands?: AgeBand[];
  pillars: EditorialPillar[];
  mode: ContentMode;
  readingMinutes: number;
  artwork: Artwork;
  provenance: ContentProvenance;
  featured?: boolean;
  /** Body is authored as structured blocks, not an HTML string, so a
   *  CMS can render the same content to print and web. */
  body: Block[];
  /** Slugs of related articles; empty means "derive from category". */
  related?: string[];
}

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "factbox"; title: string; items: string[] }
  | { type: "question"; text: string }; // "Think about it" prompt

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options`. */
  answerIndex: number;
  /** Always shown after answering — the explanation is the lesson,
   *  the score is not. */
  explanation: string;
}

export interface Quiz {
  slug: string;
  title: string;
  summary: string;
  category: string;
  ageBands?: AgeBand[];
  pillars: EditorialPillar[];
  artwork: Artwork;
  provenance: ContentProvenance;
  questions: QuizQuestion[];
}

export type PuzzleKind =
  | "riddle"
  | "brain-teaser"
  | "word"
  | "logic"
  | "maze"
  | "number"
  | "crossword"
  | "wordsearch";

export interface Puzzle {
  slug: string;
  kind: PuzzleKind;
  title: string;
  /** The puzzle itself, as text. Grid-based puzzles carry a `grid`. */
  prompt: string;
  hint?: string;
  answer: string;
  /** Learning note revealed with the answer. */
  learn?: string;
  difficulty: 1 | 2 | 3;
  ageBands?: AgeBand[];
  provenance: ContentProvenance;
}

export type CompetitionStatus = "upcoming" | "open" | "judging" | "closed";

export interface Competition {
  slug: string;
  title: string;
  category: string;
  summary: string;
  status: CompetitionStatus;
  artwork: Artwork;
  provenance: ContentProvenance;
  /** Dates and prizes are deliberately optional. When an editor has
   *  not supplied them the UI shows an explicit "to be announced"
   *  state rather than inventing a value. */
  opensOn?: string;
  closesOn?: string;
  announcedOn?: string;
  eligibility?: string;
  prizes?: string[];
  rules: string[];
  howToEnter: string[];
  faqs?: FaqItem[];
}

export interface Edition {
  slug: string;
  /** e.g. "Volume 2 · Issue 7" */
  issueLabel: string;
  month: string; // "September 2026"
  themeTitle: string;
  themeBlurb: string;
  coverArt: ArtKey;
  coverAlt: string;
  provenance: ContentProvenance;
  highlights: { section: string; headline: string }[];
  /** Slugs of articles carried in this edition. */
  articles: string[];
  quiz?: string;
  competition?: string;
  puzzleCount: number;
  pageCount: number;
  isCurrent?: boolean;
}

/** The Theme of the Month is a homepage slot an editor owns entirely. */
export interface MonthlyTheme {
  title: string;
  month: string;
  description: string;
  art: ArtKey;
  articleSlugs: string[];
  quizSlug?: string;
  competitionSlug?: string;
  recommendedReading: string[];
  provenance: ContentProvenance;
}

export type SubmissionCategory =
  | "story"
  | "poem"
  | "artwork"
  | "photography"
  | "diy"
  | "idea"
  | "experiment";

export interface ReaderSubmission {
  id: string;
  /** First name + class only. Never a full name, school and city
   *  together — see the privacy rules in /src/content/site.ts. */
  displayName: string;
  ageOrClass: string;
  city?: string;
  category: SubmissionCategory;
  title: string;
  excerpt: string;
  art: ArtKey;
  provenance: ContentProvenance;
  /** Only `approved` items are ever rendered publicly. */
  status: "approved";
}

export interface SubscriptionPlan {
  id: "six-month" | "yearly";
  name: string;
  editions: number;
  months: number;
  /** All amounts in whole rupees. */
  regularPrice: number;
  offerPrice: number;
  /** Derived, but stored so an editor can override the displayed
   *  figure if a plan's arithmetic ever changes. */
  savings: number;
  perMonthReference: number;
  highlight?: string;
  recommended?: boolean;
  inclusions: string[];
}

export interface FaqItem {
  question: string;
  /** `answer` may be null when an official answer has not been
   *  established — the UI then shows a "coming soon" state instead of
   *  a plausible-sounding invention. */
  answer: string | null;
  group?: string;
}

export interface Testimonial {
  /** Placeholder testimonials carry `placeholder: true` and render as
   *  an empty slot inviting a real story. No fabricated quotes. */
  placeholder: boolean;
  quote?: string;
  author?: string;
  role?: string;
}

/** Anything searchable is normalised to this shape. */
export interface SearchDoc {
  id: string;
  type: "article" | "quiz" | "puzzle" | "competition" | "edition" | "reader" | "page";
  title: string;
  summary: string;
  href: string;
  category?: string;
  ageBands?: AgeBand[];
  date?: string;
  keywords: string;
}
