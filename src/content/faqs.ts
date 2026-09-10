import type { FaqItem } from "./types";

/**
 * FAQ
 * `answer: null` means KidsChron has not yet confirmed an official
 * answer. The UI renders those as an honest "we'll confirm this"
 * state with a contact link — it never invents a plausible answer.
 */
export const faqs: FaqItem[] = [
  {
    group: "About KidsChron",
    question: "What is KidsChron?",
    answer:
      "KidsChron is a printed children's newspaper — 12 pages of news, general knowledge, science, nature, history, sport, puzzles, quizzes and creative activities, written for young readers. It is an initiative of Prakritik India Initiatives Pvt. Ltd. This website is its digital home: it explains what is inside each edition, carries activities to try, and is where you subscribe.",
  },
  {
    group: "About KidsChron",
    question: "Who is KidsChron for?",
    answer:
      "School-age children who are curious about the world, and the parents and teachers who read alongside them. Content is written to be understood by a young reader on their own, and many activities are designed to be done together with a grown-up.",
  },
  {
    group: "About KidsChron",
    question: "What does the newspaper contain?",
    answer:
      "Each edition carries a cover story, wildlife and nature, science and technology, general knowledge, international news, environment, historical footprints, sports and activities, guidance and counselling, a creativity corner, infographics, and puzzles and quizzes. The exact mix changes with each month's theme.",
  },
  {
    group: "About KidsChron",
    question: "How often is KidsChron published?",
    answer: null,
  },
  {
    group: "About KidsChron",
    question: "Is the content age-appropriate?",
    answer:
      "Yes — that is the point of KidsChron. Difficult subjects are covered when they matter, but always with context, without graphic material, and in language written for a young reader. We do not use sensational headlines or clickbait.",
  },
  {
    group: "Subscription",
    question: "What are the subscription plans?",
    answer:
      "There are two: a Six-Month Subscription of 12 editions (regular ₹1,099, currently ₹899) and a Yearly Subscription of 24 editions (regular ₹1,699, currently ₹1,299). These are the offers currently displayed and may change.",
  },
  {
    group: "Subscription",
    question: "How do I subscribe?",
    answer:
      "Choose a plan, fill in the subscriber and delivery details, make the payment by UPI, NEFT, IMPS or bank transfer, and enter your transaction reference so the team can match your payment. You will get a subscription reference number to quote in any correspondence.",
  },
  {
    group: "Subscription",
    question: "How is payment made?",
    answer:
      "By UPI, NEFT, IMPS or bank transfer to the KidsChron account shown on the subscription page. After paying, enter the transaction or reference number on the form. Your subscription is confirmed once the team has verified the payment against the bank record.",
  },
  {
    group: "Subscription",
    question: "When does my subscription start, and how is the newspaper delivered?",
    answer: null,
  },
  {
    group: "Subscription",
    question: "Can I change my delivery address later?",
    answer:
      "Yes. Write to info@kidschron.com or call the numbers on the Contact page with your subscription reference number and the new address.",
  },
  {
    group: "Schools",
    question: "Can schools subscribe?",
    answer:
      "Yes. Schools, libraries and other institutions can enquire through the Schools page. Tell us the number of copies and the classes involved and the team will come back to you with the arrangements.",
  },
  {
    group: "Children & Creativity",
    question: "Can children submit stories, poems or artwork?",
    answer:
      "Yes — through the Creativity Corner. A parent or guardian must give consent as part of the submission, and every entry is reviewed by the editorial team before anything is published. Nothing appears automatically.",
  },
  {
    group: "Children & Creativity",
    question: "What do you publish about a child whose work is selected?",
    answer:
      "Only a first name and a class or age, and a city if the parent has agreed. We do not publish a child's full name together with their school and locality, and we never publish contact details.",
  },
  {
    group: "Children & Creativity",
    question: "Are competitions available?",
    answer:
      "Yes. Competitions run through the year across quizzes, drawing, writing, general knowledge, science and the environment. Each competition page carries its own dates, rules and entry process; where a date or prize has not been announced yet, the page says so rather than guessing.",
  },
  {
    group: "Contact",
    question: "How can parents contact KidsChron?",
    answer:
      "By phone on 070859 15643 or 07248284001, or by email at info@kidschron.com. The team is based in Dehradun, Uttarakhand.",
  },
];

export const faqGroups = () => {
  const map = new Map<string, FaqItem[]>();
  for (const f of faqs) {
    const g = f.group ?? "General";
    map.set(g, [...(map.get(g) ?? []), f]);
  }
  return [...map.entries()].map(([heading, items]) => ({ heading, items }));
};
