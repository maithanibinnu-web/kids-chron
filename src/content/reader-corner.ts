import type { ReaderSubmission, SubmissionCategory, Testimonial } from "./types";

/**
 * READER CORNER
 * ------------------------------------------------------------------
 * This array is INTENTIONALLY EMPTY.
 *
 * Reader Corner shows work by real children. Shipping invented
 * submissions under invented children's names would be dishonest and
 * would also model exactly the wrong thing for a platform whose whole
 * promise is that submissions are real and moderated.
 *
 * The Reader Corner page therefore renders an "open slot" state that
 * invites the first submissions. As the editorial team approves real
 * entries, they are added here (or served from the CMS) and the page
 * switches to the gallery layout automatically — no code changes.
 */
export const readerSubmissions: ReaderSubmission[] = [];

/** The four public groupings on the Reader Corner page. Each renders
 *  either real approved work or an invitation to be the first. */
export const readerGroups: {
  id: string;
  title: string;
  blurb: string;
  categories: SubmissionCategory[];
  invitation: string;
}[] = [
  {
    id: "writers",
    title: "Young Writers",
    blurb: "Stories, poems and pieces written by readers.",
    categories: ["story", "poem"],
    invitation: "Selected stories and poems by young readers will appear here.",
  },
  {
    id: "artists",
    title: "Young Artists",
    blurb: "Drawing, painting, collage and photography.",
    categories: ["artwork", "photography"],
    invitation: "Selected artwork and photographs by young readers will appear here.",
  },
  {
    id: "makers",
    title: "Young Makers",
    blurb: "Things readers have built, folded, grown or invented.",
    categories: ["diy"],
    invitation: "Selected DIY projects and crafts by young readers will appear here.",
  },
  {
    id: "thinkers",
    title: "Young Thinkers & Scientists",
    blurb: "Experiments, observations and ideas worth sharing.",
    categories: ["experiment", "idea"],
    invitation: "Selected experiments and ideas by young readers will appear here.",
  },
];

export const SUBMISSION_CATEGORY_LABELS: Record<SubmissionCategory, string> = {
  story: "Story",
  poem: "Poem",
  artwork: "Artwork",
  photography: "Photograph",
  diy: "DIY / Craft",
  idea: "Idea",
  experiment: "Experiment",
};

/**
 * TESTIMONIALS
 * No real parent, student or school testimonial has been supplied, so
 * every entry here is a placeholder. The component renders these as
 * empty, clearly-labelled slots. It never invents a quote or a name.
 */
export const testimonials: Testimonial[] = [
  { placeholder: true, role: "A parent" },
  { placeholder: true, role: "A young reader" },
  { placeholder: true, role: "A school" },
];
