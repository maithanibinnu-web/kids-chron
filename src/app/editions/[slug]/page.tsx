import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArtScene } from "@/components/ui/ArtScene";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { QuizCard, CompetitionCard, EditionCard } from "@/components/cards/cards";
import {
  ButtonLink,
  Container,
  SampleBadge,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import {
  articleBySlug,
  competitionBySlug,
  editionBySlug,
  editions,
  quizBySlug,
} from "@/content";

export function generateStaticParams() {
  return editions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = editionBySlug(slug);
  if (!e) return { title: "Edition not found" };
  return {
    title: `${e.month} — ${e.themeTitle}`,
    description: e.themeBlurb,
    alternates: { canonical: `/editions/${e.slug}` },
  };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edition = editionBySlug(slug);
  if (!edition) notFound();

  const articles = edition.articles.map(articleBySlug).filter(Boolean);
  const quiz = edition.quiz ? quizBySlug(edition.quiz) : undefined;
  const competition = edition.competition ? competitionBySlug(edition.competition) : undefined;
  const others = editions.filter((e) => e.slug !== edition.slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Editions", href: "/editions" },
    { label: `${edition.month}` },
  ];

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker={`${edition.issueLabel} · ${edition.month}`}
        title={edition.themeTitle}
        lead={edition.themeBlurb}
        aside={
          <ButtonLink href="/subscribe" size="lg">
            Subscribe Now
          </ButtonLink>
        }
      />

      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-xl2 shadow-lift ring-1 ring-line">
              <div className="relative bg-navy-900">
                <ArtScene art={edition.coverArt} alt={edition.coverAlt} className="aspect-[3/4] w-full" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sun-300">
                    {edition.issueLabel} · {edition.month}
                  </p>
                  <p className="font-display text-3xl text-white">{edition.themeTitle}</p>
                </div>
              </div>
            </div>
            <dl className="mt-5 divide-y divide-line rounded-xl2 border border-line bg-paper px-5">
              {[
                ["Pages", String(edition.pageCount)],
                ["Puzzles", String(edition.puzzleCount)],
                ["Articles", String(edition.articles.length)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3">
                  <dt className="text-[0.9rem] text-ink-mute">{k}</dt>
                  <dd className="text-[0.9rem] font-semibold text-navy-900">{v}</dd>
                </div>
              ))}
            </dl>
            {edition.provenance === "sample" && (
              <p className="mt-4">
                <SampleBadge />
              </p>
            )}
          </div>

          <div>
            <h2 className="text-2xl">What&apos;s inside this edition</h2>
            <ul className="mt-4 divide-y divide-line rounded-xl2 border border-line bg-paper">
              {edition.highlights.map((h) => (
                <li key={h.headline} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-5">
                  <span className="w-44 shrink-0 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-blue-700">
                    {h.section}
                  </span>
                  <span className="font-medium text-navy-900">{h.headline}</span>
                </li>
              ))}
            </ul>

            {articles.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl">Read from this edition</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {articles.map((a) => (
                    <ArticleCard key={a!.slug} article={a!} className="group h-full" />
                  ))}
                </div>
              </section>
            )}

            {(quiz || competition) && (
              <section className="mt-12">
                <h2 className="text-2xl">Also in this issue</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {quiz && <QuizCard quiz={quiz} />}
                  {competition && <CompetitionCard competition={competition} />}
                </div>
              </section>
            )}
          </div>
        </div>
      </Container>

      {others.length > 0 && (
        <Section tone="mist">
          <Container>
            <SectionHeading kicker="The archive" title="Other editions" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((e) => (
                <EditionCard key={e.slug} edition={e} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
