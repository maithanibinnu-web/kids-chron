/**
 * AUTHORITATIVE BRAND & ORGANISATION DATA
 * ------------------------------------------------------------------
 * Everything in this file was supplied by KidsChron and is treated as
 * fact. Nothing here may be invented or embellished by a developer.
 * If a value is not known it is `null` and the UI renders an explicit
 * "to be confirmed" state.
 */

export const site = {
  name: "KidsChron",
  legalEntity: "Prakritik India Initiatives Pvt. Ltd.",
  legalEntityFull: "PRAKRITIK INDIA INITIATIVES PRIVATE LIMITED",
  url: "https://www.kidschron.com",
  /** PRIMARY message. Never reworded. */
  tagline: "The Newspaper for Curious Minds",
  /** SECONDARY message. */
  motto: "Read. Discover. Think. Grow.",
  /** SUPPORTING message. */
  supporting: "Let's Build a Smarter, Greener Tomorrow!",
  /** BRAND PHILOSOPHY. */
  philosophy: ["People", "Planet", "Positive Change"],
  /** CLOSING message. */
  closing: "Because Curious Minds Build a Better World!",
  mission:
    "To contribute towards all round and holistic development of children by introducing them to a medium of knowledge that is focused at providing information that shapes the future of the child in multi-dimensional ways.",
  description:
    "KidsChron is a children's newspaper and knowledge platform that brings curious young readers news, science, nature, history, puzzles, quizzes and creative activities — all age-appropriate, positive and made to be read, not scrolled.",
} as const;

export const contact = {
  phones: ["070859 15643", "07248284001"],
  /** tel: hrefs — Indian numbers in E.164 for reliable dialling. */
  phoneHrefs: ["+917085915643", "+917248284001"],
  email: "info@kidschron.com",
  website: "www.KidsChron.com",
  websiteHref: "https://www.KidsChron.com",
  city: "Dehradun",
  state: "Uttarakhand",
  country: "India",
  locationLabel: "Dehradun, Uttarakhand",
} as const;

/** Bank details exactly as supplied. Never altered, never guessed. */
export const payment = {
  accountName: "PRAKRITIK INDIA INITIATIVES PRIVATE LIMITED",
  accountNumber: "1767102000005241",
  ifsc: "IBKL0001767",
  bank: "IDBI BANK",
  branch: "NANURKHERA",
  methods: ["NEFT", "IMPS", "UPI", "Bank Transfer"],
  /**
   * No UPI QR image or VPA has been supplied. The Scan & Pay panel
   * therefore renders a clearly-marked placeholder frame. Drop the
   * verified QR into /public/brand/upi-qr.png and set `qrImage` to
   * that path — nothing else needs to change.
   */
  qrImage: null as string | null,
  upiId: null as string | null,
} as const;

/**
 * SOCIAL — no official handles have been supplied, so every entry is
 * `href: null`. The footer renders these as disabled, labelled slots
 * rather than linking to accounts that may not exist.
 */
export const socials = [
  { name: "YouTube", href: null as string | null },
  { name: "Instagram", href: null as string | null },
  { name: "Facebook", href: null as string | null },
  { name: "LinkedIn", href: null as string | null },
];

/** Publication facts that have NOT been officially confirmed. The FAQ
 *  and edition pages read from here so a single edit makes them all
 *  truthful at once. */
export const publication = {
  /** 24 editions per year / 12 per six months implies fortnightly,
   *  but this has not been stated outright, so it stays unconfirmed. */
  frequency: null as string | null,
  pagesPerEdition: 12,
  deliveryNote:
    "The printed edition is despatched to the delivery address given on the subscription form.",
  deliveryTimeline: null as string | null,
};

/* ============================================================
   NAVIGATION
   Children need short, verb-led labels. Parents need to find
   "Parent Zone", "Schools" and "Subscribe" without hunting.
   ============================================================ */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  /** Mega-menu columns. Absent = a plain link. */
  columns?: { heading: string; links: NavLink[] }[];
  /** Short line shown at the foot of the mega-menu. */
  footnote?: string;
}

export const primaryNav: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Explore",
    href: "/explore",
    columns: [
      {
        heading: "The World",
        links: [
          { label: "India", href: "/explore/india", description: "News from home" },
          { label: "World", href: "/explore/world", description: "News from everywhere" },
          { label: "Sports", href: "/explore/sports", description: "Games, records, heroes" },
          { label: "History", href: "/explore/history", description: "Footprints from the past" },
        ],
      },
      {
        heading: "How Things Work",
        links: [
          { label: "Science", href: "/explore/science", description: "Why? How? What if?" },
          { label: "Technology", href: "/explore/technology", description: "Inventions and ideas" },
          { label: "General Knowledge", href: "/explore/general-knowledge", description: "Facts worth keeping" },
        ],
      },
      {
        heading: "Our Planet",
        links: [
          { label: "Nature & Wildlife", href: "/explore/nature", description: "Animals and wild places" },
          { label: "Environment", href: "/explore/environment", description: "Looking after the Earth" },
        ],
      },
    ],
    footnote: "Every article is written for a young reader — clear, positive and age-appropriate.",
  },
  {
    label: "Play",
    href: "/play",
    columns: [
      {
        heading: "Think & Solve",
        links: [
          { label: "Quizzes", href: "/play/quizzes", description: "Test what you know" },
          { label: "Puzzles", href: "/play/puzzles", description: "Riddles, logic, words" },
          { label: "Brain Teasers", href: "/play/puzzles?kind=brain-teaser", description: "A tricky one a day" },
        ],
      },
    ],
    footnote: "No scores are stored and nothing is shared. Play as many times as you like.",
  },
  {
    label: "Create",
    href: "/create",
    columns: [
      {
        heading: "Make Something",
        links: [
          { label: "Creativity Corner", href: "/create", description: "Stories, art, poems, DIY" },
          { label: "Submit Your Creation", href: "/create/submit", description: "With a grown-up's consent" },
          { label: "Reader Corner", href: "/reader-corner", description: "Work by young readers" },
        ],
      },
    ],
  },
  { label: "Competitions", href: "/competitions" },
  { label: "Editions", href: "/editions" },
  { label: "Parents", href: "/parents" },
  { label: "Schools", href: "/schools" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "KidsChron",
    links: [
      { label: "About KidsChron", href: "/about" },
      { label: "Why KidsChron", href: "/why-kidschron" },
      { label: "What's Inside", href: "/whats-inside" },
      { label: "Monthly Editions", href: "/editions" },
      { label: "Extra Resources", href: "/resources" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { label: "Knowledge Hub", href: "/explore" },
      { label: "Puzzles & Quizzes", href: "/play" },
      { label: "Competitions", href: "/competitions" },
      { label: "Creativity Corner", href: "/create" },
      { label: "Reader Corner", href: "/reader-corner" },
    ],
  },
  {
    heading: "For Grown-Ups",
    links: [
      { label: "Parent Zone", href: "/parents" },
      { label: "Schools & Institutions", href: "/schools" },
      { label: "Subscription", href: "/subscribe" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Child Safety & Consent", href: "/privacy#children" },
      { label: "Search", href: "/search" },
    ],
  },
];
