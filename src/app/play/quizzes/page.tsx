import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuizCard } from "@/components/cards/cards";
import { Container, Section } from "@/components/ui/primitives";
import { microcopy, quizzes } from "@/content";

export const metadata: Metadata = {
  title: "Quizzes for kids",
  description:
    "Free multiple-choice quizzes for children on science, space, nature, the environment and clear thinking. Every answer is explained.",
  alternates: { canonical: "/play/quizzes" },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Play", href: "/play" },
  { label: "Quizzes" },
];

export default function QuizzesPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        tone="sun"
        kicker="Quizzes"
        title="Pick a quiz"
        lead={microcopy.quizNudge}
      />
      <Section tone="cream">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((q) => (
              <QuizCard key={q.slug} quiz={q} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
