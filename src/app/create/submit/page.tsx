import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SubmissionForm } from "@/components/forms/SubmissionForm";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Submit your creation",
  description:
    "Send a story, poem, drawing, photograph, DIY project or experiment to KidsChron. A parent or guardian's consent is required and every entry is reviewed before publication.",
  alternates: { canonical: "/create/submit" },
  robots: { index: true, follow: true },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Creativity Corner", href: "/create" },
  { label: "Submit your creation" },
];

export default function SubmitPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        tone="coral"
        kicker="Show Your Creativity"
        title="Send us what you made"
        lead="A parent or guardian fills in part of this form with you. Nothing is published without their consent, and every entry is read by a person first."
      />
      <Container className="max-w-3xl py-10 sm:py-14">
        <SubmissionForm />
      </Container>
    </>
  );
}
