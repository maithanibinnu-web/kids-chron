import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EditionCard } from "@/components/cards/cards";
import {
  ButtonLink,
  Container,
  PendingNote,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { editions, publication } from "@/content";

export const metadata: Metadata = {
  title: "Monthly editions",
  description:
    "Every edition of KidsChron — the month's theme, cover story and highlights, with the puzzles, quiz and competition that went with it.",
  alternates: { canonical: "/editions" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Editions" }];

export default function EditionsPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="The archive"
        title="Every edition, month by month"
        lead={`Each edition is ${publication.pagesPerEdition} pages built around a theme, with a cover story, the regular sections, puzzles, a quiz and reader work.`}
        aside={
          <ButtonLink href="/subscribe" size="lg">
            Subscribe Now
          </ButtonLink>
        }
      />

      <Section tone="cream">
        <Container>
          <SectionHeading kicker="Editions" title="Browse the archive" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {editions.map((e) => (
              <EditionCard key={e.slug} edition={e} />
            ))}
          </div>

          {!publication.frequency && (
            <div className="mx-auto mt-10 max-w-2xl">
              <PendingNote>
                The publishing schedule shown here is illustrative. KidsChron
                has not confirmed a publication frequency for this website, so
                we have not stated one.
              </PendingNote>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
