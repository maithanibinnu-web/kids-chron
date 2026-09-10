import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArtScene } from "@/components/ui/ArtScene";
import { CompetitionCard } from "@/components/cards/cards";
import {
  Accordion,
  ButtonLink,
  Container,
  PendingNote,
  SampleBadge,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { JsonLd, competitionSchema } from "@/components/seo/JsonLd";
import { COMPETITION_STATUS, competitionBySlug, competitions } from "@/content";

export function generateStaticParams() {
  return competitions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = competitionBySlug(slug);
  if (!c) return { title: "Competition not found" };
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/competitions/${c.slug}` },
  };
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function CompetitionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = competitionBySlug(slug);
  if (!c) notFound();

  const status = COMPETITION_STATUS[c.status];
  const others = competitions.filter((x) => x.slug !== c.slug).slice(0, 3);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Competitions", href: "/competitions" },
    { label: c.title },
  ];

  const dates: [string, string | null][] = [
    ["Opens", formatDate(c.opensOn)],
    ["Closes", formatDate(c.closesOn)],
    ["Results", formatDate(c.announcedOn)],
  ];

  return (
    <>
      <JsonLd data={competitionSchema(c)} />
      <PageHeader
        crumbs={crumbs}
        tone="coral"
        kicker={status.label}
        title={c.title}
        lead={c.summary}
        aside={
          c.status === "open" ? (
            <ButtonLink href={`/create/submit?competition=${c.slug}`} size="lg">
              Enter this competition
            </ButtonLink>
          ) : undefined
        }
      />

      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <div className="overflow-hidden rounded-xl2 shadow-soft ring-1 ring-line">
              <ArtScene art={c.artwork.art} alt={c.artwork.alt} className="aspect-[16/7] w-full" />
            </div>

            {c.provenance === "sample" && (
              <p className="mt-4">
                <SampleBadge />
              </p>
            )}

            <section className="mt-10">
              <h2 className="text-2xl">How to enter</h2>
              <ol className="mt-4 space-y-3">
                {c.howToEnter.map((step, i) => (
                  <li key={step} className="flex gap-4 rounded-card border border-line bg-paper p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-700 text-[0.85rem] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-ink-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl">Rules</h2>
              <ul className="mt-4 space-y-2.5">
                {c.rules.map((rule) => (
                  <li key={rule} className="flex gap-3 text-ink-soft">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" />
                    {rule}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl">Prizes</h2>
              {c.prizes?.length ? (
                <ul className="mt-4 space-y-2.5">
                  {c.prizes.map((p) => (
                    <li key={p} className="flex gap-3 text-ink-soft">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4">
                  <PendingNote>
                    Prizes for this competition have not been announced yet. We
                    will publish them here once they are confirmed — we would
                    rather leave this blank than promise something that has not
                    been decided.
                  </PendingNote>
                </div>
              )}
            </section>

            {c.faqs?.length ? (
              <section className="mt-10">
                <h2 className="text-2xl">Questions about this competition</h2>
                <Accordion
                  className="mt-4"
                  items={c.faqs.map((f) => ({
                    q: f.question,
                    a:
                      f.answer ?? (
                        <span className="text-ink-mute">
                          Not confirmed yet.{" "}
                          <Link href="/contact" className="font-semibold text-blue-700 underline">
                            Ask us
                          </Link>{" "}
                          and we will tell you where it stands.
                        </span>
                      ),
                  }))}
                />
              </section>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl2 border border-line bg-paper p-5">
              <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-mute">
                Key dates
              </h2>
              <dl className="mt-3 divide-y divide-line">
                {dates.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-[0.9rem] text-ink-mute">{label}</dt>
                    <dd className={`text-[0.9rem] font-semibold ${value ? "text-navy-900" : "text-ink-mute"}`}>
                      {value ?? "To be announced"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-xl2 border border-line bg-paper p-5">
              <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-mute">
                Who can enter
              </h2>
              <p className="mt-2 text-[0.94rem] text-ink-soft">
                {c.eligibility ?? "Eligibility will be published with the full announcement."}
              </p>
            </div>

            <div className="rounded-xl2 bg-blue-50 p-5 ring-1 ring-inset ring-blue-100">
              <h2 className="text-[0.9rem] font-bold text-blue-900">
                A grown-up must send the entry
              </h2>
              <p className="mt-1.5 text-[0.9rem] text-blue-900">
                Every entry needs a parent or guardian&apos;s consent, and each
                one is read by the editorial team before anything is published.
              </p>
            </div>

            {c.status === "open" ? (
              <ButtonLink href={`/create/submit?competition=${c.slug}`} size="lg" className="w-full">
                Enter this competition
              </ButtonLink>
            ) : (
              <div className="rounded-xl2 border-2 border-dashed border-navy-200 p-5 text-center">
                <p className="text-[0.92rem] text-ink-soft">
                  Entries are not open yet. Details appear on this page as soon
                  as the competition is announced.
                </p>
              </div>
            )}
          </aside>
        </div>
      </Container>

      {others.length > 0 && (
        <Section tone="mist">
          <Container>
            <SectionHeading kicker="Also running" title="Other competitions" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((x) => (
                <CompetitionCard key={x.slug} competition={x} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
