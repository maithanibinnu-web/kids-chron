import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { CompetitionCard } from "@/components/cards/cards";
import {
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { competitions, microcopy, readerGroups } from "@/content";
import type { IconName } from "@/content";

export const metadata: Metadata = {
  title: "Creativity Corner — stories, art, poems and DIY",
  description:
    "The KidsChron Creativity Corner: write a story or poem, draw, take a photograph, build something or run an experiment — and send it in for the Reader Corner.",
  alternates: { canonical: "/create" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Creativity Corner" }];

const kinds: { title: string; blurb: string; icon: IconName; prompt: string }[] = [
  { title: "Stories", icon: "book", blurb: "Any length, any subject.", prompt: "Start with a character who wants something they cannot have." },
  { title: "Poems", icon: "pen", blurb: "Rhyming or not.", prompt: "Write about something small — a spoon, a shadow, a sound." },
  { title: "Drawing & painting", icon: "palette", blurb: "Any material at all.", prompt: "Draw a place that does not exist, but could." },
  { title: "Photography", icon: "camera", blurb: "Taken by you.", prompt: "Photograph the same thing at three different times of day." },
  { title: "DIY & crafts", icon: "hands", blurb: "Made from anything.", prompt: "Build something useful out of what would have gone in the bin." },
  { title: "Experiments", icon: "atom", blurb: "Safe, with a grown-up.", prompt: "Write your prediction down before you start. That is the science part." },
];

export default function CreatePage() {
  const open = competitions.filter((c) => c.status === "open");
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        tone="coral"
        kicker="Create & Imagine"
        title="Make something, then send it in"
        lead="Reading is half of KidsChron. The other half is what young readers make themselves — and the best of it goes in the newspaper."
        aside={
          <ButtonLink href="/create/submit" size="lg">
            Submit Your Creation
          </ButtonLink>
        }
      />

      <Section tone="cream" labelledBy="kinds">
        <Container>
          <SectionHeading
            id="kinds"
            kicker="What you can send"
            title="Six ways in — and a prompt for each"
            lead="Stuck for an idea? Every card below carries one to start you off."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kinds.map((k) => (
              <li key={k.title}>
                <Card className="h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-coral-50 text-coral-600">
                    <Icon name={k.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg">{k.title}</h3>
                  <p className="mt-1 text-[0.9rem] text-ink-soft">{k.blurb}</p>
                  <p className="mt-4 rounded-xl bg-sun-50 px-3.5 py-3 text-[0.86rem] text-sun-900">
                    <strong className="font-bold">Try this: </strong>
                    {k.prompt}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="how">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <SectionHeading
              id="how"
              kicker="How submitting works"
              title="Simple, and safe by design"
              lead={microcopy.submitNudge}
            />
            <ol className="space-y-3">
              {[
                ["A grown-up helps you send it", "The form asks for a parent or guardian's name, email and consent. Nothing can be sent without them."],
                ["We only ask for a first name", "There is no field for a surname anywhere on the form. School is optional and never published."],
                ["The editorial team reads everything", "Nothing appears automatically. A person reads every entry."],
                ["We contact the grown-up first", "If your work is chosen, we email the parent or guardian before it is published anywhere."],
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
          <p className="mt-10">
            <ButtonLink href="/create/submit" size="lg">
              Submit Your Creation
            </ButtonLink>
          </p>
        </Container>
      </Section>

      {open.length > 0 && (
        <Section tone="sun" labelledBy="comps">
          <Container>
            <SectionHeading
              id="comps"
              kicker="Open now"
              title="Competitions you can enter"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {open.map((c) => (
                <CompetitionCard key={c.slug} competition={c} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="mist" labelledBy="corner">
        <Container>
          <SectionHeading
            id="corner"
            kicker="Reader Corner"
            title="Where selected work appears"
            lead="Four groups, all waiting for their first entries. Nothing here is invented — every piece that appears will be real work by a real young reader."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {readerGroups.map((g) => (
              <li key={g.id}>
                <div className="h-full rounded-card border-2 border-dashed border-navy-200 bg-paper/70 p-5">
                  <h3 className="text-[1.05rem]">{g.title}</h3>
                  <p className="mt-1.5 text-[0.88rem] text-ink-soft">{g.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <ButtonLink href="/reader-corner" variant="secondary">
              Visit the Reader Corner
            </ButtonLink>
          </p>
        </Container>
      </Section>
    </>
  );
}
