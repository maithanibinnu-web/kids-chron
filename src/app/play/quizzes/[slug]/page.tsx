import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { QuizCard } from "@/components/cards/cards";
import { Chip, Container, SampleBadge, Section, SectionHeading } from "@/components/ui/primitives";
import { JsonLd, quizSchema } from "@/components/seo/JsonLd";
import { categoryBySlug, quizBySlug, quizzes, styleFor } from "@/content";

export function generateStaticParams() {
  return quizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = quizBySlug(slug);
  if (!quiz) return { title: "Quiz not found" };
  return {
    title: `${quiz.title} — quiz`,
    description: quiz.summary,
    alternates: { canonical: `/play/quizzes/${quiz.slug}` },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = quizBySlug(slug);
  if (!quiz) notFound();

  const cat = categoryBySlug(quiz.category);
  const s = styleFor(quiz.category);
  const others = quizzes.filter((q) => q.slug !== quiz.slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Play", href: "/play" },
    { label: "Quizzes", href: "/play/quizzes" },
    { label: quiz.title },
  ];

  return (
    <>
      <JsonLd data={quizSchema(quiz)} />
      <PageHeader
        crumbs={crumbs}
        tone="sun"
        title={quiz.title}
        lead={quiz.summary}
        kicker={`${quiz.questions.length} questions`}
      />

      <Container className="max-w-3xl py-10 sm:py-14">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Chip className={`${s.chipBg} ${s.chipText} ${s.chipRing}`}>{cat?.name}</Chip>
          {quiz.ageBands?.length ? (
            <Chip className="bg-navy-50 text-navy-700 ring-navy-200">
              Ages {quiz.ageBands.map((b) => b.replace("-", "–")).join(" · ")}
            </Chip>
          ) : null}
          {quiz.provenance === "sample" && <SampleBadge />}
        </div>

        <QuizPlayer quiz={quiz} />
      </Container>

      {others.length > 0 && (
        <Section tone="mist">
          <Container>
            <SectionHeading kicker="Next" title="More quizzes" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((q) => (
                <QuizCard key={q.slug} quiz={q} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
