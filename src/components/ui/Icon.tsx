import type { IconName } from "@/content";

/**
 * Icon set — hand-drawn, single-stroke, deliberately friendly but not
 * cartoonish. Inline SVG so there is no icon-font request and no
 * layout shift, and every icon inherits `currentColor`.
 *
 * Icons are decorative by default (`aria-hidden`). Pass a `title` only
 * when the icon is the sole carrier of meaning.
 */

const paths: Record<IconName, React.ReactNode> = {
  atom: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(120 12 12)" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-8 5.5-14 16-14 0 9.5-5.5 14.5-16 14Z" />
      <path d="M4 20c3.5-4.5 7-7.5 11-9.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 5h11l-1.6 3.2L16 11.5H5" />
    </>
  ),
  /* Environment: a leaf held inside the planet. Reads cleanly at
     20px, where a three-arrow recycling mark turns to mush. */
  recycle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.8 16.2c-.4-4.4 2.4-7.4 8.4-8 .2 5-2.8 8-8.4 8Z" />
      <path d="M7.8 16.2c1.5-2.1 3.1-3.6 4.9-4.5" />
    </>
  ),
  scroll: (
    <>
      <path d="M6 4h11a2 2 0 0 1 2 2v13a1.5 1.5 0 0 1-1.5 1.5H7" />
      <path d="M6 4a2 2 0 0 0-2 2v1.5h4V6a2 2 0 0 0-2-2Z" />
      <path d="M19 19a1.5 1.5 0 0 1-1.5 1.5" />
      <path d="M9 9.5h7M9 13h7M9 16.5h4" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.5V7a3 3 0 0 0 3 3M17 5.5h2.5V7a3 3 0 0 1-3 3" />
      <path d="M12 14v3.5M8.5 21h7l-.8-3.5H9.3L8.5 21Z" />
    </>
  ),
  chip: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5.2a3 3 0 0 0-5.6 1.1A3 3 0 0 0 4.5 11a3 3 0 0 0 1.4 3.9A3 3 0 0 0 12 18.8Z" />
      <path d="M12 5.2a3 3 0 0 1 5.6 1.1A3 3 0 0 1 19.5 11a3 3 0 0 1-1.4 3.9A3 3 0 0 1 12 18.8Z" />
      <path d="M12 5.2v13.6" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.5c3.2 2.3 5 5.7 5 9.4l-2.4 3.4H9.4L7 11.9c0-3.7 1.8-7.1 5-9.4Z" />
      <circle cx="12" cy="10" r="1.8" />
      <path d="M9.4 15.3 7 17.6l.6 3.4 2.6-1.8M14.6 15.3l2.4 2.3-.6 3.4-2.6-1.8" />
    </>
  ),
  paw: (
    <>
      <ellipse cx="7.4" cy="9.4" rx="2" ry="2.5" />
      <ellipse cx="12" cy="7.6" rx="2" ry="2.6" />
      <ellipse cx="16.6" cy="9.4" rx="2" ry="2.5" />
      <path d="M12 12.2c3 0 5.2 2 5.2 4.2 0 1.9-1.6 3-3.4 2.6-1.2-.3-2.4-.3-3.6 0-1.8.4-3.4-.7-3.4-2.6 0-2.2 2.2-4.2 5.2-4.2Z" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.2c5 0 8.8 3.4 8.8 7.6 0 2.6-2 3.7-3.7 3.7h-1.6c-1.3 0-2.2.9-2.2 2 0 .5.2.9.4 1.3.3.5.5.9.5 1.4 0 1-.8 1.6-2.2 1.6C6.7 20.8 3.2 17 3.2 12S7.1 3.2 12 3.2Z" />
      <circle cx="8" cy="9.5" r="1.1" />
      <circle cx="12" cy="7.4" r="1.1" />
      <circle cx="16" cy="9.5" r="1.1" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.2C4 4.5 4.6 4 5.3 4H11v15.5H5.3c-.7 0-1.3-.5-1.3-1.2V5.2Z" />
      <path d="M20 5.2c0-.7-.6-1.2-1.3-1.2H13v15.5h5.7c.7 0 1.3-.5 1.3-1.2V5.2Z" />
      <path d="M11 19.5h2" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 17.5a6 6 0 1 1 6 0v1.2H9v-1.2Z" />
      <path d="M9.8 21h4.4" />
      <path d="M12 8.5v5" />
    </>
  ),
  heart: (
    <path d="M12 20.2S3.8 15.4 3.8 9.9A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 8.2 2.5c0 5.5-8.2 10.3-8.2 10.3Z" />
  ),
  puzzle: (
    <path d="M9.4 3.5h5.2v2a1.8 1.8 0 1 0 3.5 0v-2h1.4c.3 0 .5.2.5.5v4.4h-2a1.8 1.8 0 1 0 0 3.6h2v7.4c0 .3-.2.5-.5.5h-5.9v-2.3a1.8 1.8 0 1 0-3.6 0v2.3H4.5c-.3 0-.5-.2-.5-.5V12h2a1.8 1.8 0 1 0 0-3.6H4V4c0-.3.2-.5.5-.5h4.9Z" />
  ),
  quiz: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .9-1 1.6v.4" />
      <circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-4.2L16.2 4.6a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19 4 20Z" />
      <path d="M14.8 6l3.2 3.2" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 8.5h3.2L8.2 6h7.6l1.5 2.5h3.2v10H3.5v-10Z" />
      <circle cx="12" cy="13.2" r="3.2" />
    </>
  ),
  hands: (
    <>
      <path d="M12 21c-3.4-2.4-6-4.4-6-7.4V8.6a1.4 1.4 0 0 1 2.8 0v3" />
      <path d="M12 21c3.4-2.4 6-4.4 6-7.4V8.6a1.4 1.4 0 0 0-2.8 0v3" />
      <path d="M12 3.2v8" />
      <path d="M9.4 5.6 12 3.2l2.6 2.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 4.8 6v6.2c0 4.1 3 7.2 7.2 8.6 4.2-1.4 7.2-4.5 7.2-8.6V6L12 3.2Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5c.8 3.7 1.8 4.7 5.5 5.5-3.7.8-4.7 1.8-5.5 5.5-.8-3.7-1.8-4.7-5.5-5.5 3.7-.8 4.7-1.8 5.5-5.5Z" />
      <path d="M17.6 15c.4 1.9.9 2.4 2.9 2.8-2 .4-2.5.9-2.9 2.8-.4-1.9-.9-2.4-2.9-2.8 2-.4 2.5-.9 2.9-2.8Z" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.4 15.4 4.6 4.6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.4 8.6-1.9 4.9-4.9 1.9 1.9-4.9 4.9-1.9Z" />
    </>
  ),
};

export function Icon({
  name,
  className = "w-6 h-6",
  strokeWidth = 1.6,
  title,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
