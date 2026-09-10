import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Card,
  Chip,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { SubscriptionPlanCard } from "@/components/cards/cards";
import { familyActivities, parentBenefits, plans } from "@/content";

export const metadata: Metadata = {
  title: "Parent Zone",
  description:
    "What KidsChron supports in a child's development, how content is chosen, how submissions and consent are handled, and activities to do together at home.",
  alternates: { canonical: "/parents" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Parent Zone" }];

export default function ParentsPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="Parent Zone"
        title="What KidsChron is actually for"
        lead="A short, printed thing that arrives, gets read, and gets finished — and gives you something specific to talk about together afterwards."
        aside={
          <ButtonLink href="/subscribe" size="lg">
            Subscribe Now
          </ButtonLink>
        }
      />

      <Section tone="cream" labelledBy="benefits">
        <Container>
          <SectionHeading
            id="benefits"
            kicker="What it supports"
            title="Nine things a printed edition does well"
            lead="Not a claim about outcomes — just what a well-made children's newspaper is good at, and what we design each edition to do."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parentBenefits.map((b) => (
              <li key={b.title}>
                <Card className="h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon name={b.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{b.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] text-ink-soft">{b.body}</p>
                </Card>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl rounded-xl2 bg-paper px-5 py-4 text-[0.92rem] text-ink-soft ring-1 ring-line">
            <strong className="font-semibold text-navy-900">What we do not claim: </strong>
            we make no promise about grades, test scores or measurable
            educational outcomes, and we do not describe KidsChron as approved,
            certified or scientifically proven. If we ever have independent
            evidence for a claim, we will publish the evidence with it.
          </p>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="editorial">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeading
              id="editorial"
              kicker="How content is chosen"
              title="Knowledge without unnecessary negativity"
              lead="That does not mean hiding reality. It means that when a difficult subject matters, it is covered with context, at an age-appropriate level, and without graphic material."
            />
            <div className="space-y-4">
              {[
                ["Age-appropriate, not childish", "Young readers are given real information in plain language. We do not talk down to them."],
                ["No sensationalism or clickbait", "Headlines describe what the article says. Nothing is written to alarm."],
                ["Reasoning, not just conclusions", "Articles show how something is known, and regularly end by asking the reader what they think."],
                ["Positive by default", "Discovery, effort, kindness and problem-solving get more space than conflict."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-card border border-line bg-cream p-5">
                  <h3 className="text-[1.05rem]">{t}</h3>
                  <p className="mt-1 text-[0.92rem] text-ink-soft">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="leaf" labelledBy="together">
        <Container>
          <SectionHeading
            id="together"
            kicker="Do it together"
            title="Six activities for this week"
            lead="Built around what is in the edition. Most take about fifteen minutes and need nothing you do not already have at home."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {familyActivities.map((a) => (
              <li key={a.title}>
                <Card className="h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sun-100 text-sun-800">
                      <Icon name={a.icon} className="h-5 w-5" />
                    </span>
                    <Chip className="bg-navy-50 text-navy-700 ring-navy-200">{a.minutes}</Chip>
                  </div>
                  <h3 className="mt-4 text-lg">{a.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] text-ink-soft">{a.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="safety">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeading
              id="safety"
              kicker="Safety & privacy"
              title="What we ask for, and what we publish"
              lead="This matters more on a children's site than anywhere else, so it is written plainly rather than buried."
            />
            <ul className="space-y-3">
              {[
                ["We ask children for a first name only", "There is no field for a surname anywhere on the submission form."],
                ["A parent or guardian must consent", "Nothing a child sends can be submitted without a grown-up's name, email and explicit consent."],
                ["Nothing is published automatically", "The editorial team reads every entry, and we contact the parent or guardian before anything appears."],
                ["We never publish contact details", "No email address, phone number or full address of a child is ever shown."],
                ["No public profiles, no child accounts", "There is nothing here for a child to sign up to, and no way for one child to message another."],
                ["Quiz results are not stored", "Play as many times as you like — nothing is recorded and nothing is sent to us."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3.5 rounded-card border border-line bg-paper p-5">
                  <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" strokeWidth={2} />
                  <div>
                    <h3 className="text-[1.02rem]">{t}</h3>
                    <p className="mt-1 text-[0.9rem] text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 text-[0.92rem] text-ink-soft">
            The full detail is in our{" "}
            <Link href="/privacy" className="font-semibold text-blue-700 underline">
              privacy policy
            </Link>
            . We do not describe KidsChron as &ldquo;100% safe&rdquo; or claim
            compliance with any particular children&apos;s privacy regulation,
            because those are claims that need legal review — not marketing.
          </p>
        </Container>
      </Section>

      <Section tone="cream" labelledBy="sub">
        <Container>
          <SectionHeading id="sub" align="center" kicker="Subscription" title="Ready to subscribe?" />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {plans.map((p) => (
              <SubscriptionPlanCard key={p.id} plan={p} compact />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
