import type { IconName } from "./types";

/**
 * HOMEPAGE EDITORIAL SLOTS
 * Everything an editor should be able to change without a developer.
 * Components read from here; they contain no editorial copy of their own.
 */

/** "What do you want to discover today?" — the child's entry point. */
export const discoverChips: { label: string; href: string; icon: IconName }[] = [
  { label: "Science", href: "/explore/science", icon: "atom" },
  { label: "Animals", href: "/explore/nature", icon: "paw" },
  { label: "Space", href: "/explore/science", icon: "rocket" },
  { label: "Nature", href: "/explore/environment", icon: "leaf" },
  { label: "World", href: "/explore/world", icon: "globe" },
  { label: "India", href: "/explore/india", icon: "flag" },
  { label: "Sports", href: "/explore/sports", icon: "trophy" },
  { label: "History", href: "/explore/history", icon: "scroll" },
  { label: "Technology", href: "/explore/technology", icon: "chip" },
  { label: "Amazing Facts", href: "/explore/general-knowledge", icon: "bulb" },
];

/** "Did You Know?" rotating cards. All verifiable, evergreen facts. */
export const didYouKnow: { fact: string; tag: string }[] = [
  {
    fact: "Honey found in ancient Egyptian tombs was still edible after more than 3,000 years. Honey barely ever spoils.",
    tag: "Nature",
  },
  {
    fact: "A day on Venus is longer than its year. It takes longer to spin once than to travel all the way around the Sun.",
    tag: "Space",
  },
  {
    fact: "Octopuses have three hearts, and two of them stop beating while the octopus swims.",
    tag: "Wildlife",
  },
  {
    fact: "The Himalayas are still growing — India is pushing into Asia by a few centimetres every year.",
    tag: "Earth",
  },
  {
    fact: "Bananas are berries. Strawberries are not.",
    tag: "Science",
  },
  {
    fact: "Light from the Sun takes about eight minutes and twenty seconds to reach the Earth.",
    tag: "Space",
  },
  {
    fact: "The word 'shampoo' comes from the Hindi word chāmpo, meaning to press or massage.",
    tag: "Words",
  },
];

/** "Today's Curiosity" — one short daily item, editor-owned. */
export const todaysCuriosity = {
  question: "Why does a cut apple turn brown?",
  answer:
    "Cutting an apple breaks open its cells and lets oxygen reach chemicals inside that were kept apart. They react and turn brown — the same reason a squeeze of lemon juice slows it down, because the acid interferes with the reaction.",
  tryThis: "Cut an apple into four. Leave one piece plain, cover one, squeeze lemon on one, and put one in the fridge. Check them in an hour.",
};

/** "Why KidsChron?" — the information problem, framed positively.
 *  Deliberately does not attack technology, the internet or media. */
export const whyPoints: { title: string; body: string; icon: IconName }[] = [
  {
    title: "So much information, so little sorted",
    body: "Children meet more information in a day than any generation before them. Very little of it arrives sorted, checked or explained.",
    icon: "search",
  },
  {
    title: "Attention pulled in every direction",
    body: "A screen is designed to offer the next thing before the last one has finished. Sustained reading is a different skill, and it needs somewhere to happen.",
    icon: "compass",
  },
  {
    title: "Not everything is written for a child",
    body: "Language, images and subject matter meant for adults reach children anyway. Age-appropriate is not the same as childish.",
    icon: "shield",
  },
  {
    title: "Knowledge worth keeping",
    body: "A fact you looked up and forgot is different from one you read, thought about, and can explain to someone else.",
    icon: "bulb",
  },
];

export const whyAnswer = {
  heading: "KidsChron is the other kind of reading",
  body: "Technology is genuinely useful, and KidsChron is not against it. But alongside it, children need something slower: a trusted place where information is chosen carefully, written for their age, and built to be read rather than scrolled. That is what a newspaper made for curious minds is for.",
};

/** The four content modes, shown as the site's spine. */
export const contentModes: {
  id: string;
  label: string;
  line: string;
  href: string;
  cta: string;
  icon: IconName;
  theme: "blue" | "leaf" | "sun" | "coral";
}[] = [
  {
    id: "inform",
    label: "Inform",
    line: "News, science, environment, history and general knowledge — explained, not just reported.",
    href: "/explore",
    cta: "Start Exploring",
    icon: "globe",
    theme: "blue",
  },
  {
    id: "engage",
    label: "Engage",
    line: "Quizzes, puzzles, riddles and brain teasers that make thinking feel like playing.",
    href: "/play",
    cta: "Challenge Your Brain",
    icon: "puzzle",
    theme: "sun",
  },
  {
    id: "inspire",
    label: "Inspire",
    line: "Stories of discovery, kindness, effort and positive change — real people, real ideas.",
    href: "/explore/india",
    cta: "Find a Story",
    icon: "sparkle",
    theme: "coral",
  },
  {
    id: "create",
    label: "Create",
    line: "Art, writing, DIY and experiments — and a place to send in what you make.",
    href: "/create",
    cta: "Show Your Creativity",
    icon: "palette",
    theme: "leaf",
  },
];

/** "Positive Minds" — the guidance & counselling pillar. */
export const positiveMinds: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Empathy",
    body: "Understanding what it is like to be someone else — the skill underneath every friendship.",
    icon: "heart",
  },
  {
    title: "Speaking up clearly",
    body: "Saying what you mean, listening properly, and disagreeing without falling out.",
    icon: "hands",
  },
  {
    title: "Making decisions",
    body: "Weighing choices, noticing your own reasons, and being able to change your mind.",
    icon: "brain",
  },
  {
    title: "Responsible citizenship",
    body: "Understanding that what you do affects people you will never meet — and the planet you share.",
    icon: "shield",
  },
];

