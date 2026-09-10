"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { KidsChronLogoLink } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/primitives";
import { primaryNav, site } from "@/content";

export function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close everything on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes; clicking outside closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-white focus:font-semibold"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-soft" : ""
        }`}
      >
        {/* Brand strip — carries the motto so it is present on every page */}
        <div className="hidden bg-navy-900 text-navy-100 lg:block">
          <div className="container-kc flex h-9 items-center justify-between text-xs">
            <p className="font-medium tracking-wide">
              <span className="text-sun-300">{site.motto}</span>
              <span className="mx-2.5 text-navy-600" aria-hidden>
                •
              </span>
              {site.supporting}
            </p>
            <div className="flex items-center gap-5">
              <Link href="/search" className="hover:text-white inline-flex items-center gap-1.5">
                <Icon name="search" className="w-3.5 h-3.5" strokeWidth={2} />
                Search
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <nav
          ref={navRef}
          aria-label="Main"
          className="border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85"
        >
          <div className="container-kc flex h-[72px] items-center justify-between gap-4">
            <KidsChronLogoLink height={48} priority />

            {/* ---------- Desktop nav ---------- */}
            <ul className="hidden items-center gap-0.5 xl:flex">
              {primaryNav.map((group) => {
                const active = isActive(group.href);
                if (!group.columns) {
                  return (
                    <li key={group.label}>
                      <Link
                        href={group.href}
                        className={`rounded-full px-3.5 py-2 text-[0.94rem] font-semibold transition-colors ${
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "text-navy-800 hover:bg-navy-50"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {group.label}
                      </Link>
                    </li>
                  );
                }
                const open = openMenu === group.label;
                return (
                  <li key={group.label} className="relative">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu(open ? null : group.label)}
                      onMouseEnter={() => setOpenMenu(group.label)}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.94rem] font-semibold transition-colors ${
                        active || open
                          ? "bg-blue-50 text-blue-700"
                          : "text-navy-800 hover:bg-navy-50"
                      }`}
                    >
                      {group.label}
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden
                        className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {open && (
                      <div
                        onMouseLeave={() => setOpenMenu(null)}
                        className="absolute left-0 top-full z-50 mt-2 w-max min-w-[22rem] animate-pop rounded-xl2 border border-line bg-paper p-2 shadow-lift"
                      >
                        <div className="flex gap-2">
                          {group.columns.map((col) => (
                            <div key={col.heading} className="min-w-[13.5rem] p-3">
                              <p className="mb-2 px-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-mute">
                                {col.heading}
                              </p>
                              <ul>
                                {col.links.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      href={l.href}
                                      className="block rounded-xl px-2.5 py-2 hover:bg-blue-50"
                                    >
                                      <span className="block text-[0.94rem] font-semibold text-navy-900">
                                        {l.label}
                                      </span>
                                      {l.description && (
                                        <span className="block text-[0.8rem] text-ink-mute">
                                          {l.description}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {group.footnote && (
                          <p className="mx-3 mb-1 mt-1 rounded-xl bg-leaf-50 px-3.5 py-2.5 text-[0.8rem] leading-snug text-leaf-800">
                            {group.footnote}
                          </p>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="/search"
                aria-label="Search KidsChron"
                className="hidden h-11 w-11 place-items-center rounded-full text-navy-700 hover:bg-navy-50 xl:grid"
              >
                <Icon name="search" className="w-5 h-5" strokeWidth={2} />
              </Link>
              <ButtonLink href="/subscribe" size="md" className="hidden sm:inline-flex">
                Subscribe Now
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                className="grid h-11 w-11 place-items-center rounded-full text-navy-800 hover:bg-navy-50 xl:hidden"
              >
                <span className="sr-only">
                  {mobileOpen ? "Close menu" : "Open menu"}
                </span>
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  {mobileOpen ? (
                    <path d="M6 6l12 12M18 6 6 18" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-paper xl:hidden"
        >
          <div className="container-kc py-6">
            <ul className="space-y-1">
              {primaryNav.map((group) =>
                group.columns ? (
                  <li key={group.label}>
                    <details className="group rounded-xl2 border border-line">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-lg font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                        {group.label}
                        <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5 text-ink-mute transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </summary>
                      <div className="border-t border-line px-4 py-3">
                        <Link
                          href={group.href}
                          className="mb-2 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4"
                        >
                          All of {group.label}
                        </Link>
                        {group.columns.map((col) => (
                          <div key={col.heading} className="mt-3">
                            <p className="mb-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-mute">
                              {col.heading}
                            </p>
                            <ul className="grid grid-cols-2 gap-1">
                              {col.links.map((l) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    className="block rounded-lg px-2 py-2 text-[0.95rem] font-medium text-navy-800 hover:bg-blue-50"
                                  >
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={group.label}>
                    <Link
                      href={group.href}
                      className="block rounded-xl2 border border-line px-4 py-3.5 text-lg font-semibold text-navy-900"
                    >
                      {group.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-6 grid gap-3">
              <ButtonLink href="/subscribe" size="lg">
                Subscribe Now
              </ButtonLink>
              <ButtonLink href="/search" variant="secondary" size="lg">
                <Icon name="search" className="w-4 h-4" strokeWidth={2} />
                Search KidsChron
              </ButtonLink>
            </div>

            <p className="mt-6 text-center text-sm text-ink-mute">{site.motto}</p>
          </div>
        </div>
      )}
    </>
  );
}
