import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, PendingNote, Section } from "@/components/ui/primitives";
import { contact, formatINR, plans, publication, site } from "@/content";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description:
    "The terms that apply to KidsChron subscriptions, payments, deliveries, competitions and reader submissions.",
  alternates: { canonical: "/terms" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Terms & Conditions" }];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="Terms"
        title="Terms & conditions"
        lead="What you can expect from us, and what we ask of you."
      />

      <Section tone="cream">
        <Container className="max-w-3xl">
          <div className="rounded-xl2 border border-sun-300 bg-sun-50 p-5 text-[0.94rem] text-sun-900">
            <p className="font-bold">Draft — needs legal review</p>
            <p className="mt-1.5 leading-relaxed">
              These terms describe how the website and subscription are built to
              work. They have not been reviewed by a lawyer. Refund, cancellation
              and delivery-timeline clauses in particular need to be finalised by
              KidsChron before this page goes live — the gaps below are marked
              rather than filled with guesses.
            </p>
          </div>

          <div className="prose-kc mt-10">
            <h2>Who we are</h2>
            <p>
              {site.name} is published by {site.legalEntityFull},{" "}
              {contact.locationLabel}, India.
            </p>

            <h2>Subscriptions</h2>
            <ul>
              <li>
                Two plans are currently offered: the Six-Month Subscription of{" "}
                {plans[0].editions} editions at {formatINR(plans[0].offerPrice)}{" "}
                (regular {formatINR(plans[0].regularPrice)}), and the Yearly
                Subscription of {plans[1].editions} editions at{" "}
                {formatINR(plans[1].offerPrice)} (regular{" "}
                {formatINR(plans[1].regularPrice)}).
              </li>
              <li>
                These are the offers currently displayed, not a permanent price.
                The price shown when you complete the form is the price that
                applies to that subscription.
              </li>
              <li>
                Each edition is {publication.pagesPerEdition} pages. The exact
                mix of content varies with the month&apos;s theme.
              </li>
              <li>
                A subscription begins once payment has been verified against our
                bank record.
              </li>
            </ul>

            <h2>Payment</h2>
            <ul>
              <li>
                Payment is accepted by UPI, NEFT, IMPS or bank transfer to the
                account shown on the subscription page.
              </li>
              <li>
                Entering a transaction reference on the form tells us you have
                paid. It is not itself a confirmation. We verify every payment
                before confirming a subscription, and this website will not tell
                you a payment has succeeded before that has happened.
              </li>
              <li>
                If a payment cannot be matched, we will contact you using the
                details on the form.
              </li>
            </ul>

            <h2>Delivery</h2>
            <ul>
              <li>
                The printed edition is despatched to the delivery address given
                on the subscription form. Please check it carefully.
              </li>
              <li>
                To change your delivery address, contact us with your
                subscription reference.
              </li>
              <li>
                If an edition does not arrive, tell us and we will look into it.
              </li>
            </ul>

            <h2>Reader submissions</h2>
            <ul>
              <li>
                Work must be the child&apos;s own, and must be submitted with a
                parent or guardian&apos;s consent.
              </li>
              <li>
                Submitting work does not guarantee publication. The editorial
                team reads every entry and selects what appears.
              </li>
              <li>
                By consenting, a parent or guardian gives KidsChron permission to
                publish the work in the newspaper and on this website, shown with
                the child&apos;s first name and class or age. The child keeps the
                copyright in their own work.
              </li>
              <li>
                Consent can be withdrawn at any time by writing to{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </li>
              <li>
                We may edit for length, spelling or clarity, and we will not
                publish anything that would identify a child beyond a first name
                and class or age.
              </li>
            </ul>

            <h2>Competitions</h2>
            <ul>
              <li>
                Each competition has its own rules, eligibility and dates,
                published on its own page. Where those have not been announced,
                the page says so.
              </li>
              <li>Entries must be the entrant&apos;s own original work.</li>
              <li>The judges&apos; decision is final.</li>
            </ul>

            <h2>Content on this website</h2>
            <p>
              Articles, illustrations, quizzes and puzzles on this website belong
              to {site.legalEntity} unless stated otherwise. You are welcome to
              read, print and use them at home or in a classroom. Please do not
              republish them elsewhere without asking.
            </p>
            <p>
              Some content on this site is clearly labelled{" "}
              <strong>sample content</strong>. It demonstrates the reading
              experience and is not official KidsChron editorial.
            </p>

            <h2>Contact</h2>
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={`tel:${contact.phoneHrefs[0]}`}>{contact.phones[0]}</a> ·{" "}
              <a href={`tel:${contact.phoneHrefs[1]}`}>{contact.phones[1]}</a>
            </p>
          </div>

          <div className="mt-10">
            <PendingNote>
              Still to be confirmed by KidsChron and added here: the refund and
              cancellation policy, the delivery timeline and what happens to a
              missed edition, the publication frequency, the governing law and
              jurisdiction clause, and a last-updated date.
            </PendingNote>
          </div>

          <p className="mt-8 text-[0.92rem] text-ink-mute">
            See also our{" "}
            <Link href="/privacy" className="font-semibold text-blue-700 underline">
              privacy policy
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
