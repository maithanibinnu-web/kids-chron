import type { Category } from "./types";

/**
 * The nine knowledge categories. These map the printed newspaper's
 * sections onto a digital taxonomy without locking the site into a
 * 12-page print structure — a new category is a new entry here and
 * nothing else.
 */
export const categories: Category[] = [
  {
    slug: "science",
    name: "Science",
    tagline: "Why does that happen?",
    description:
      "Experiments, discoveries and the everyday science hiding in plain sight — explained clearly, without the jargon.",
    theme: "blue",
    icon: "atom",
    group: "explore",
  },
  {
    slug: "nature",
    name: "Nature & Wildlife",
    tagline: "Meet the neighbours",
    description:
      "Animals, birds, forests and oceans — how they live, why they matter and what young readers can do for them.",
    theme: "leaf",
    icon: "paw",
    group: "explore",
  },
  {
    slug: "world",
    name: "World",
    tagline: "News from everywhere",
    description:
      "International news and current affairs, told at a level a young reader can follow and think about.",
    theme: "navy",
    icon: "globe",
    group: "explore",
  },
  {
    slug: "india",
    name: "India",
    tagline: "News from home",
    description:
      "What is happening across India — achievements, discoveries, culture and events that matter to children.",
    theme: "sun",
    icon: "flag",
    group: "explore",
  },
  {
    slug: "environment",
    name: "Environment",
    tagline: "Looking after the Earth",
    description:
      "Climate, conservation, clean energy and everyday habits — practical, hopeful and never frightening.",
    theme: "leaf",
    icon: "recycle",
    group: "explore",
  },
  {
    slug: "history",
    name: "History",
    tagline: "Footprints from the past",
    description:
      "Historical footprints — the people, places and turning points that explain the world we live in now.",
    theme: "coral",
    icon: "scroll",
    group: "explore",
  },
  {
    slug: "sports",
    name: "Sports",
    tagline: "Games, records, heroes",
    description:
      "Sport, fitness and the stories of people who kept going — plus activities to try after school.",
    theme: "coral",
    icon: "trophy",
    group: "explore",
  },
  {
    slug: "technology",
    name: "Technology",
    tagline: "Inventions and ideas",
    description:
      "How technology works, who builds it and how to use it thoughtfully — written for curious beginners.",
    theme: "blue",
    icon: "chip",
    group: "explore",
  },
  {
    slug: "general-knowledge",
    name: "General Knowledge",
    tagline: "Facts worth keeping",
    description:
      "The facts, records and 'did you know?' moments that make a young reader the most interesting person in the room.",
    theme: "sun",
    icon: "bulb",
    group: "learn",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

/** Tailwind class sets per theme. Kept here so every card, badge and
 *  section pulls identical colour treatment from one place. */
export const themeStyles = {
  blue: {
    chipBg: "bg-blue-50",
    chipText: "text-blue-700",
    chipRing: "ring-blue-200",
    tint: "bg-blue-50",
    solid: "bg-blue-600",
    solidText: "text-white",
    accent: "text-blue-600",
    border: "border-blue-200",
    glow: "from-blue-200/70",
  },
  leaf: {
    chipBg: "bg-leaf-50",
    chipText: "text-leaf-700",
    chipRing: "ring-leaf-200",
    tint: "bg-leaf-50",
    solid: "bg-leaf-600",
    solidText: "text-white",
    accent: "text-leaf-700",
    border: "border-leaf-200",
    glow: "from-leaf-200/70",
  },
  sun: {
    chipBg: "bg-sun-50",
    chipText: "text-sun-800",
    chipRing: "ring-sun-200",
    tint: "bg-sun-50",
    solid: "bg-sun-400",
    solidText: "text-navy-900",
    accent: "text-sun-700",
    border: "border-sun-200",
    glow: "from-sun-200/70",
  },
  coral: {
    chipBg: "bg-coral-50",
    chipText: "text-coral-700",
    chipRing: "ring-coral-200",
    tint: "bg-coral-50",
    solid: "bg-coral-500",
    solidText: "text-white",
    accent: "text-coral-600",
    border: "border-coral-200",
    glow: "from-coral-200/70",
  },
  navy: {
    chipBg: "bg-navy-50",
    chipText: "text-navy-700",
    chipRing: "ring-navy-200",
    tint: "bg-navy-50",
    solid: "bg-navy-800",
    solidText: "text-white",
    accent: "text-navy-700",
    border: "border-navy-200",
    glow: "from-navy-200/70",
  },
} as const;

export type ThemeStyle = (typeof themeStyles)[keyof typeof themeStyles];

export const styleFor = (slug: string): ThemeStyle => {
  const cat = categoryBySlug(slug);
  return themeStyles[cat?.theme ?? "blue"];
};
