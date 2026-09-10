import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { contentModes, whyAnswer, whyPoints } from "@/content";

export const metadata: Metadata = {
  title: "Why KidsChron",
  description:
    "Why a printed children's newspaper still matters in an age of endless information — and what KidsChron does differently for young readers and their parents.",
  alternates: { canonical: "/why-kidschron" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Why KidsChron" }];

export default function WhyPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="Why KidsChron"
        title="Technology is useful. This is the other kind of reading."
        lead="KidsChron is not an argument against screens, the internet or any other medium. It is an argument for something children also need: information chosen carefully, written for their age, and built to be read rather than scrolled."
      />

      <Section tone="cream" labelledBy="problem">
        <Container>
          <SectionHeading
            id="problem"
            kicker="The situation"
            title="Four things every parent recognises"
            lead="None of these are anyone's fault. They are just what the information environment looks like now."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyPoints.map((p) => (
              <li key={p.title}>
                <Card className="h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-50 text-navy-700">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 text-[0.92rem] text-ink-soft">{p.body}</p>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl2 bg-leaf-50 p-7 ring-1 ring-inset ring-leaf-200 sm:p-9">
            <h2 className="text-2xl text-leaf-900">{whyAnswer.heading}</h2>
            <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-leaf-800">
              {whyAnswer.body}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="different">
        <Container>
          <SectionHeading
            id="different"
            kicker="What makes KidsChron different"
            title="Eleven things we try to get right"
            lead="No comparisons with anyone else — just what we hold ourselves to."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Positive information", "Discovery, effort and problem-solving get more space than conflict."],
              ["Written for a young reader", "Real information in plain language. Never talking down."],
              ["Knowledge across subjects", "Science, nature, history, sport, world and India, all in one place."],
              ["Interactive learning", "Quizzes and puzzles that explain themselves."],
              ["Creativity has a home", "A page that belongs to what readers make."],
              ["Critical thinking", "Articles show reasoning, not just conclusions."],
              ["Parent–child engagement", "Activities designed to be done together."],
              ["Responsible citizenship", "Kindness and responsibility as skills, not slogans."],
              ["Environmental awareness", "A thread through the whole paper, not a token page."],
              ["Reading habit", "Short enough to finish. Regular enough to become a habit."],
              ["Education and entertainment", "If it is not enjoyable, it does not get read."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-card border border-line bg-cream p-5">
                <h3 className="text-[1.05rem]">{t}</h3>
                <p className="mt-1 text-[0.9rem] text-ink-soft">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="navy" labelledBy="modes">
        <Container>
          <SectionHeading
            id="modes"
            invert
            align="center"
            kicker="The balance"
            title="Inform, engage, inspire, create"
            lead="Every edition, and this whole website, is built to keep these four in balance."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contentModes.map((m) => (
              <li key={m.id} className="rounded-card bg-navy-800/70 p-6 ring-1 ring-inset ring-navy-700">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${
                    { blue: "bg-blue-500", sun: "bg-sun-400 text-navy-900", coral: "bg-coral-500", leaf: "bg-leaf-500" }[m.theme]
                  }`}
                >
                  <Icon name={m.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl text-white">{m.label}</h3>
                <p className="mt-2 text-[0.92rem] text-navy-200">{m.line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <ButtonLink href="/subscribe" variant="sun" size="lg">
              Subscribe to KidsChron
            </ButtonLink>
          </p>
        </Container>
      </Section>
    </>
  );
}
