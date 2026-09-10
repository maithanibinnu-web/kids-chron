import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { QuizCard } from "@/components/cards/cards";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import {
  articlesByCategory,
  categories,
  categoryBySlug,
  quizzes,
  styleFor,
} from "@/content";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) return { title: "Not found" };
  return {
    title: `${cat.name} for kids`,
    description: cat.description,
    alternates: { canonical: `/explore/${cat.slug}` },
    openGraph: { title: `${cat.name} — KidsChron`, description: cat.description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) notFound();

  const articles = articlesByCategory(cat.slug);
  const relatedQuizzes = quizzes.filter((q) => q.category === cat.slug);
  const s = styleFor(cat.slug);
  const others = categories.filter((c) => c.slug !== cat.slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Knowledge Hub", href: "/explore" },
    { label: cat.name },
  ];

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker={cat.tagline}
        title={cat.name}
        lead={cat.description}
        tone={cat.theme === "navy" ? "blue" : cat.theme}
        aside={
          <span className={`hidden h-20 w-20 place-items-center rounded-3xl bg-paper shadow-soft lg:grid ${s.accent}`}>
            <Icon name={cat.icon} className="h-10 w-10" />
          </span>
        }
      />

      <Section tone="cream" labelledBy="articles">
        <Container>
          <SectionHeading
            id="articles"
            title={
              articles.length
                ? `${articles.length} article${articles.length === 1 ? "" : "s"} in ${cat.name}`
                : `${cat.name} articles are on their way`
            }
          />

          {articles.length ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} className="group h-full" />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl2 border-2 border-dashed border-navy-200 bg-paper p-8 text-center">
              <p className="text-ink-soft">
                There is nothing published in this section yet. It appears in
                every printed edition — the digital archive is still being
                filled in.
              </p>
              <p className="mt-5">
                <ButtonLink href="/explore" variant="secondary">
                  Browse other subjects
                </ButtonLink>
              </p>
            </div>
          )}
        </Container>
      </Section>

      {relatedQuizzes.length > 0 && (
        <Section tone="sun" labelledBy="quiz">
          <Container>
            <SectionHeading
              id="quiz"
              kicker="Think & Solve"
              title={`Test yourself on ${cat.name.toLowerCase()}`}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedQuizzes.map((q) => (
                <QuizCard key={q.slug} quiz={q} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="paper" labelledBy="more">
        <Container>
          <SectionHeading id="more" kicker="Keep exploring" title="Other subjects" />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {others.map((c) => (
              <li key={c.slug}>
                <ButtonLink href={`/explore/${c.slug}`} variant="secondary" size="sm">
                  <Icon name={c.icon} className="h-4 w-4" strokeWidth={2} />
                  {c.name}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
