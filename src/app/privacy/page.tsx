import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, PendingNote, Section } from "@/components/ui/primitives";
import { contact, site } from "@/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How KidsChron handles personal information, including the extra care taken with children's data, consent for submissions, and what is published.",
  alternates: { canonical: "/privacy" },
};

const crumbs = [{ label: "Home", href: "/" }, { label: "Privacy Policy" }];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        kicker="Privacy"
        title="Privacy policy"
        lead="Written to be read, not to be skipped. The part about children is the part that matters most, and it is near the top rather than buried."
      />

      <Section tone="cream">
        <Container className="max-w-3xl">
          <div className="rounded-xl2 border border-sun-300 bg-sun-50 p-5 text-[0.94rem] text-sun-900">
            <p className="font-bold">Please read this before publishing</p>
            <p className="mt-1.5 leading-relaxed">
              This policy describes what the website is built to do. It has not
              been reviewed by a lawyer and it is not a substitute for legal
              advice. Before KidsChron goes live, this page should be checked
              against India&apos;s Digital Personal Data Protection Act 2023 —
              which has specific requirements about processing children&apos;s
              data and verifiable parental consent — and against any other law
              that applies to you.
            </p>
          </div>

          <div className="prose-kc mt-10">
            <p>
              This policy explains what information {site.name}, an initiative of{" "}
              {site.legalEntity}, collects through this website, why, and what
              happens to it.
            </p>

            <h2 id="children">Children</h2>
            <p>
              KidsChron is made for children, so we design around a simple rule:
              collect as little as possible about a child, and never publish
              enough to identify one.
            </p>
            <ul>
              <li>
                <strong>We ask children for a first name only.</strong> There is
                no field for a surname anywhere on the submission form.
              </li>
              <li>
                <strong>A parent or guardian must submit and consent.</strong>{" "}
                Nothing a child creates can be sent to us without a grown-up
                giving their name, email address and explicit consent.
              </li>
              <li>
                <strong>Nothing is published automatically.</strong> Every
                submission is read by the editorial team, and we contact the
                parent or guardian before anything appears in print or online.
              </li>
              <li>
                <strong>What we publish alongside selected work:</strong> a
                first name and a class or age. A town or city only if the parent
                has separately agreed. Never a full name, school and locality
                together, and never contact details.
              </li>
              <li>
                <strong>No accounts, no profiles, no messaging.</strong> There
                is nothing here for a child to sign up to, and no way for one
                child to contact another.
              </li>
              <li>
                <strong>The newsletter is for grown-ups.</strong> We ask parents
                and teachers to sign up, not children.
              </li>
              <li>
                <strong>Withdrawing consent.</strong> A parent or guardian can
                ask us at any time to remove a child&apos;s work and any details
                we hold about them. Email{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </li>
            </ul>

            <h2>What we collect, and why</h2>
            <h3>Subscriptions</h3>
            <p>
              To deliver a printed newspaper we need the subscriber&apos;s name,
              class, school, date of birth and gender; a delivery address; and a
              contact mobile number and email address. Date of birth is used to
              judge reading level and is never published. We also record the
              payment method, amount and the transaction reference you give us,
              so a person can match your payment against the bank record.
            </p>
            <h3>Creative submissions and competitions</h3>
            <p>
              A child&apos;s first name, age or class, the work itself, and the
              parent or guardian&apos;s name, email and consent. School and city
              are optional; school is never published.
            </p>
            <h3>Enquiries</h3>
            <p>
              Whatever you type into the contact or school enquiry form, so we
              can reply.
            </p>
            <h3>Newsletter</h3>
            <p>An email address. Nothing else.</p>

            <h2>What we do not do</h2>
            <ul>
              <li>We do not sell or rent personal information to anyone.</li>
              <li>
                We do not use advertising trackers or third-party analytics that
                profile visitors.
              </li>
              <li>
                We do not ask children for contact details, addresses or photos
                of themselves.
              </li>
              <li>
                We do not create public profiles for children or show one
                child&apos;s details to another.
              </li>
            </ul>

            <h2>Cookies and local storage</h2>
            <p>
              This website sets no advertising or tracking cookies. If you use
              the &ldquo;save for later&rdquo; button on an article, that list is
              kept in your own browser using local storage — it never reaches
              us, and clearing your browser data removes it. Quiz answers and
              scores are not stored anywhere at all.
            </p>

            <h2>Who else sees your information</h2>
            <p>
              Your details are handled by the KidsChron team. Practically, some
              information also passes through the services that run this
              website — a hosting provider, and, once configured, an email
              service and a payment gateway. We ask those providers to process
              information only on our instructions.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Subscription records are kept for as long as needed to run and
              account for the subscription. Enquiries are kept while they are
              being dealt with. Submissions that are not selected are not kept
              indefinitely. If you want something removed sooner, ask us.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask what we hold about you or your child, ask us to
              correct it, or ask us to delete it. Email{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{" "}
              <a href={`tel:${contact.phoneHrefs[0]}`}>{contact.phones[0]}</a>.
            </p>

            <h2>What we deliberately do not claim</h2>
            <p>
              We do not describe this website as &ldquo;100% safe&rdquo;, and we
              do not claim compliance with COPPA, GDPR, the DPDP Act or any
              other regime. Those are claims that need legal review and audited
              implementation behind them, and we would rather describe exactly
              what we do than make a badge-shaped promise.
            </p>

            <h2>Contact</h2>
            <p>
              {site.legalEntityFull}
              <br />
              {contact.locationLabel}, India
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={`tel:${contact.phoneHrefs[0]}`}>{contact.phones[0]}</a> ·{" "}
              <a href={`tel:${contact.phoneHrefs[1]}`}>{contact.phones[1]}</a>
            </p>
          </div>

          <div className="mt-10">
            <PendingNote>
              A named data protection contact, a formal grievance officer and a
              last-updated date should be added here before launch. We have left
              them blank rather than inventing them.
            </PendingNote>
          </div>

          <p className="mt-8 text-[0.92rem] text-ink-mute">
            See also our{" "}
            <Link href="/terms" className="font-semibold text-blue-700 underline">
              terms and conditions
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
