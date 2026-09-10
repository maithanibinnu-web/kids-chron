import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackedBy, KidsChronLogo, PrakritikLogo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { contact, site } from "@/content";

export const metadata: Metadata = {
  title: "About KidsChron",
  description:
    "KidsChron is a children's newspaper for curious minds, an initiative of Prakritik India Initiatives Pvt. Ltd., based in Dehradun, Uttarakhand.",
  alternates: { canonical: "/about" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "About KidsChron" }];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="About"
        title="A newspaper made for young readers"
        lead={site.description}
      />

      <Section tone="cream" labelledBy="mission">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div className="rounded-blob bg-paper p-8 text-center shadow-soft ring-1 ring-line">
              <KidsChronLogo height={120} className="mx-auto" />
              <p className="mt-6 font-display text-2xl text-navy-900">
                {site.tagline}
              </p>
              <p className="mt-1 font-semibold text-blue-700">{site.motto}</p>
            </div>
            <div>
              <SectionHeading id="mission" kicker="Our mission" title="Why KidsChron exists" />
              <blockquote className="mt-6 border-l-4 border-sun-300 pl-5 font-display text-[1.35rem] leading-snug text-navy-900">
                {site.mission}
              </blockquote>
              <p className="mt-6 leading-relaxed text-ink-soft">
                In practice that means twelve printed pages, every edition,
                covering news, science, nature, the environment, history, sport
                and general knowledge — alongside puzzles, quizzes, guidance and
                a page that belongs entirely to what young readers make
                themselves.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {site.supporting}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="org">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                id="org"
                kicker="The organisation"
                title={site.legalEntity}
                lead="KidsChron is an initiative of Prakritik India Initiatives Pvt. Ltd., a company whose work is built around three commitments."
              />
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {site.philosophy.map((p) => (
                  <li
                    key={p}
                    className="rounded-card bg-leaf-50 p-5 text-center ring-1 ring-inset ring-leaf-200"
                  >
                    <p className="font-display text-xl text-leaf-900">{p}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 leading-relaxed text-ink-soft">
                That is also why the environment runs through KidsChron as a
                thread rather than a section — but KidsChron is a children&apos;s
                knowledge platform first, and a green one second.
              </p>
              <p className="mt-6">
                <ButtonLink href="/contact" variant="secondary">
                  Contact the team
                </ButtonLink>
              </p>
            </div>
            <div className="rounded-blob bg-cream p-10 text-center ring-1 ring-line">
              <PrakritikLogo size={200} className="mx-auto block" />
              <p className="mt-6 font-semibold text-navy-900">
                {site.legalEntityFull}
              </p>
              <p className="mt-1 text-[0.92rem] text-ink-mute">
                {contact.locationLabel}, India
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy" labelledBy="principles">
        <Container>
          <SectionHeading
            id="principles"
            invert
            align="center"
            kicker="Editorial principles"
            title="What every page is trying to do"
            lead="Each piece of content should serve at least one of these. If it serves none of them, it does not go in."
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Knowledge", "bulb"],
              ["Curiosity", "search"],
              ["Critical thinking", "brain"],
              ["Creativity", "palette"],
              ["Communication", "hands"],
              ["Empathy", "heart"],
              ["Problem solving", "puzzle"],
              ["Responsible citizenship", "shield"],
              ["Environmental awareness", "leaf"],
              ["Healthy learning habits", "book"],
            ].map(([label, icon]) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-card bg-navy-800/70 p-4 ring-1 ring-inset ring-navy-700"
              >
                <Icon name={icon as never} className="h-5 w-5 shrink-0 text-sun-300" />
                <span className="text-[0.95rem] font-medium text-white">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="cream" labelledBy="honesty">
        <Container className="max-w-3xl">
          <SectionHeading
            id="honesty"
            kicker="A note on this website"
            title="What is real here, and what is not"
          />
          <div className="prose-kc mt-6">
            <p>
              KidsChron is a real newspaper published by a real company, and
              everything on this site about the brand, the subscription plans,
              the payment details and the contact information comes directly
              from KidsChron.
            </p>
            <p>
              The articles, quizzes, puzzles, competitions and editions shown
              here are <strong>sample content</strong>, clearly labelled
              wherever they appear. They exist to demonstrate the reading
              experience while the editorial archive is built up, and they are
              written on accurate, evergreen subject matter — but they are not
              official KidsChron editorial.
            </p>
            <p>
              You will also notice the Reader Corner and the testimonials are
              empty. That is deliberate. Those spaces are for real young
              readers and real families, and we would rather leave them open
              than fill them with things we made up.
            </p>
          </div>
          <p className="mt-8">
            <BackedBy />
          </p>
        </Container>
      </Section>
    </>
  );
}
