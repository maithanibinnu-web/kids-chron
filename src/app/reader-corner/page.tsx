import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { readerGroups, readerSubmissions, SUBMISSION_CATEGORY_LABELS } from "@/content";
import { ArtScene } from "@/components/ui/ArtScene";

export const metadata: Metadata = {
  title: "Reader Corner — work by young readers",
  description:
    "Stories, poems, artwork, experiments and ideas sent in by KidsChron readers. Every piece is reviewed by the editorial team and published only with a parent or guardian's consent.",
  alternates: { canonical: "/reader-corner" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Reader Corner" }];

export default function ReaderCornerPage() {
  const hasWork = readerSubmissions.length > 0;

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        tone="mist"
        kicker="Reader Corner"
        title="This space belongs to young readers"
        lead="Selected stories, poems, artwork, experiments and ideas sent in by children — reviewed by the editorial team, published only with a parent or guardian's consent."
        aside={
          <ButtonLink href="/create/submit" size="lg">
            Submit Your Creation
          </ButtonLink>
        }
      />

      {readerGroups.map((group, i) => {
        const items = readerSubmissions.filter((s) =>
          group.categories.includes(s.category),
        );
        return (
          <Section key={group.id} tone={i % 2 === 0 ? "cream" : "paper"} id={group.id}>
            <Container>
              <SectionHeading title={group.title} lead={group.blurb} />
              {items.length > 0 ? (
                <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => (
                    <li key={s.id}>
                      <article className="h-full overflow-hidden rounded-card bg-paper shadow-soft ring-1 ring-line">
                        <ArtScene art={s.art} alt={s.title} className="aspect-[16/10] w-full" />
                        <div className="p-5">
                          <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-blue-700">
                            {SUBMISSION_CATEGORY_LABELS[s.category]}
                          </p>
                          <h3 className="mt-1 text-lg">{s.title}</h3>
                          <p className="mt-2 text-[0.92rem] text-ink-soft">{s.excerpt}</p>
                          <p className="mt-4 border-t border-line pt-3 text-[0.85rem] font-semibold text-navy-800">
                            {s.displayName}, {s.ageOrClass}
                            {s.city ? ` · ${s.city}` : ""}
                          </p>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-8 rounded-xl2 border-2 border-dashed border-navy-200 bg-paper/70 p-8">
                  <p className="flex items-start gap-3 text-ink-soft">
                    <Icon name="sparkle" className="mt-0.5 h-5 w-5 shrink-0 text-sun-500" />
                    <span>
                      {group.invitation} We would rather leave this space open
                      than fill it with work we made up.
                    </span>
                  </p>
                  <p className="mt-5">
                    <ButtonLink href="/create/submit" variant="secondary">
                      Be the first
                    </ButtonLink>
                  </p>
                </div>
              )}
            </Container>
          </Section>
        );
      })}

      <Section tone="navy">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl text-white">How work gets here</h2>
              <ol className="mt-5 space-y-2.5 text-navy-200">
                {[
                  "A young reader makes something.",
                  "A parent or guardian sends it in and gives consent.",
                  "The editorial team reads every entry — nothing is automatic.",
                  "If it is selected, we contact the parent or guardian before publishing.",
                  "It appears with a first name and a class or age. Never a full name, school and town together.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-700 text-[0.75rem] font-bold text-white">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl2 bg-navy-800 p-6 ring-1 ring-inset ring-navy-700">
              <p className="font-display text-xl text-white">
                {hasWork ? "Send us yours" : "Yours could be the first"}
              </p>
              <p className="mt-2 text-navy-200">
                Stories, poems, drawings, photographs, things you have built,
                experiments you have run — all of it welcome.
              </p>
              <ButtonLink href="/create/submit" variant="sun" className="mt-5 w-full">
                Submit Your Creation
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
