import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CompetitionCard } from "@/components/cards/cards";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { competitions } from "@/content";

export const metadata: Metadata = {
  title: "Competitions & challenges for children",
  description:
    "KidsChron competitions: drawing, writing, general knowledge, science and environment challenges for young readers, with rules, entry process and consent handled properly.",
  alternates: { canonical: "/competitions" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Competitions" }];

export default function CompetitionsPage() {
  const open = competitions.filter((c) => c.status === "open");
  const upcoming = competitions.filter((c) => c.status === "upcoming");
  const past = competitions.filter((c) => c.status === "closed" || c.status === "judging");

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        tone="coral"
        kicker="Competitions & Challenges"
        title="Enter something. Learn something."
        lead="Drawing, writing, general knowledge, science and environment challenges run through the year. Entries go through the same consent and moderation process as everything else young readers send us."
      />

      <Section tone="cream" labelledBy="open">
        <Container>
          <SectionHeading id="open" kicker="Open now" title="Taking entries" />
          {open.length ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {open.map((c) => (
                <CompetitionCard key={c.slug} competition={c} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-ink-soft">
              Nothing is open for entries at the moment. The next competitions
              are listed below.
            </p>
          )}
        </Container>
      </Section>

      {upcoming.length > 0 && (
        <Section tone="paper" labelledBy="soon">
          <Container>
            <SectionHeading
              id="soon"
              kicker="Opening soon"
              title="Coming up"
              lead="Dates and prizes are published on each page as soon as they are confirmed — we do not announce a deadline before there is one."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((c) => (
                <CompetitionCard key={c.slug} competition={c} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {past.length > 0 && (
        <Section tone="mist" labelledBy="past">
          <Container>
            <SectionHeading id="past" kicker="Closed" title="Previous competitions" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((c) => (
                <CompetitionCard key={c.slug} competition={c} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="navy">
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl text-white">Running one at your school?</h2>
          <p className="mt-3 text-navy-200">
            Schools can run a KidsChron quiz, drawing or writing competition
            within the school, with entries considered for publication.
          </p>
          <p className="mt-6">
            <ButtonLink href="/schools#enquiry" variant="sun" size="lg">
              Talk to us about school competitions
            </ButtonLink>
          </p>
        </Container>
      </Section>
    </>
  );
}
