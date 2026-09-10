"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import {
  Chip,
  Container,
  Section,
} from "@/components/ui/primitives";
import {
  AGE_BANDS,
  CONTENT_TYPE_LABELS,
  categories,
  categoryBySlug,
  searchIndex,
  type SearchDoc,
} from "@/content";

const crumbs = [{ label: "Home", href: "/" }, { label: "Search" }];

/**
 * Search runs in the browser so the query string remains linkable and the
 * page can be deployed as a static GitHub Pages export.
 */
function score(doc: SearchDoc, terms: string[]) {
  let s = 0;
  const title = doc.title.toLowerCase();
  for (const t of terms) {
    if (title.includes(t)) s += 10;
    if (doc.summary.toLowerCase().includes(t)) s += 4;
    if (doc.keywords.includes(t)) s += 1;
  }
  return s;
}

function SearchContent() {
  const sp = useSearchParams();
  const q = (sp.get("q") ?? "").trim();
  const type = sp.get("type") ?? "";
  const category = sp.get("category") ?? "";
  const age = sp.get("age") ?? "";

  const index = searchIndex();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);

  let results = index;
  if (terms.length) {
    results = results
      .map((d) => ({ d, s: score(d, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.d);
  }
  if (type) results = results.filter((d) => d.type === type);
  if (category) results = results.filter((d) => d.category === category);
  if (age) results = results.filter((d) => d.ageBands?.includes(age as never));

  const hasFilters = Boolean(type || category || age);
  const showing = terms.length || hasFilters;

  const typeCounts = new Map<string, number>();
  for (const d of index) typeCounts.set(d.type, (typeCounts.get(d.type) ?? 0) + 1);

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="Search"
        title="Find something on KidsChron"
        lead="Articles, quizzes, puzzles, competitions, editions and pages — all searchable in one place."
      >
        <form method="GET" action="/search" className="mt-8" role="search">
          <label htmlFor="q" className="sr-only">
            Search KidsChron
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute"
              >
                <Icon name="search" className="h-5 w-5" strokeWidth={2} />
              </span>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Try: honeybee, monsoon, zero, puzzles, subscription…"
                className="min-h-13 w-full rounded-full border border-navy-200 bg-paper py-3.5 pl-12 pr-5 text-[1.02rem] focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              className="min-h-13 rounded-full bg-blue-700 px-8 font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Search
            </button>
          </div>

          {/* Filters — plain selects so this works without JavaScript */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="type" className="mb-1.5 block text-[0.8rem] font-semibold text-navy-800">
                Content type
              </label>
              <select
                id="type"
                name="type"
                defaultValue={type}
                className="min-h-11 w-full rounded-xl border border-navy-200 bg-paper px-3 py-2"
              >
                <option value="">Everything</option>
                {Object.entries(CONTENT_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                    {typeCounts.get(value) ? ` (${typeCounts.get(value)})` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category" className="mb-1.5 block text-[0.8rem] font-semibold text-navy-800">
                Subject
              </label>
              <select
                id="category"
                name="category"
                defaultValue={category}
                className="min-h-11 w-full rounded-xl border border-navy-200 bg-paper px-3 py-2"
              >
                <option value="">All subjects</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="age" className="mb-1.5 block text-[0.8rem] font-semibold text-navy-800">
                Reading age
              </label>
              <select
                id="age"
                name="age"
                defaultValue={age}
                className="min-h-11 w-full rounded-xl border border-navy-200 bg-paper px-3 py-2"
              >
                <option value="">Any age</option>
                {AGE_BANDS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </PageHeader>

      <Section tone="cream">
        <Container>
          <p className="text-[0.95rem] text-ink-mute" aria-live="polite">
            {showing
              ? `${results.length} result${results.length === 1 ? "" : "s"}${q ? ` for “${q}”` : ""}`
              : `Everything on KidsChron — ${index.length} items. Type something above to narrow it down.`}
          </p>

          {results.length === 0 ? (
            <div className="mt-8 rounded-xl2 border-2 border-dashed border-navy-200 bg-paper p-8">
              <h2 className="text-xl">Nothing matched that</h2>
              <p className="mt-2 text-ink-soft">
                Try a single word rather than a phrase, or clear the filters.
                You could also browse by subject:
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/explore/${c.slug}`}>
                      <Chip className="bg-blue-50 text-blue-700 ring-blue-200 hover:bg-blue-100">
                        <Icon name={c.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                        {c.name}
                      </Chip>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="mt-6 divide-y divide-line rounded-xl2 border border-line bg-paper">
              {results.map((r) => {
                const cat = r.category ? categoryBySlug(r.category) : undefined;
                return (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      className="block p-5 transition-colors hover:bg-blue-50/60"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip className="bg-navy-50 text-navy-700 ring-navy-200">
                          {CONTENT_TYPE_LABELS[r.type]}
                        </Chip>
                        {cat && (
                          <span className="text-[0.78rem] font-semibold text-blue-700">
                            {cat.name}
                          </span>
                        )}
                        {r.ageBands?.length ? (
                          <span className="text-[0.78rem] text-ink-mute">
                            Ages {r.ageBands.map((b) => b.replace("-", "–")).join(" · ")}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="mt-2 text-lg leading-snug text-navy-900">
                        {r.title}
                      </h2>
                      <p className="mt-1 text-[0.94rem] text-ink-soft">{r.summary}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}
