import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Accordion,
  ButtonLink,
  Container,
  PendingNote,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { contact, faqGroups, faqs } from "@/content";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about KidsChron: what the newspaper contains, who it is for, subscription plans and prices, payment, delivery, school subscriptions, children's submissions and competitions.",
  alternates: { canonical: "/faq" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "FAQ" }];

export default function FaqPage() {
  const answered = faqs.filter(
    (f): f is typeof f & { answer: string } => typeof f.answer === "string",
  );
  const unanswered = faqs.filter((f) => f.answer === null);

  return (
    <>
      {/* Only answered questions go into structured data — marking up a
          question with no answer would be misleading. */}
      <JsonLd
        data={faqSchema(
          answered.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />
      <PageHeader
        crumbs={crumbs}
        kicker="FAQ"
        title="Questions people actually ask"
        lead="Where we have not confirmed an official answer, this page says so instead of guessing."
      />

      <Section tone="cream">
        <Container className="max-w-3xl">
          {faqGroups().map((group) => (
            <div key={group.heading} className="mb-10 last:mb-0">
              <SectionHeading title={group.heading} className="mb-5" />
              <Accordion
                items={group.items.map((f) => ({
                  q: f.question,
                  a: f.answer ?? (
                    <span className="text-ink-mute">
                      We have not confirmed an official answer to this yet, and
                      we would rather leave it open than guess. Please{" "}
                      <Link href="/contact" className="font-semibold text-blue-700 underline">
                        ask us directly
                      </Link>{" "}
                      — we will tell you exactly where things stand.
                    </span>
                  ),
                }))}
              />
            </div>
          ))}

          {unanswered.length > 0 && (
            <div className="mt-10">
              <PendingNote>
                {unanswered.length === 1
                  ? "One question on this page"
                  : `${unanswered.length} questions on this page`}{" "}
                {unanswered.length === 1 ? "is" : "are"} waiting on official
                confirmation from KidsChron. Rather than publish a plausible
                guess, we have left the answer open and pointed you to the team.
              </PendingNote>
            </div>
          )}

          <div className="mt-12 rounded-xl2 bg-navy-900 p-7 text-center text-navy-100 sm:p-9">
            <h2 className="text-2xl text-white">Still not answered?</h2>
            <p className="mt-2">
              Call{" "}
              <a href={`tel:${contact.phoneHrefs[0]}`} className="font-semibold text-sun-300 underline">
                {contact.phones[0]}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold text-sun-300 underline">
                {contact.email}
              </a>
              .
            </p>
            <p className="mt-6">
              <ButtonLink href="/contact" variant="sun">
                Contact us
              </ButtonLink>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
