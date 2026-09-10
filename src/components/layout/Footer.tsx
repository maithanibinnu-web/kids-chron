import Link from "next/link";
import { KidsChronLogo, BackedBy } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { contact, footerNav, site, socials } from "@/content";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      {/* Newsletter band */}
      <div className="border-b border-navy-800">
        <div className="container-kc grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl text-white sm:text-3xl">
              Stay Curious. Stay Connected.
            </h2>
            <p className="mt-2.5 text-navy-200">
              An occasional email for parents and teachers: what is in the next
              edition, competitions that are opening, and activities to try at
              home. No more than one a month, and you can unsubscribe any time.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-kc py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr]">
          {/* Brand column */}
          <div>
            <div className="inline-block rounded-2xl bg-white p-3">
              <KidsChronLogo height={72} />
            </div>
            <p className="mt-5 font-display text-xl text-white">
              {site.tagline}
            </p>
            <p className="mt-1 text-sun-300 font-semibold tracking-wide">
              {site.motto}
            </p>

            <div className="mt-7">
              <BackedBy onDark size={56} />
            </div>

            <address className="mt-7 not-italic text-sm leading-relaxed text-navy-200">
              <p className="font-semibold text-white">Contact</p>
              <p className="mt-1.5 flex flex-wrap gap-x-2">
                {contact.phones.map((p, i) => (
                  <span key={p}>
                    <a
                      href={`tel:${contact.phoneHrefs[i]}`}
                      className="hover:text-white hover:underline underline-offset-4"
                    >
                      {p}
                    </a>
                    {i === 0 ? <span aria-hidden className="ml-2 text-navy-600">|</span> : null}
                  </span>
                ))}
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white hover:underline underline-offset-4"
                >
                  {contact.email}
                </a>
              </p>
              <p>
                <a
                  href={contact.websiteHref}
                  className="hover:text-white hover:underline underline-offset-4"
                >
                  {contact.website}
                </a>
              </p>
              <p className="mt-1">{contact.locationLabel}</p>
            </address>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-sun-300">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="text-navy-200 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Social — no invented handles */}
        <div className="mt-12 border-t border-navy-800 pt-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="text-sm font-semibold text-white">Follow KidsChron</span>
            <ul className="flex flex-wrap gap-2">
              {socials.map((s) =>
                s.href ? (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      className="rounded-full bg-navy-800 px-3.5 py-1.5 text-sm text-navy-100 hover:bg-navy-700 hover:text-white"
                    >
                      {s.name}
                    </a>
                  </li>
                ) : (
                  <li key={s.name}>
                    <span
                      className="rounded-full bg-navy-800/60 px-3.5 py-1.5 text-sm text-navy-400"
                      title="Official account to be announced"
                    >
                      {s.name}
                    </span>
                  </li>
                ),
              )}
            </ul>
            <span className="text-xs text-navy-400">
              Official accounts will be linked here once announced.
            </span>
          </div>
        </div>

        {/* Closing brand phrase */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-navy-800 pt-8 sm:flex-row sm:items-center">
          <p className="font-display text-xl text-sun-300">{site.closing}</p>
          <div className="flex items-center gap-2 text-sm text-navy-300">
            <Icon name="leaf" className="w-4 h-4 text-leaf-400" />
            {site.philosophy.join(" | ")}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalEntity}. All rights reserved.
          </p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-navy-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-navy-100">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
