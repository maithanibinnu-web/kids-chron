import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search KidsChron",
  description:
    "Search articles, quizzes, puzzles, competitions and editions across KidsChron, with filters for subject, content type and reading age.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
