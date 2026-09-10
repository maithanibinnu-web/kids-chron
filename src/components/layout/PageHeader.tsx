import type { ReactNode } from "react";
import { Breadcrumb, Container } from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

/**
 * Standard page masthead. Every interior page uses this, so the site
 * has one consistent "you are here" pattern and one place where
 * breadcrumb structured data is emitted.
 */
export function PageHeader({
  crumbs,
  kicker,
  title,
  lead,
  tone = "blue",
  aside,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  kicker?: string;
  title: string;
  lead?: ReactNode;
  tone?: "blue" | "leaf" | "sun" | "coral" | "mist";
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const tones = {
    blue: "from-blue-50 to-cream",
    leaf: "from-leaf-50 to-cream",
    sun: "from-sun-50 to-cream",
    coral: "from-coral-50 to-cream",
    mist: "from-mist to-cream",
  } as const;

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className={`border-b border-line bg-gradient-to-b ${tones[tone]}`}>
        <Container className="py-9 sm:py-12">
          <Breadcrumb items={crumbs} />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_auto] lg:items-end">
            <div>
              {kicker && (
                <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                  {kicker}
                </p>
              )}
              <h1 className="text-4xl sm:text-[2.9rem]">{title}</h1>
              {lead && (
                <div className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                  {lead}
                </div>
              )}
            </div>
            {aside}
          </div>
          {children}
        </Container>
      </section>
    </>
  );
}
