import Link from "next/link";
import type { ReactNode } from "react";

/* ============================================================
   Layout primitives
   ============================================================ */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-kc ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "cream",
  id,
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "paper" | "mist" | "navy" | "leaf" | "sun" | "blue";
  id?: string;
  as?: "section" | "div";
  labelledBy?: string;
}) {
  const tones = {
    cream: "bg-cream text-ink",
    paper: "bg-paper text-ink",
    mist: "bg-mist text-ink",
    navy: "bg-navy-900 text-navy-50",
    leaf: "bg-leaf-50 text-ink",
    sun: "bg-sun-50 text-ink",
    blue: "bg-blue-50 text-ink",
  } as const;
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   Section heading
   ============================================================ */

export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  id,
  invert = false,
  className = "",
}: {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  id?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <header
      className={`${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"} ${className}`}
    >
      {kicker ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.16em] ${
            invert ? "text-sun-300" : "text-blue-700"
          }`}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-3xl sm:text-4xl lg:text-[2.6rem] ${invert ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            invert ? "text-navy-100" : "text-ink-soft"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}

/* ============================================================
   Button
   ============================================================ */

type ButtonVariant = "primary" | "secondary" | "ghost" | "sun" | "onDark" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 shadow-soft",
  secondary:
    "bg-white text-navy-800 ring-1 ring-inset ring-navy-200 hover:bg-navy-50 hover:ring-navy-300",
  ghost: "text-blue-700 hover:bg-blue-50",
  sun: "bg-sun-400 text-navy-900 hover:bg-sun-300 active:bg-sun-500 shadow-soft",
  onDark: "bg-white text-navy-900 hover:bg-navy-50",
  danger: "bg-coral-500 text-white hover:bg-coral-600",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-[0.95rem] px-5 py-2.5 gap-2",
  lg: "text-base px-7 py-3.5 gap-2.5",
};

const base =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 " +
  "disabled:opacity-50 disabled:cursor-not-allowed select-none " +
  "motion-safe:hover:-translate-y-0.5 min-h-11";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      type={type}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* ============================================================
   Chips, badges and labels
   ============================================================ */

export function Chip({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "div";
}) {
  return (
    <Tag
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Marks demonstration content. Used everywhere sample editorial
 *  appears so nothing invented can be mistaken for official. */
export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <Chip
      className={`bg-navy-50 text-navy-600 ring-navy-200 ${className}`}
    >
      <span
        aria-hidden
        className="w-1.5 h-1.5 rounded-full bg-navy-400"
      />
      Sample content
    </Chip>
  );
}

/** Used wherever KidsChron has not yet confirmed a fact. */
export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2.5 rounded-xl bg-sun-50 px-4 py-3 text-sm text-sun-900 ring-1 ring-inset ring-sun-200">
      <span aria-hidden className="mt-0.5 shrink-0 font-bold">
        ⌛
      </span>
      <span>{children}</span>
    </p>
  );
}

/* ============================================================
   Card shell
   ============================================================ */

export function Card({
  children,
  className = "",
  interactive = false,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={`relative overflow-hidden rounded-card bg-paper ring-1 ring-line ${
        interactive
          ? "shadow-soft transition-all duration-300 hover:shadow-lift motion-safe:hover:-translate-y-1 focus-within:shadow-lift"
          : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   Breadcrumb (also emits BreadcrumbList structured data)
   ============================================================ */

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-mute">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden className="text-navy-200">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-blue-700 hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-navy-800 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ============================================================
   Accordion — native <details>, so it works without JavaScript
   ============================================================ */

export function Accordion({
  items,
  className = "",
}: {
  items: { q: string; a: ReactNode }[];
  className?: string;
}) {
  return (
    <div className={`divide-y divide-line rounded-card bg-paper ring-1 ring-line ${className}`}>
      {items.map((item) => (
        <details key={item.q} className="group px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              aria-hidden
              className="mt-0.5 shrink-0 grid place-items-center w-7 h-7 rounded-full bg-blue-50 text-blue-700 transition-transform duration-200 group-open:rotate-45"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="pb-5 pr-10 text-ink-soft leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ============================================================
   Prose divider used between editorial blocks
   ============================================================ */

/**
 * Highlighter stroke behind a headline word.
 * Drawn as a positioned bar in `em` units rather than a background
 * gradient, because an inline background box is sized by the font's
 * ascent and descent — which puts the stroke under the descenders
 * instead of through the letters. This version straddles the baseline
 * at any font size.
 */
export function Highlight({
  children,
  tone = "sun",
}: {
  children: ReactNode;
  tone?: "sun" | "leaf" | "coral";
}) {
  const bar = {
    sun: "bg-sun-300",
    leaf: "bg-leaf-200",
    coral: "bg-coral-200",
  }[tone];
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span
        aria-hidden
        className={`absolute -inset-x-[0.06em] bottom-[0.14em] h-[0.22em] rounded-[0.06em] ${bar}`}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-px w-full bg-gradient-to-r from-transparent via-line to-transparent ${className}`}
    />
  );
}
