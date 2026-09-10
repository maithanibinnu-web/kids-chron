import type { Competition } from "./types";

/**
 * SAMPLE competitions.
 * Dates, prizes and eligibility are deliberately LEFT OUT wherever
 * KidsChron has not announced them. The UI renders an explicit
 * "to be announced" state — it does not invent a deadline or a prize.
 */
export const competitions: Competition[] = [
  {
    slug: "draw-your-green-tomorrow",
    title: "Draw Your Green Tomorrow",
    category: "environment",
    summary:
      "Draw or paint the world you would like to live in twenty years from now. Any medium, any style — we want to see the idea.",
    status: "open",
    artwork: { art: "art", alt: "Paintbrushes and a half-finished landscape" },
    provenance: "sample",
    eligibility: "Open to school students. Age categories to be confirmed.",
    rules: [
      "The work must be created by the entrant themselves.",
      "One entry per person.",
      "Submit a clear photograph or scan of the original artwork.",
      "A parent or guardian must give consent when the entry is submitted.",
      "Do not include your school name, address or phone number anywhere on the artwork.",
    ],
    howToEnter: [
      "Complete the entry form on the Creativity Corner submission page.",
      "Choose 'Competition entry' and select this competition.",
      "Upload a photograph of your artwork.",
      "A parent or guardian confirms consent and submits.",
    ],
    faqs: [
      {
        question: "Can I enter more than once?",
        answer: "One entry per person, so choose the piece you are happiest with.",
      },
      {
        question: "Will my original artwork be returned?",
        answer: null,
      },
      {
        question: "Does it have to be on paper?",
        answer:
          "No. Paint, crayon, collage, digital drawing — all welcome. Send a clear photograph of whatever you make.",
      },
    ],
  },
  {
    slug: "young-writers-100-words",
    title: "The 100-Word Story",
    category: "general-knowledge",
    summary:
      "Tell a complete story in exactly one hundred words. A beginning, a middle and an end — and not a word to spare.",
    status: "open",
    artwork: { art: "art", alt: "A pencil resting on a page of handwriting" },
    provenance: "sample",
    eligibility: "Open to school students.",
    rules: [
      "Exactly 100 words, not counting the title.",
      "The story must be your own original writing.",
      "Any subject, as long as it is suitable for a family newspaper.",
      "A parent or guardian must give consent when the entry is submitted.",
    ],
    howToEnter: [
      "Write and count your story carefully.",
      "Submit it through the Creativity Corner submission page as a 'Competition entry'.",
      "A parent or guardian confirms consent and submits.",
    ],
    faqs: [
      {
        question: "Does the title count towards the hundred words?",
        answer: "No — the title is free. The story itself must be exactly 100 words.",
      },
      {
        question: "Can I write in a language other than English?",
        answer: null,
      },
    ],
  },
  {
    slug: "junior-gk-challenge",
    title: "Junior GK Challenge",
    category: "general-knowledge",
    summary:
      "A general knowledge challenge across science, nature, history, sport and current affairs, run for young readers.",
    status: "upcoming",
    artwork: { art: "globe", alt: "A quiz buzzer beside a globe" },
    provenance: "sample",
    rules: [
      "Individual entry — no help from grown-ups during the challenge.",
      "One attempt per entrant.",
      "Full rules will be published with the announcement.",
    ],
    howToEnter: [
      "Details of how to enter will be published on this page when the challenge opens.",
      "Subscribers are notified in the edition that carries the announcement.",
    ],
  },
  {
    slug: "young-scientist-experiment",
    title: "Young Scientist: Show Us an Experiment",
    category: "science",
    summary:
      "Do a safe experiment at home, record what you expected, what happened, and what you think explains it.",
    status: "upcoming",
    artwork: { art: "lab", alt: "A beaker, a magnifying glass and a notebook" },
    provenance: "sample",
    rules: [
      "The experiment must be safe and carried out with a grown-up present.",
      "No fire, no chemicals from outside the kitchen, no electricity from a wall socket.",
      "Record your prediction before you start — that is part of what is judged.",
      "A parent or guardian must give consent when the entry is submitted.",
    ],
    howToEnter: [
      "Details of how to enter will be published on this page when the competition opens.",
    ],
    faqs: [
      {
        question: "Does the experiment have to work?",
        answer:
          "No. An experiment that did not go as you predicted, explained honestly and thoughtfully, can be a stronger entry than one that did.",
      },
    ],
  },
];

export const competitionBySlug = (slug: string) =>
  competitions.find((c) => c.slug === slug);

export const COMPETITION_STATUS: Record<
  Competition["status"],
  { label: string; tone: "open" | "soon" | "closed" }
> = {
  open: { label: "Open for entries", tone: "open" },
  upcoming: { label: "Opening soon", tone: "soon" },
  judging: { label: "Judging in progress", tone: "soon" },
  closed: { label: "Closed", tone: "closed" },
};
