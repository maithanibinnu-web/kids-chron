import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SchoolEnquiryForm } from "@/components/forms/ContactForms";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Card,
  Container,
  PendingNote,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { contact, schoolOfferings } from "@/content";

export const metadata: Metadata = {
  title: "Schools & institutions",
  description:
    "Bring KidsChron to your school: institutional subscriptions, in-school competitions, reader contributions, puzzle and quiz activities, and collaboration on educational initiatives.",
  alternates: { canonical: "/schools" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Schools & Institutions" }];

export default function SchoolsPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="For schools, teachers, libraries and institutions"
        title="Bring KidsChron to Your School"
        lead="Copies for a class, a year group or the library — plus competitions, reader contributions and activities that fit into a reading period."
        aside={
          <ButtonLink href="#enquiry" size="lg">
            Make an Enquiry
          </ButtonLink>
        }
      />

      <Section tone="cream" labelledBy="offer">
        <Container>
          <SectionHeading
            id="offer"
            kicker="What we can do together"
            title="Six ways schools work with KidsChron"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schoolOfferings.map((o) => (
              <li key={o.title}>
                <Card className="h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-50 text-navy-700">
                    <Icon name={o.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{o.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] text-ink-soft">{o.body}</p>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 max-w-3xl">
            <PendingNote>
              Institutional pricing is arranged case by case and depends on the
              number of copies and the delivery arrangement. We have not
              published a bulk rate card because there is not yet an official
              one to publish — tell us your numbers and the team will come back
              with the figures.
            </PendingNote>
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="class">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <SectionHeading
              id="class"
              kicker="In the classroom"
              title="What a KidsChron reading period looks like"
              lead="Each edition is short enough to finish, and structured enough to build a lesson around."
            />
            <ol className="space-y-3">
              {[
                ["Read one section aloud", "Ten minutes. The cover story or a science piece works well."],
                ["Take the 'Think about it' question", "Every article ends with one. Use it as a five-minute discussion."],
                ["Run the puzzle page as pairs", "Two students, one puzzle, then swap and compare methods."],
                ["Set the quiz as a quick check", "Answers are explained, so it teaches rather than tests."],
                ["Send the best work in", "Students' stories, artwork and experiments can be submitted for the Reader Corner, with parental consent."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 rounded-card border border-line bg-cream p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-700 font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem]">{t}</h3>
                    <p className="mt-1 text-[0.9rem] text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="mist" id="enquiry" labelledBy="enquiry-heading" className="scroll-mt-24">
        <Container className="max-w-3xl">
          <SectionHeading
            id="enquiry-heading"
            kicker="Enquiry"
            title="Tell us what your school needs"
            lead="There is no obligation and no automated sales follow-up — a person reads it and replies."
          />
          <div className="mt-8">
            <SchoolEnquiryForm />
          </div>
          <p className="mt-8 text-[0.92rem] text-ink-soft">
            Prefer to talk? Call{" "}
            <a href={`tel:${contact.phoneHrefs[0]}`} className="font-semibold text-blue-700 underline">
              {contact.phones[0]}
            </a>{" "}
            or{" "}
            <a href={`tel:${contact.phoneHrefs[1]}`} className="font-semibold text-blue-700 underline">
              {contact.phones[1]}
            </a>
            , or email{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-blue-700 underline">
              {contact.email}
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
