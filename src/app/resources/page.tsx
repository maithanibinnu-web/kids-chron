import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Card,
  Container,
  PendingNote,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { contact } from "@/content";

export const metadata: Metadata = {
  title: "Extra resources",
  description:
    "Beyond the newspaper: ICT training, counselling sessions and scholarship initiatives are part of the wider KidsChron ecosystem. Details are published as each is confirmed.",
  alternates: { canonical: "/resources" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Extra Resources" }];

const resources = [
  {
    title: "ICT Training",
    icon: "chip" as const,
    blurb:
      "Digital skills training as part of the wider KidsChron ecosystem.",
  },
  {
    title: "Counselling Sessions",
    icon: "heart" as const,
    blurb:
      "Guidance and counselling, extending the pages that already cover growing up, decisions and wellbeing.",
  },
  {
    title: "Scholarships",
    icon: "trophy" as const,
    blurb:
      "Scholarship initiatives for young readers.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="Beyond the newspaper"
        title="Extra resources"
        lead="KidsChron sits inside a wider set of initiatives. These are planned parts of that ecosystem — and this page will fill in as each one is confirmed."
      />

      <Section tone="cream" labelledBy="planned">
        <Container>
          <SectionHeading id="planned" kicker="Planned" title="Three initiatives" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {resources.map((r) => (
              <li key={r.title}>
                <Card className="h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{r.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] text-ink-soft">{r.blurb}</p>
                  <p className="mt-4 inline-flex rounded-full bg-navy-50 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wide text-navy-600">
                    Details to be announced
                  </p>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 max-w-3xl">
            <PendingNote>
              No dates, eligibility criteria, fees or benefits have been
              published for these yet, so none are shown. When KidsChron
              confirms the detail it will appear here — invented programme
              details would be worse than an empty page.
            </PendingNote>
          </div>

          <p className="mt-8 text-center text-[0.95rem] text-ink-soft">
            Interested in one of these? Write to{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-blue-700 underline">
              {contact.email}
            </a>{" "}
            and we will let you know when there is something to share.
          </p>
          <p className="mt-6 text-center">
            <ButtonLink href="/contact" variant="secondary">
              Contact the team
            </ButtonLink>
          </p>
        </Container>
      </Section>
    </>
  );
}