/** The printed newspaper's 12 pages, as a visual grid. */
export const whatsInside: { section: string; blurb: string; icon: IconName; theme: "blue" | "leaf" | "sun" | "coral" | "navy" }[] = [
  { section: "Cover Story", blurb: "The month's big subject, opened up.", icon: "book", theme: "navy" },
  { section: "Wildlife & Nature", blurb: "Animals, birds and wild places.", icon: "paw", theme: "leaf" },
  { section: "Science & Technology", blurb: "How things work and who worked them out.", icon: "atom", theme: "blue" },
  { section: "General Knowledge", blurb: "Facts worth keeping.", icon: "bulb", theme: "sun" },
  { section: "International News", blurb: "The world, at a readable size.", icon: "globe", theme: "navy" },
  { section: "Environment", blurb: "The planet, and what helps it.", icon: "recycle", theme: "leaf" },
  { section: "Historical Footprints", blurb: "How we got here.", icon: "scroll", theme: "coral" },
  { section: "Sports & Activities", blurb: "Games, records and things to try.", icon: "trophy", theme: "coral" },
  { section: "Guidance & Counselling", blurb: "Growing up, thought through.", icon: "heart", theme: "blue" },
  { section: "Creativity Corner", blurb: "Stories, art and reader work.", icon: "palette", theme: "sun" },
  { section: "Infographics", blurb: "Big ideas, drawn to be understood.", icon: "sparkle", theme: "blue" },
  { section: "Puzzles & Quizzes", blurb: "Six pages' worth of thinking.", icon: "puzzle", theme: "leaf" },
];

/** Parent & Child Zone — activities to do together. */
export const familyActivities: { title: string; body: string; minutes: string; icon: IconName }[] = [
  {
    title: "The kitchen experiment",
    body: "Try the browning-apple test from Today's Curiosity together and write down what each of you predicted first.",
    minutes: "20 min",
    icon: "atom",
  },
  {
    title: "One map, one river",
    body: "Pick a river near you on a map and trace it from source to sea. Where does it start? Who lives along it?",
    minutes: "15 min",
    icon: "globe",
  },
  {
    title: "Read it out loud",
    body: "Take one article from the edition and read alternate paragraphs to each other. Then each ask one question.",
    minutes: "10 min",
    icon: "book",
  },
  {
    title: "Puzzle race",
    body: "Both attempt the same riddle separately, then compare how you each got there.",
    minutes: "10 min",
    icon: "puzzle",
  },
  {
    title: "Fact-check a claim",
    body: "Find one surprising claim from the week and run it through the four questions together.",
    minutes: "15 min",
    icon: "search",
  },
  {
    title: "Build the recycling habit",
    body: "Sort one day's waste together into wet and dry, and count what could have been kept out of the bin.",
    minutes: "15 min",
    icon: "recycle",
  },
];

/** Parent Zone — what KidsChron supports. */
export const parentBenefits: { title: string; body: string; icon: IconName }[] = [
  { title: "Builds a reading habit", body: "Something arrives, gets read, and gets finished. A short printed edition is a manageable, satisfying unit of reading.", icon: "book" },
  { title: "Balances screen time", body: "Not a lecture about screens — just a genuinely interesting alternative that happens to be made of paper.", icon: "shield" },
  { title: "Feeds curiosity", body: "Every page is written to leave a child with a question, not just an answer.", icon: "bulb" },
  { title: "Develops critical thinking", body: "Articles show reasoning, not only conclusions, and regularly ask the reader what they think.", icon: "brain" },
  { title: "Supports creativity", body: "Writing, drawing and making have a place to go — and a chance of being published.", icon: "palette" },
  { title: "Encourages conversation", body: "Family activities and 'think about it' prompts give you something specific to talk about together.", icon: "hands" },
  { title: "Widens general knowledge", body: "Science, nature, history, sport, world affairs and India — in one place, every edition.", icon: "globe" },
  { title: "Models empathy and responsibility", body: "Guidance and counselling pages treat kindness, honesty and citizenship as skills that can be practised.", icon: "heart" },
  { title: "Prioritises positive information", body: "Difficult subjects are covered with context and without graphic material. Knowledge without unnecessary negativity.", icon: "sparkle" },
];

/** Schools & institutions. */
export const schoolOfferings: { title: string; body: string; icon: IconName }[] = [
  { title: "Institutional subscriptions", body: "Copies for a class, a year group, a library or a reading room. Tell us the numbers and we will work out the arrangement.", icon: "book" },
  { title: "School competitions", body: "Run a KidsChron quiz, drawing or writing competition within your school, with entries considered for publication.", icon: "trophy" },
  { title: "Reader contributions", body: "Your students' stories, artwork and experiments can be submitted for the Reader Corner.", icon: "pen" },
  { title: "Knowledge activities", body: "Puzzle pages, quizzes and discussion prompts that fit into a reading period or a form-time slot.", icon: "puzzle" },
  { title: "Workshops & collaboration", body: "Talk to us about workshops and joint educational initiatives. Availability is arranged case by case.", icon: "hands" },
  { title: "Extra resources", body: "ICT training, counselling sessions and scholarship initiatives are part of the wider KidsChron ecosystem. Details are announced as each is confirmed.", icon: "sparkle" },
];

/** Microcopy pool — used sparingly, one line at a time. */
export const microcopy = {
  heroKicker: "A printed newspaper for young readers",
  discoverPrompt: "What do you want to discover today?",
  quizNudge: "No score is saved. Play as many times as you like.",
  submitNudge: "A grown-up helps you send it. Nothing is published without their consent.",
  newsletter: "Stay Curious. Stay Connected.",
  sampleLabel: "Sample content",
};
