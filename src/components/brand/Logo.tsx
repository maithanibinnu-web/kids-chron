import Image from "next/image";
import Link from "next/link";
import { site } from "@/content";

/**
 * BRAND ASSETS
 * ------------------------------------------------------------------
 * The two supplied logo files are the authoritative marks. They are
 * never recoloured, stretched, cropped or re-typeset — only scaled,
 * and always with their aspect ratio locked.
 *
 * Files:
 *   /public/brand/kidschron-logo.png   (supplied mark)
 *   /public/brand/prakritik-logo.png   (supplied mark, background removed)
 *   /public/brand/*-raw.png            (untouched originals, kept for reference)
 *
 * Placement rule: header, footer, subscription section and the
 * organisation section only. Not in every section.
 */

const KC_RATIO = 253 / 247; // width / height of the supplied file

export function KidsChronLogo({
  height = 52,
  className = "",
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round(height * KC_RATIO);
  return (
    <Image
      src="/brand/kidschron-logo.png"
      alt={`${site.name} — ${site.tagline}`}
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto ${className}`}
      style={{ height, width }}
    />
  );
}

export function KidsChronLogoLink({
  height = 52,
  className = "",
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center rounded-xl ${className}`}
      aria-label={`${site.name} home`}
    >
      <KidsChronLogo height={height} priority={priority} />
    </Link>
  );
}

/**
 * The Prakritik India mark has navy lettering, so on dark surfaces it
 * sits on a white disc rather than being recoloured.
 */
export function PrakritikLogo({
  size = 64,
  onDark = false,
  className = "",
}: {
  size?: number;
  onDark?: boolean;
  className?: string;
}) {
  const img = (
    <Image
      src="/brand/prakritik-logo.png"
      alt={site.legalEntity}
      width={size}
      height={size}
      className="h-auto w-auto"
      style={{ width: size, height: size }}
    />
  );
  if (!onDark) return <span className={className}>{img}</span>;
  return (
    <span
      className={`inline-grid place-items-center rounded-full bg-white ${className}`}
      style={{ padding: Math.round(size * 0.06) }}
    >
      {img}
    </span>
  );
}

/** "An initiative of …" lock-up used in the footer and About page. */
export function BackedBy({
  onDark = false,
  size = 56,
  className = "",
}: {
  onDark?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <PrakritikLogo size={size} onDark={onDark} />
      <div className="text-sm leading-snug">
        <p className={onDark ? "text-navy-200" : "text-ink-mute"}>
          An initiative of
        </p>
        <p
          className={`font-semibold ${onDark ? "text-white" : "text-navy-900"}`}
        >
          {site.legalEntity}
        </p>
        <p className={`text-xs ${onDark ? "text-navy-300" : "text-ink-mute"}`}>
          {site.philosophy.join(" | ")}
        </p>
      </div>
    </div>
  );
}
