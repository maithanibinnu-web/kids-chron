import type { SubscriptionPlan } from "./types";

/**
 * SUBSCRIPTION PLANS — figures supplied by KidsChron.
 * These are the *currently displayed offers*, not a permanent
 * guarantee, and the UI labels them that way.
 */
export const plans: SubscriptionPlan[] = [
  {
    id: "six-month",
    name: "Six-Month Subscription",
    editions: 12,
    months: 6,
    regularPrice: 1099,
    offerPrice: 899,
    savings: 200,
    perMonthReference: 149,
    inclusions: [
      "12 printed editions delivered to your address",
      "12 pages of news, knowledge and activities in every edition",
      "Puzzles, quizzes and brain teasers in each issue",
      "Entry to reader competitions and the Creativity Corner",
      "Reader submissions considered for the Reader Corner",
    ],
  },
  {
    id: "yearly",
    name: "Yearly Subscription",
    editions: 24,
    months: 12,
    regularPrice: 1699,
    offerPrice: 1299,
    savings: 400,
    perMonthReference: 108,
    highlight: "Best value — ₹400 off",
    recommended: true,
    inclusions: [
      "24 printed editions delivered to your address",
      "12 pages of news, knowledge and activities in every edition",
      "Puzzles, quizzes and brain teasers in each issue",
      "Entry to reader competitions and the Creativity Corner",
      "Reader submissions considered for the Reader Corner",
      "A full year of themed monthly editions",
    ],
  },
];

export const planById = (id: string) => plans.find((p) => p.id === id);

export const formatINR = (amount: number) =>
  "₹" + amount.toLocaleString("en-IN");
