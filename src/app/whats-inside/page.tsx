import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EditionCard } from "@/components/cards/cards";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { currentEdition, publication, themeStyles, whatsInside } from "@/content";

export const metadata: Metadata = {
  title: "What's inside KidsChron",
  description:
    "The 12 pages of every KidsChron edition, section by section: cover story, wildlife and nature, science and technology, general knowledge, international news, environment, historical footprints, sports, guidance, creativity corner, infographics, puzzles and quizzes.",
  alternates: { canonical: "/whats-inside" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "What's Inside" }];

export default function WhatsInsidePage() {
  const edition = currentEdition();
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="What's Inside KidsChron"
        title={`${publication.pagesPerEdition} pages, every edition`}
        lead="The same spine of sections every time, so a young reader always knows where their favourite part is — and always meets something new next to it."
        aside={
          <ButtonLink href="/subscribe" size="lg">
            Subscribe Now
          </ButtonLink>
        }
      />

      <Section tone="cream" labelledBy="pages">
        <Container>
          <SectionHeading id="pages" kicker="Page by page" title="The sections" />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whatsInside.map((s, i) => {
              const st = themeStyles[s.theme];
              return (
                <li key={s.section}>
                  <div className={`flex h-full items-start gap-4 rounded-card ${st.tint} p-6 ring-1 ring-inset ${st.chipRing}`}>
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-paper ${st.accent}`}>
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-mute">
                        Page {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-lg leading-snug">{s.section}</h3>
                      <p className="mt-1 text-[0.9rem] text-ink-soft">{s.blurb}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="example">
        <Container>
          <SectionHeading
            id="example"
            kicker="A real example"
            title={`${edition.month} — ${edition.themeTitle}`}
            lead="How the sections come together around one theme."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-12">
            <EditionCard edition={edition} />
            <ul className="divide-y divide-line rounded-xl2 border border-line bg-cream">
              {edition.highlights.map((h) => (
                <li key={h.headline} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-5">
                  <span className="w-44 shrink-0 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-blue-700">
                    {h.section}
                  </span>
                  <span className="font-medium text-navy-900">{h.headline}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8">
            <ButtonLink href={`/editions/${edition.slug}`} variant="secondary">
              See the whole edition
            </ButtonLink>
          </p>
        </Container>
      </Section>
    </>
  );
}
