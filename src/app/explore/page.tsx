import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CategoryCard } from "@/components/cards/cards";
import { ButtonLink, Chip, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { AGE_BANDS, categories, sortedArticles } from "@/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knowledge Hub — articles for curious minds",
  description:
    "Every KidsChron article in one place: science, nature and wildlife, world and India news, environment, history, sport, technology and general knowledge — written for young readers.",
  alternates: { canonical: "/explore" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Knowledge Hub" }];

export default function ExplorePage() {
  const articles = sortedArticles();

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="Knowledge Hub"
        title="Discover the world, one article at a time"
        lead="Nine subjects, written clearly and positively for young readers. Start with whatever looks most interesting — there is no order to follow."
      />

      {/* Category grid */}
      <Section tone="cream" labelledBy="cats">
        <Container>
          <SectionHeading id="cats" kicker="Browse by subject" title="Where would you like to start?" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <CategoryCard category={c} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* All articles */}
      <Section tone="paper" labelledBy="all">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="all"
              kicker="Everything"
              title="All articles"
              lead="Newest first. Every article shows its reading time and, where it has been set, the age band it is written for."
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.8rem] font-semibold text-ink-mute">
                Reading level:
              </span>
              {AGE_BANDS.map((b) => (
                <Link key={b.id} href={`/search?age=${encodeURIComponent(b.id)}`}>
                  <Chip className="bg-navy-50 text-navy-700 ring-navy-200 hover:bg-navy-100">
                    {b.label}
                  </Chip>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} className="group h-full" />
            ))}
          </div>

          <p className="mt-10 text-center">
            <ButtonLink href="/search" variant="secondary" size="lg">
              Search everything on KidsChron
            </ButtonLink>
          </p>
        </Container>
      </Section>
    </>
  );
}
