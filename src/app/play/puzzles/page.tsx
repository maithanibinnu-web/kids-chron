import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PuzzleCard } from "@/components/cards/cards";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { PUZZLE_KIND_LABELS, puzzles } from "@/content";

export const metadata: Metadata = {
  title: "Puzzles, riddles and brain teasers for kids",
  description:
    "Riddles, logic puzzles, word ladders, number patterns and brain teasers for children — each with a hint, an answer and an explanation of the thinking behind it.",
  alternates: { canonical: "/play/puzzles" },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Play", href: "/play" },
  { label: "Puzzles" },
];

export default function PuzzlesPage() {
  const groups = [...new Set(puzzles.map((p) => p.kind))].map((kind) => ({
    kind,
    items: puzzles.filter((p) => p.kind === kind),
  }));

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        tone="sun"
        kicker="Puzzles & brain teasers"
        title="Try, submit, check, learn"
        lead="Have a proper go first. The hint is there if you get stuck, and the answer always explains the thinking rather than just telling you the result."
      />

      {groups.map((g, i) => (
        <Section
          key={g.kind}
          id={g.kind}
          tone={i % 2 === 0 ? "cream" : "paper"}
          className="scroll-mt-24"
        >
          <Container>
            <SectionHeading
              title={PUZZLE_KIND_LABELS[g.kind]}
              lead={`${g.items.length} to try`}
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {g.items.map((p) => (
                <PuzzleCard key={p.slug} puzzle={p} />
              ))}
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
