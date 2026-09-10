import type { Metadata } from "next";
import Link from "next/link";
import { SubscriptionPlanCard } from "@/components/cards/cards";
import { PaymentPanel } from "@/components/subscribe/PaymentPanel";
import { Icon } from "@/components/ui/Icon";
import {
  Accordion,
  Breadcrumb,
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema, subscriptionSchema } from "@/components/seo/JsonLd";
import { KidsChronLogo } from "@/components/brand/Logo";
import { contact, faqs, formatINR, plans, publication, site } from "@/content";

export const metadata: Metadata = {
  title: "Subscription — Get KidsChron delivered",
  description:
    "Subscribe to KidsChron, the children's newspaper for curious minds. Six-month (12 editions) and yearly (24 editions) plans, delivered to your address anywhere in India.",
  alternates: { canonical: "/subscribe" },
  openGraph: {
    title: "Subscribe to KidsChron",
    description:
      "Twelve printed pages of news, knowledge, puzzles and creativity for young readers — delivered to your address.",
  },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Subscription" }];

export default function SubscribePage() {
  const subscriptionFaqs = faqs.filter((f) => f.group === "Subscription");

  return (
    <>
      <JsonLd data={subscriptionSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* Hero */}
      <section className="border-b border-line bg-gradient-to-b from-blue-50 to-cream">
        <Container className="py-10 sm:py-14">
          <Breadcrumb items={crumbs} />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_auto] lg:items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl">
                Get KidsChron delivered
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Twelve printed pages of news, science, nature, history, sport,
                puzzles and reader work — posted to your address. Choose a plan,
                fill in the form, and pay by UPI or bank transfer.
              </p>
              <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem] font-semibold text-navy-800">
                {[
                  `${publication.pagesPerEdition} pages every edition`,
                  "Delivered to your door",
                  "Puzzles & quizzes in every issue",
                ].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Icon name="shield" className="h-4 w-4 text-leaf-600" strokeWidth={2} />
                    {t}
                  </span>
                ))}
              </p>
            </div>
            <div className="hidden rounded-2xl bg-paper p-4 shadow-soft ring-1 ring-line lg:block">
              <KidsChronLogo height={96} />
            </div>
          </div>
        </Container>
      </section>

      {/* Plans */}
      <Section tone="cream" labelledBy="plans-heading">
        <Container>
          <SectionHeading
            id="plans-heading"
            align="center"
            kicker="Current offers"
            title="Two plans"
            lead="These are the offers currently displayed. Prices may change — the price you see at the moment you subscribe is the price that applies."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            {plans.map((p) => (
              <SubscriptionPlanCard key={p.id} plan={p} />
            ))}
          </div>

          {/* Comparison */}
          <div className="mx-auto mt-10 max-w-4xl overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">
                Comparison of the six-month and yearly subscription plans
              </caption>
              <thead>
                <tr className="border-b-2 border-navy-200">
                  <th scope="col" className="py-3 pr-4 font-semibold text-ink-mute">
                    &nbsp;
                  </th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col" className="py-3 pr-4 font-semibold text-navy-900">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[
                  ["Editions", (p: (typeof plans)[number]) => `${p.editions}`],
                  ["Period", (p: (typeof plans)[number]) => `${p.months} months`],
                  ["Regular price", (p: (typeof plans)[number]) => formatINR(p.regularPrice)],
                  ["Special offer", (p: (typeof plans)[number]) => formatINR(p.offerPrice)],
                  ["You save", (p: (typeof plans)[number]) => formatINR(p.savings)],
                  ["Approx. per month", (p: (typeof plans)[number]) => formatINR(p.perMonthReference)],
                ].map(([label, fn]) => (
                  <tr key={label as string}>
                    <th scope="row" className="py-3 pr-4 font-medium text-ink-mute">
                      {label as string}
                    </th>
                    {plans.map((p) => (
                      <td key={p.id} className="py-3 pr-4 font-semibold text-navy-900 tabular-nums">
                        {(fn as (x: typeof p) => string)(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-10 text-center">
            <ButtonLink href="/subscribe/checkout" size="lg">
              Subscribe Now
            </ButtonLink>
          </p>
        </Container>
      </Section>

      {/* How it works */}
      <Section tone="paper" labelledBy="how-heading">
        <Container>
          <SectionHeading
            id="how-heading"
            kicker="How subscribing works"
            title="Five steps, about five minutes"
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: "Choose a plan", d: "Six months or a year." },
              { t: "Enter details", d: "Subscriber, delivery address and contact." },
              { t: "Review", d: "Check the address — that is where it is posted." },
              { t: "Pay", d: "UPI, NEFT, IMPS or bank transfer." },
              { t: "Confirmation", d: "You get a reference number. We verify the payment." },
            ].map((s, i) => (
              <li key={s.t} className="rounded-card border border-line bg-cream p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-700 font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[1.05rem]">{s.t}</h3>
                <p className="mt-1 text-[0.88rem] text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-xl2 bg-blue-50 px-5 py-4 text-[0.94rem] text-blue-900 ring-1 ring-inset ring-blue-100">
            <strong className="font-bold">One thing to know: </strong>
            entering a transaction reference tells us you have paid — it is not
            a confirmation on its own. A person checks every payment against the
            bank record before a subscription is confirmed, and this site will
            never tell you a payment succeeded before that has happened.
          </p>
        </Container>
      </Section>

      {/* Payment details */}
      <Section tone="mist" labelledBy="pay-heading">
        <Container>
          <SectionHeading
            id="pay-heading"
            kicker="Payment details"
            title="Where to send the payment"
            lead={`Payments go to ${site.legalEntity}, the company behind KidsChron.`}
          />
          <div className="mt-10">
            <PaymentPanel />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream" labelledBy="faq-heading">
        <Container className="max-w-3xl">
          <SectionHeading
            id="faq-heading"
            kicker="Before you subscribe"
            title="Subscription questions"
          />
          <Accordion
            className="mt-8"
            items={subscriptionFaqs.map((f) => ({
              q: f.question,
              a: f.answer ?? (
                <span className="text-ink-mute">
                  We have not confirmed an official answer to this yet, and we
                  would rather say so than guess. Please{" "}
                  <Link href="/contact" className="font-semibold text-blue-700 underline">
                    ask us directly
                  </Link>{" "}
                  and we will tell you exactly where things stand.
                </span>
              ),
            }))}
          />
          <p className="mt-8 text-center text-[0.95rem] text-ink-soft">
            Still unsure? Call{" "}
            <a href={`tel:${contact.phoneHrefs[0]}`} className="font-semibold text-blue-700 underline">
              {contact.phones[0]}
            </a>{" "}
            or email{" "}
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
