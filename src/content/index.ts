/**
 * CONTENT REPOSITORY — the single import surface for the whole app.
 *
 * Components import from `@/content`, never from an individual data
 * file. Swapping the local data files for CMS queries means changing
 * only this module: every accessor below can become an async fetch
 * without touching a single component.
 */

export * from "./types";
export * from "./site";
export * from "./categories";
export * from "./plans";
export * from "./faqs";
export * from "./articles";
export * from "./quizzes";
export * from "./puzzles";
export * from "./competitions";
export * from "./editions";
export * from "./reader-corner";
export * from "./homepage";

import { articles } from "./articles";
import { quizzes } from "./quizzes";
import { puzzles, PUZZLE_KIND_LABELS } from "./puzzles";
import { competitions } from "./competitions";
import { editions } from "./editions";
import { categories } from "./categories";
import type { SearchDoc } from "./types";

/** Static pages that should be findable through site search. */
const staticPages: SearchDoc[] = [
  { id: "page-about", type: "page", title: "About KidsChron", summary: "What KidsChron is, who makes it and what it is for.", href: "/about", keywords: "about mission prakritik india initiatives organisation who we are" },
  { id: "page-why", type: "page", title: "Why KidsChron", summary: "The case for a printed children's newspaper in an age of endless information.", href: "/why-kidschron", keywords: "why reading habit screen time information fake news distraction" },
  { id: "page-inside", type: "page", title: "What's Inside", summary: "The 12 pages of every edition, section by section.", href: "/whats-inside", keywords: "sections pages cover story wildlife science general knowledge puzzles" },
  { id: "page-subscribe", type: "page", title: "Subscription", summary: "Six-month and yearly plans, prices and how to subscribe.", href: "/subscribe", keywords: "subscribe subscription price plan cost buy order six month yearly ₹899 ₹1299 payment upi neft" },
  { id: "page-parents", type: "page", title: "Parent Zone", summary: "What KidsChron supports, and activities to do together.", href: "/parents", keywords: "parents guardians family activities benefits reading habit" },
  { id: "page-schools", type: "page", title: "Schools & Institutions", summary: "Institutional subscriptions, competitions and collaboration.", href: "/schools", keywords: "school teacher institution library bulk class enquiry partnership" },
  { id: "page-create", type: "page", title: "Creativity Corner", summary: "Stories, art, poems, DIY — and how to send in your own work.", href: "/create", keywords: "creativity art drawing story poem diy submit submission" },
  { id: "page-reader", type: "page", title: "Reader Corner", summary: "Work by young readers, selected and moderated.", href: "/reader-corner", keywords: "reader corner young writers artists thinkers published work" },
  { id: "page-contact", type: "page", title: "Contact Us", summary: "Phone, email and where to find KidsChron.", href: "/contact", keywords: "contact phone email address dehradun uttarakhand support enquiry" },
  { id: "page-faq", type: "page", title: "FAQ", summary: "Common questions about KidsChron and subscriptions.", href: "/faq", keywords: "faq questions help how does delivery payment" },
  { id: "page-resources", type: "page", title: "Extra Resources", summary: "ICT training, counselling sessions and scholarships.", href: "/resources", keywords: "ict training counselling scholarship resources initiatives" },
];

/** Flattened, searchable view of every content type. Building this in
 *  one place keeps search consistent as new content types are added. */
export const searchIndex = (): SearchDoc[] => {
  const catName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  return [
    ...articles.map<SearchDoc>((a) => ({
      id: `article-${a.slug}`,
      type: "article",
      title: a.title,
      summary: a.summary,
      href: `/article/${a.slug}`,
      category: a.category,
      ageBands: a.ageBands,
      date: a.publishedAt,
      keywords: [
        a.title,
        a.summary,
        catName(a.category),
        ...a.pillars,
        ...a.body.flatMap((b) =>
          b.type === "paragraph" || b.type === "heading" ? b.text : "",
        ),
      ]
        .join(" ")
        .toLowerCase(),
    })),
    ...quizzes.map<SearchDoc>((q) => ({
      id: `quiz-${q.slug}`,
      type: "quiz",
      title: q.title,
      summary: q.summary,
      href: `/play/quizzes/${q.slug}`,
      category: q.category,
      ageBands: q.ageBands,
      keywords: [q.title, q.summary, "quiz", catName(q.category), ...q.questions.map((x) => x.prompt)]
        .join(" ")
        .toLowerCase(),
    })),
    ...puzzles.map<SearchDoc>((p) => ({
      id: `puzzle-${p.slug}`,
      type: "puzzle",
      title: p.title,
      summary: p.prompt.slice(0, 150),
      href: `/play/puzzles#${p.slug}`,
      ageBands: p.ageBands,
      keywords: [p.title, p.prompt, PUZZLE_KIND_LABELS[p.kind], "puzzle"].join(" ").toLowerCase(),
    })),
    ...competitions.map<SearchDoc>((c) => ({
      id: `competition-${c.slug}`,
      type: "competition",
      title: c.title,
      summary: c.summary,
      href: `/competitions/${c.slug}`,
      category: c.category,
      keywords: [c.title, c.summary, "competition contest", catName(c.category)].join(" ").toLowerCase(),
    })),
    ...editions.map<SearchDoc>((e) => ({
      id: `edition-${e.slug}`,
      type: "edition",
      title: `${e.month} — ${e.themeTitle}`,
      summary: e.themeBlurb,
      href: `/editions/${e.slug}`,
      date: e.slug,
      keywords: [e.month, e.themeTitle, e.themeBlurb, e.issueLabel, "edition issue newspaper", ...e.highlights.map((h) => h.headline)]
        .join(" ")
        .toLowerCase(),
    })),
    ...staticPages.map((p) => ({ ...p, keywords: `${p.title} ${p.summary} ${p.keywords}`.toLowerCase() })),
  ];
};

export const CONTENT_TYPE_LABELS: Record<SearchDoc["type"], string> = {
  article: "Article",
  quiz: "Quiz",
  puzzle: "Puzzle",
  competition: "Competition",
  edition: "Edition",
  reader: "Reader Corner",
  page: "Page",
};
