import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutWizard } from "@/components/subscribe/CheckoutWizard";
import { Breadcrumb, Container } from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Subscribe — subscription form",
  description:
    "Complete your KidsChron subscription: subscriber details, delivery address, contact, plan, payment and declaration.",
  alternates: { canonical: "/subscribe/checkout" },
  robots: { index: false, follow: true },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Subscription", href: "/subscribe" },
  { label: "Subscription form" },
];

export default function CheckoutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="border-b border-line bg-mist">
        <Container className="py-8">
          <Breadcrumb items={crumbs} />
          <h1 className="mt-4 text-3xl sm:text-4xl">Subscription form</h1>
          <p className="mt-2 max-w-2xl text-ink-soft">
            The online version of the KidsChron subscription form. Your details
            are used to deliver the newspaper and to contact you about the
            subscription — nothing else.
          </p>
        </Container>
      </div>

      <Container className="max-w-3xl py-10 sm:py-14">
        <Suspense
          fallback={
            <p className="text-ink-mute">Loading the subscription form…</p>
          }
        >
          <CheckoutWizard />
        </Suspense>
      </Container>
    </>
  );
}
