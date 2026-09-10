import type { Edition, MonthlyTheme } from "./types";

/**
 * SAMPLE editions. Issue numbers, months and covers are illustrative
 * — they demonstrate how the edition system works and must be
 * replaced with the real publishing schedule. `pageCount: 12` is the
 * one confirmed fact here.
 */
export const editions: Edition[] = [
  {
    slug: "2026-09",
    issueLabel: "Issue 12",
    month: "September 2026",
    themeTitle: "Water",
    themeBlurb:
      "Where it comes from, where it goes, and why the same drop has been going round for millions of years.",
    coverArt: "ocean",
    coverAlt: "A cover illustration of a river running from mountains to the sea",
    provenance: "sample",
    isCurrent: true,
    pageCount: 12,
    puzzleCount: 6,
    highlights: [
      { section: "Cover Story", headline: "The Water That Has Been Here Since the Dinosaurs" },
      { section: "Environment", headline: "What Really Happens After You Drop Something in the Recycling Bin" },
      { section: "Science & Technology", headline: "Why Is the Sky Blue — and Why Does It Turn Orange at Sunset?" },
      { section: "Wildlife & Nature", headline: "The Honeybee That Gives Directions by Dancing" },
      { section: "Historical Footprints", headline: "The Story of Zero" },
      { section: "Creativity Corner", headline: "Draw Your Green Tomorrow — competition opens" },
    ],
    articles: [
      "how-recycling-actually-works",
      "why-the-sky-is-blue",
      "honeybee-waggle-dance",
      "story-of-zero",
    ],
    quiz: "our-planet-basics",
    competition: "draw-your-green-tomorrow",
  },
  {
    slug: "2026-08",
    issueLabel: "Issue 11",
    month: "August 2026",
    themeTitle: "Looking Up",
    themeBlurb: "Space, sky, satellites and the people who send things beyond the atmosphere.",
    coverArt: "space",
    coverAlt: "A cover illustration of a lander on the Moon with Earth in the sky",
    provenance: "sample",
    pageCount: 12,
    puzzleCount: 6,
    highlights: [
      { section: "Cover Story", headline: "Why India Landed Chandrayaan-3 Near the Moon's South Pole" },
      { section: "Science & Technology", headline: "Why Don't Satellites Fall Down?" },
      { section: "General Knowledge", headline: "Four Questions to Ask Before You Believe Something" },
      { section: "Sports & Activities", headline: "How the Paralympics Makes a Race Fair" },
    ],
    articles: [
      "chandrayaan-3-south-pole",
      "how-satellites-stay-up",
      "how-to-tell-if-a-fact-is-true",
      "paralympic-classification",
    ],
    quiz: "space-and-sky",
  },
  {
    slug: "2026-07",
    issueLabel: "Issue 10",
    month: "July 2026",
    themeTitle: "Wild Neighbours",
    themeBlurb: "The animals, forests and grasslands that share this country with us.",
    coverArt: "wildlife",
    coverAlt: "A cover illustration of a hornbill perched in a misty forest",
    provenance: "sample",
    pageCount: 12,
    puzzleCount: 6,
    highlights: [
      { section: "Cover Story", headline: "The Western Ghats: Species Found Nowhere Else" },
      { section: "Environment", headline: "The Great Indian Bustard and the Problem of Power Lines" },
      { section: "Wildlife & Nature", headline: "Where the Green Goes: Why Leaves Change Colour" },
      { section: "Guidance & Counselling", headline: "Kindness Is a Skill, Not a Mood" },
    ],
    articles: [
      "western-ghats-hotspot",
      "great-indian-bustard",
      "why-leaves-change-colour",
      "kindness-is-a-skill",
    ],
    quiz: "wild-india",
  },
];

export const currentEdition = () =>
  editions.find((e) => e.isCurrent) ?? editions[0];

export const editionBySlug = (slug: string) => editions.find((e) => e.slug === slug);

/** The homepage "Theme of the Month" slot. Fully editor-owned. */
export const monthlyTheme: MonthlyTheme = {
  title: "Water",
  month: "September 2026",
  description:
    "Every drop of water on Earth has been here for a very long time, going round and round the same journey — sea, sky, cloud, river, sea again. This month we follow it, from the monsoon that fills India's rivers to the taps in our homes and the oceans that cover most of the planet.",
  art: "ocean",
  articleSlugs: ["what-is-a-monsoon", "how-recycling-actually-works", "western-ghats-hotspot"],
  quizSlug: "our-planet-basics",
  competitionSlug: "draw-your-green-tomorrow",
  recommendedReading: [
    "Follow a river near you from its source on a map — where does it start, and where does it end up?",
    "Measure how much water a dripping tap wastes in an hour, then work out a whole day.",
    "Find out where your home's drinking water comes from before it reaches the tap.",
  ],
  provenance: "sample",
};
