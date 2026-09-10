import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuizCard, PuzzleCard } from "@/components/cards/cards";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { PUZZLE_KIND_LABELS, microcopy, puzzles, quizzes } from "@/content";

export const metadata: Metadata = {
  title: "Play — quizzes, puzzles and brain teasers",
  description:
    "Free quizzes, riddles, logic puzzles, word games and brain teasers for children. No score is stored and nothing is shared — play as often as you like.",
  alternates: { canonical: "/play" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Play" }];

export default function PlayPage() {
  const kinds = [...new Set(puzzles.map((p) => p.kind))];

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        tone="sun"
        kicker="Think & Solve"
        title="Thinking, disguised as playing"
        lead={
          <>
            Quizzes, riddles, logic puzzles and brain teasers — the same kind
            that fill six pages of every printed edition.{" "}
            <strong className="font-semibold text-navy-800">
              {microcopy.quizNudge}
            </strong>
          </>
        }
      />

      <Section tone="cream" labelledBy="quizzes">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="quizzes"
              kicker="Quizzes"
              title="Test what you know"
              lead="Every answer comes with an explanation, so a wrong one is worth as much as a right one."
            />
            <ButtonLink href="/play/quizzes" variant="secondary">
              All quizzes
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((q) => (
              <QuizCard key={q.slug} quiz={q} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="puzzles">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="puzzles"
              kicker="Puzzles & brain teasers"
              title="Have a proper go before you peek"
              lead="Riddles, logic, word ladders and number patterns. The answer is always hidden until you ask for it — and it always explains itself."
            />
            <ButtonLink href="/play/puzzles" variant="secondary">
              All puzzles
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {kinds.map((k) => (
              <li key={k}>
                <ButtonLink href={`/play/puzzles#${k}`} variant="secondary" size="sm">
                  <Icon name="puzzle" className="h-4 w-4" strokeWidth={2} />
                  {PUZZLE_KIND_LABELS[k]}
                </ButtonLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {puzzles.slice(0, 4).map((p) => (
              <PuzzleCard key={p.slug} puzzle={p} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
