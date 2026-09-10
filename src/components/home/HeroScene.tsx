import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/content";

/**
 * HERO VISUAL
 * The metaphor: one newspaper opens the door to a world of knowledge.
 * An open broadsheet sits at the centre; a globe rises out of the fold
 * and subjects orbit around it on floating chips.
 *
 * Built from SVG + DOM so the orbiting chips can carry real icons and
 * real labels — a screen reader gets a sentence, not a decorative blob.
 */

const orbit: { icon: IconName; label: string; className: string; tint: string; delay: string }[] = [
  { icon: "rocket", label: "Space", className: "left-[2%] top-[12%]", tint: "text-blue-700 bg-blue-50 ring-blue-200", delay: "0s" },
  { icon: "paw", label: "Wildlife", className: "right-[1%] top-[6%]", tint: "text-leaf-700 bg-leaf-50 ring-leaf-200", delay: "1.1s" },
  { icon: "atom", label: "Science", className: "left-[-2%] top-[52%]", tint: "text-coral-600 bg-coral-50 ring-coral-200", delay: "2.2s" },
  { icon: "palette", label: "Create", className: "right-[-1%] top-[44%]", tint: "text-sun-800 bg-sun-50 ring-sun-200", delay: "0.6s" },
  { icon: "puzzle", label: "Puzzles", className: "right-[12%] bottom-[2%]", tint: "text-blue-700 bg-blue-50 ring-blue-200", delay: "1.7s" },
  { icon: "leaf", label: "Environment", className: "left-[8%] bottom-[0%]", tint: "text-leaf-700 bg-leaf-50 ring-leaf-200", delay: "2.8s" },
];

export function HeroScene() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem] select-none">
      {/* Soft background blobs */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
      >
        <div className="absolute left-[10%] top-[6%] h-56 w-56 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute right-[6%] top-[30%] h-48 w-48 rounded-full bg-leaf-200/50 blur-3xl" />
        <div className="absolute bottom-[4%] left-[24%] h-44 w-44 rounded-full bg-sun-200/60 blur-3xl" />
      </div>

      {/* The newspaper + globe */}
      <svg
        viewBox="0 0 560 460"
        className="w-full drop-shadow-[0_24px_48px_rgba(18,50,79,0.18)]"
        role="img"
        aria-label="An open newspaper with a globe rising out of it, surrounded by symbols of science, wildlife, space, art and puzzles"
      >
        <defs>
          <linearGradient id="paperL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f4f7fb" />
          </linearGradient>
          <linearGradient id="paperR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eef3f8" />
          </linearGradient>
          <linearGradient id="oceanG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#578ee2" />
            <stop offset="100%" stopColor="#1d4189" />
          </linearGradient>
          <radialGradient id="halo" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fbb914" stopOpacity=".45" />
            <stop offset="100%" stopColor="#fbb914" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Halo behind the globe */}
        <circle cx="280" cy="176" r="150" fill="url(#halo)" />

        {/* Globe — sits low enough that the newspaper overlaps its
            base, so it reads as rising out of the open fold. */}
        <g className="motion-safe:animate-float-slow" style={{ transformOrigin: "280px 176px" }}>
          <circle cx="280" cy="176" r="104" fill="url(#oceanG)" />
          <g fill="#6e9e28">
            <path d="M204 142c22-19 48-10 55 10s-10 36-31 34-41-24-24-44Z" />
            <path d="M304 212c24-14 48 0 50 19s-19 34-38 25-29-33-12-44Z" />
            <path d="M318 118c19-6 34 6 31 20s-23 19-34 8-11-25 3-28Z" />
            <path d="M226 236c14-7 29 2 29 14s-14 19-25 12-13-21-4-26Z" />
          </g>
          <circle cx="280" cy="176" r="104" fill="none" stroke="#12324f" strokeWidth="4.5" />
          <ellipse cx="280" cy="176" rx="48" ry="104" fill="none" stroke="#12324f" strokeWidth="2.5" opacity=".35" />
          <path d="M176 176h208" stroke="#12324f" strokeWidth="2.5" opacity=".35" />
          <path d="M194 128h172M194 224h172" stroke="#12324f" strokeWidth="2" opacity=".2" />
          <path d="M224 108c16-19 40-28 60-28" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity=".4" fill="none" />
        </g>

        {/* Newspaper — left page. The top edge rises to meet the globe
            so the two forms interlock instead of merely stacking. */}
        <g>
          <path d="M34 292c66-30 148-24 246 22v130c-98-46-180-52-246-22V292Z" fill="url(#paperL)" stroke="#cbdaea" strokeWidth="2.5" />
          <g stroke="#b8cbe0" strokeLinecap="round">
            <path d="M68 334c52-12 100 0 148 20" strokeWidth="7" opacity=".9" />
            <path d="M68 358c52-12 100 0 148 20" strokeWidth="6" opacity=".6" />
            <path d="M68 382c38-9 74 0 108 14" strokeWidth="6" opacity=".38" />
          </g>
          {/* pencil resting across the page */}
          <g transform="translate(74 396) rotate(6)">
            <rect x="0" y="0" width="92" height="11" rx="5.5" fill="#fbb914" />
            <path d="M92 0l17 5.5L92 11Z" fill="#12324f" />
            <rect x="0" y="0" width="13" height="11" rx="5.5" fill="#d0201f" />
          </g>
        </g>

        {/* Newspaper — right page (mirror) */}
        <g>
          <path d="M526 292c-66-30-148-24-246 22v130c98-46 180-52 246-22V292Z" fill="url(#paperR)" stroke="#cbdaea" strokeWidth="2.5" />
          {/* masthead block — the KidsChron red and blue, abstracted */}
          <rect x="338" y="334" width="146" height="15" rx="7.5" fill="#1d4189" opacity=".9" />
          <rect x="338" y="358" width="94" height="11" rx="5.5" fill="#d0201f" opacity=".85" />
          <g stroke="#b8cbe0" strokeLinecap="round">
            <path d="M340 386c46-14 92-18 140-12" strokeWidth="6" opacity=".5" />
            <path d="M340 408c42-13 84-17 128-11" strokeWidth="6" opacity=".35" />
          </g>
          <rect x="338" y="392" width="88" height="30" rx="7" fill="#fff0c2" />
        </g>

        {/* Fold */}
        <path d="M280 314v130" stroke="#bccfe2" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Orbiting subject chips */}
      <ul className="pointer-events-none absolute inset-0">
        {orbit.map((o) => (
          <li
            key={o.label}
            className={`absolute ${o.className} motion-safe:animate-float`}
            style={{ animationDelay: o.delay }}
          >
            <span
              className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8rem] font-bold shadow-soft ring-1 ring-inset backdrop-blur ${o.tint}`}
            >
              <Icon name={o.icon} className="h-4 w-4" strokeWidth={2} />
              {o.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
