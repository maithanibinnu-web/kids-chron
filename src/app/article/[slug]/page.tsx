import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtScene } from "@/components/ui/ArtScene";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Icon } from "@/components/ui/Icon";
import {
  Breadcrumb,
  ButtonLink,
  Chip,
  Container,
  Rule,
  SampleBadge,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { ShareRow } from "@/components/article/ShareRow";
import {
  PILLAR_LABELS,
  articleBySlug,
  articles,
  categoryBySlug,
  relatedArticles,
  styleFor,
  type Block,
} from "@/content";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/article/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.summary,
      publishedTime: a.publishedAt,
    },
  };
}

/* ---- Editorial block renderer ---- */

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.attribution && (
            <footer className="mt-2 font-sans text-sm not-italic text-ink-mute">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "factbox":
      return (
        <aside className="not-prose my-8 rounded-xl2 bg-blue-50 p-6 ring-1 ring-inset ring-blue-100">
          <h3 className="flex items-center gap-2 text-lg text-blue-900">
            <Icon name="bulb" className="h-5 w-5" strokeWidth={2} />
            {block.title}
          </h3>
          <ul className="mt-3 space-y-2 text-[0.98rem] text-blue-900">
            {block.items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      );
    case "question":
      return (
        <aside className="not-prose my-8 rounded-xl2 border-2 border-dashed border-sun-300 bg-sun-50 p-6">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-sun-800">
            Think about it
          </p>
          <p className="mt-2 font-display text-xl leading-snug text-navy-900">
            {block.text}
          </p>
        </aside>
      );
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const cat = categoryBySlug(article.category);
  const s = styleFor(article.category);
  const related = relatedArticles(article.slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Knowledge Hub", href: "/explore" },
    { label: cat?.name ?? "Article", href: `/explore/${article.category}` },
    { label: article.title },
  ];

  const published = new Date(article.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <article>
        {/* Header */}
        <header className="border-b border-line bg-cream">
          <Container className="py-8 sm:py-10">
            <Breadcrumb items={crumbs.slice(0, 3)} />

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip className={`${s.chipBg} ${s.chipText} ${s.chipRing}`}>
                    {cat && <Icon name={cat.icon} className="h-3.5 w-3.5" strokeWidth={2} />}
                    {cat?.name}
                  </Chip>
                  {article.provenance === "sample" && <SampleBadge />}
                </div>

                <h1 className="mt-4 text-[2.1rem] leading-[1.1] sm:text-[2.7rem]">
                  {article.title}
                </h1>

                <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                  {article.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.88rem] text-ink-mute">
                  <span className="font-semibold text-navy-800">
                    {article.readingMinutes} min read
                  </span>
                  <span aria-hidden>·</span>
                  <time dateTime={article.publishedAt}>{published}</time>
                  {article.ageBands?.length ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>
                        Written for ages{" "}
                        {article.ageBands.map((b) => b.replace("-", "–")).join(", ")}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="overflow-hidden rounded-xl2 shadow-soft ring-1 ring-line">
                <ArtScene
                  art={article.artwork.art}
                  alt={article.artwork.alt}
                  className="aspect-[16/10] w-full"
                />
              </div>
            </div>
          </Container>
        </header>

        {/* Body */}
        <Container className="py-10 sm:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="prose-kc">
              {article.body.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}

              {article.provenance === "sample" && (
                <aside className="not-prose mt-12 rounded-xl2 border border-navy-200 bg-mist p-5 text-[0.9rem] text-ink-soft">
                  <p className="font-semibold text-navy-900">
                    About this article
                  </p>
                  <p className="mt-1.5">
                    This is sample content shipped with the website build. It is
                    written on accurate, evergreen subject matter, but it is not
                    official KidsChron editorial and will be replaced by the
                    editorial team.
                  </p>
                </aside>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <div>
                <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-mute">
                  What this builds
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {article.pillars.map((p) => (
                    <li key={p}>
                      <Chip className="bg-leaf-50 text-leaf-800 ring-leaf-200">
                        {PILLAR_LABELS[p]}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </div>

              <Rule />

              <ShareRow title={article.title} slug={article.slug} />

              <Rule />

              <div className="rounded-xl2 bg-navy-900 p-5 text-navy-100">
                <p className="font-display text-lg text-white">
                  This is one page of twelve.
                </p>
                <p className="mt-1.5 text-[0.88rem] text-navy-200">
                  Every KidsChron edition carries eleven more like it, plus
                  puzzles, quizzes and reader work.
                </p>
                <ButtonLink href="/subscribe" variant="sun" size="sm" className="mt-4 w-full">
                  Subscribe Now
                </ButtonLink>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="mist" labelledBy="related">
          <Container>
            <SectionHeading id="related" kicker="Keep reading" title="You might like these next" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} className="group h-full" />
              ))}
            </div>
            <p className="mt-10">
              <Link
                href={`/explore/${article.category}`}
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                More in {cat?.name} →
              </Link>
            </p>
          </Container>
        </Section>
      )}
    </>
  );
}
