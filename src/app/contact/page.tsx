import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForms";
import { BackedBy } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { contact, site } from "@/content";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Contact KidsChron: phone 070859 15643 or 07248284001, email info@kidschron.com. Prakritik India Initiatives Pvt. Ltd., Dehradun, Uttarakhand.",
  alternates: { canonical: "/contact" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Contact Us" }];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="Contact"
        title="Talk to the KidsChron team"
        lead="Subscriptions, deliveries, school enquiries, a child's submission, or anything else — a person reads and answers."
      />

      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            {/* Details */}
            <div>
              <SectionHeading kicker="Reach us" title="Directly" />

              <ul className="mt-8 space-y-3">
                {contact.phones.map((p, i) => (
                  <li key={p}>
                    <a
                      href={`tel:${contact.phoneHrefs[i]}`}
                      className="flex items-center gap-4 rounded-card border border-line bg-paper p-5 transition-all hover:border-blue-300 hover:shadow-soft"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                        <Icon name="hands" className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[0.78rem] font-bold uppercase tracking-wide text-ink-mute">
                          Call
                        </span>
                        <span className="text-lg font-semibold text-navy-900">{p}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 rounded-card border border-line bg-paper p-5 transition-all hover:border-blue-300 hover:shadow-soft"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-leaf-50 text-leaf-700">
                      <Icon name="pen" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[0.78rem] font-bold uppercase tracking-wide text-ink-mute">
                        Email
                      </span>
                      <span className="text-lg font-semibold text-navy-900">
                        {contact.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={contact.websiteHref}
                    className="flex items-center gap-4 rounded-card border border-line bg-paper p-5 transition-all hover:border-blue-300 hover:shadow-soft"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sun-50 text-sun-800">
                      <Icon name="globe" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[0.78rem] font-bold uppercase tracking-wide text-ink-mute">
                        Website
                      </span>
                      <span className="text-lg font-semibold text-navy-900">
                        {contact.website}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-4 rounded-card border border-line bg-paper p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-coral-50 text-coral-600">
                      <Icon name="compass" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[0.78rem] font-bold uppercase tracking-wide text-ink-mute">
                        Where we are
                      </span>
                      <span className="text-lg font-semibold text-navy-900">
                        {contact.locationLabel}
                      </span>
                    </span>
                  </div>
                </li>
              </ul>

              <address className="mt-8 not-italic rounded-xl2 border border-line bg-paper p-6">
                <p className="text-[0.78rem] font-bold uppercase tracking-wide text-ink-mute">
                  Registered organisation
                </p>
                <p className="mt-1.5 font-semibold text-navy-900">
                  {site.legalEntityFull}
                </p>
                <p className="mt-0.5 text-ink-soft">
                  {contact.city}, {contact.state}, {contact.country}
                </p>
                <div className="mt-5 border-t border-line pt-5">
                  <BackedBy size={48} />
                </div>
              </address>
            </div>

            {/* Form */}
            <div>
              <SectionHeading kicker="Or write to us" title="Send a message" />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
