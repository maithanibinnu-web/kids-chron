import type { ArtKey } from "@/content";

/**
 * Illustrated cover art.
 * ------------------------------------------------------------------
 * Twelve hand-built SVG scenes stand in for photography. This is a
 * deliberate design decision, not a placeholder: generic stock imagery
 * is exactly the "corporate" look the brand must avoid, and inline SVG
 * costs no network request, never shifts layout, and scales perfectly
 * on any screen.
 *
 * When real editorial photography exists, `Artwork.imageUrl` takes
 * precedence and this becomes the fallback.
 */

type SceneProps = { className?: string };

const V = "0 0 400 250";

const Sky = ({ from, to }: { from: string; to: string }) => (
  <>
    <defs>
      <linearGradient id={`g-${from}-${to}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
    <rect width="400" height="250" fill={`url(#g-${from}-${to})`} />
  </>
);

const scenes: Record<ArtKey, (p: SceneProps) => React.ReactElement> = {
  space: () => (
    <>
      <Sky from="#17305f" to="#2c5c87" />
      <g fill="#fff" opacity=".85">
        {[
          [38, 44, 1.6], [92, 28, 1.1], [150, 58, 1.4], [214, 30, 1], [268, 52, 1.5],
          [330, 36, 1.2], [366, 74, 1.6], [64, 96, 1], [292, 100, 1.2], [122, 112, 1],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
      <circle cx="300" cy="86" r="42" fill="#fbb914" opacity=".18" />
      <circle cx="300" cy="86" r="30" fill="#ffe28a" />
      <circle cx="290" cy="78" r="6" fill="#e59d05" opacity=".45" />
      <circle cx="308" cy="96" r="4" fill="#e59d05" opacity=".35" />
      <path d="M0 250V184c60-26 122-26 200 4s142 34 200 8v54Z" fill="#0c2338" />
      <g transform="translate(120 130) rotate(-18)">
        <path d="M0 0c14 8 22 22 22 38l-8 12H-14l-8-12C-22 22-14 8 0 0Z" fill="#f4f7fb" />
        <circle cx="0" cy="20" r="7" fill="#2f6fd6" />
        <path d="M-14 50l-9 8 3 12 10-6M14 50l9 8-3 12-10-6" fill="#d0201f" />
      </g>
    </>
  ),
  /* A hornbill on a branch — the Western Ghats bird, and a clean,
     unmistakable silhouette at card size. */
  wildlife: () => (
    <>
      <Sky from="#e3f1d3" to="#c8e3a9" />
      <circle cx="318" cy="60" r="36" fill="#fbb914" opacity=".55" />
      <path d="M0 250v-64c48-26 88-24 136 2s100 30 156 2 108-18 108-18v78Z" fill="#84b845" opacity=".45" />
      <path d="M0 250v-40c60-22 106-8 160 2s112 8 160-14 80-6 80-6v58Z" fill="#578020" />
      {/* branch */}
      <path d="M28 176c74 22 148 24 224 6" stroke="#44631d" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M132 186c-10 16-24 24-40 26M196 190c8 14 20 20 34 21" stroke="#44631d" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M92 212c-14 2-24-6-24-16 12-4 22 4 24 16Z" fill="#6e9e28" />
      <path d="M230 211c14 4 24-3 25-13-12-5-23 2-25 13Z" fill="#6e9e28" />
      {/* hornbill */}
      <g transform="translate(150 92)">
        <path d="M18 84c-26 0-44-18-44-40 0-24 18-40 42-40 8 0 16 2 22 6l14 8c-6 6-8 14-6 22 4 18-6 44-28 44Z" fill="#12324f" />
        <path d="M-18 60c-20 6-34 16-40 28 20 4 40-6 52-20Z" fill="#163a58" />
        <path d="M38 10c14-4 34-2 44 6-10 10-30 14-44 8Z" fill="#fbb914" />
        <path d="M40 4c12-6 30-6 40 0-4 6-14 8-24 8Z" fill="#e59d05" />
        <circle cx="20" cy="14" r="4.5" fill="#fdfaf4" />
        <circle cx="21" cy="14" r="2.2" fill="#0c2338" />
      </g>
    </>
  ),
  /* Autumn: the colours that were hiding under the green. */
  leaves: () => (
    <>
      <Sky from="#fff9e8" to="#ffe28a" />
      <circle cx="92" cy="66" r="34" fill="#fbb914" opacity=".5" />
      <path d="M300 250c-30-60-30-118 8-176" stroke="#7f440d" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M312 128c-26-10-46-6-62 10M306 176c-28-6-50 2-64 20" stroke="#7f440d" strokeWidth="7" strokeLinecap="round" fill="none" />
      {[
        [244, 128, "#e59d05", -22],
        [232, 190, "#d0201f", 14],
        [286, 96, "#84b845", -48],
        [150, 96, "#fbb914", 28],
        [96, 168, "#e45a55", -12],
        [186, 214, "#e59d05", 40],
        [58, 108, "#84b845", 62],
        [130, 236, "#d0201f", -34],
      ].map(([x, y, fill, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d="M0 0c18-14 38-10 44 4-8 14-30 18-44-4Z" fill={fill as string} />
          <path d="M0 0c14-2 28 0 40 4" stroke="#7f440d" strokeWidth="2" opacity=".45" fill="none" />
        </g>
      ))}
    </>
  ),
  ocean: () => (
    <>
      <Sky from="#d9e6fa" to="#b9d1f5" />
      <circle cx="330" cy="56" r="26" fill="#fbb914" opacity=".7" />
      <path d="M0 132c40-16 66 12 106 0s66-24 106-10 60 20 100 4 88 0 88 0v124H0Z" fill="#2f6fd6" opacity=".35" />
      <path d="M0 162c48-18 76 14 122 2s72-22 118-8 76 14 160-8v102H0Z" fill="#2459b6" opacity=".7" />
      <path d="M0 198c56-16 94 12 146 2s84-16 132-4 84 8 122-8v62H0Z" fill="#17305f" />
      <g stroke="#eef4fd" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".8">
        <path d="M42 148c8-6 16-6 24 0" />
        <path d="M250 140c8-6 16-6 24 0" />
        <path d="M150 176c8-6 16-6 24 0" />
      </g>
      <path d="M300 214c14-10 30-10 38 0-8 10-24 10-38 0Z" fill="#fdfaf4" opacity=".6" />
    </>
  ),
  forest: () => (
    <>
      <Sky from="#f2f8ea" to="#e3f1d3" />
      <circle cx="76" cy="58" r="30" fill="#ffe28a" opacity=".8" />
      <g opacity=".35">
        <path d="M-20 250 60 96l80 154Z" fill="#578020" />
        <path d="M110 250 200 78l90 172Z" fill="#44631d" />
        <path d="M250 250 330 110l90 140Z" fill="#578020" />
      </g>
      <g>
        <path d="M20 250 78 130l58 120Z" fill="#2a4718" />
        <path d="M150 250 214 118l64 132Z" fill="#354d1c" />
        <path d="M280 250 340 140l60 110Z" fill="#2a4718" />
      </g>
      <path d="M0 250v-24c60 6 96-14 148-8s96 18 148 6 104-14 104-14v40Z" fill="#12324f" opacity=".18" />
      <path d="M118 78c22 4 34 20 32 44-24 2-40-14-32-44Z" fill="#84b845" />
    </>
  ),
  lab: () => (
    <>
      <Sky from="#eef4fd" to="#d9e6fa" />
      <rect x="0" y="196" width="400" height="54" fill="#1a3872" opacity=".12" />
      <g transform="translate(120 60)">
        <path d="M24 0v46L2 106c-4 11 4 22 16 22h44c12 0 20-11 16-22L56 46V0Z" fill="#fff" stroke="#17305f" strokeWidth="3" />
        <path d="M10 90h60c4 12-2 22-14 22H24c-12 0-18-10-14-22Z" fill="#6e9e28" />
        <path d="M18 0h44" stroke="#17305f" strokeWidth="5" strokeLinecap="round" />
        <circle cx="30" cy="102" r="4" fill="#fdfaf4" opacity=".8" />
        <circle cx="48" cy="110" r="3" fill="#fdfaf4" opacity=".8" />
      </g>
      <g transform="translate(236 88)">
        <rect x="0" y="24" width="46" height="86" rx="8" fill="#fff" stroke="#17305f" strokeWidth="3" />
        <rect x="6" y="70" width="34" height="36" rx="4" fill="#d0201f" opacity=".75" />
        <rect x="10" y="0" width="26" height="26" rx="6" fill="#fbb914" />
      </g>
      <g stroke="#2f6fd6" strokeWidth="3" fill="none" opacity=".6">
        <circle cx="318" cy="52" r="14" />
        <path d="M328 62 344 78" strokeLinecap="round" />
      </g>
    </>
  ),
  circuit: () => (
    <>
      <Sky from="#0c2338" to="#17305f" />
      <g stroke="#84b845" strokeWidth="2.5" fill="none" opacity=".7">
        <path d="M20 60h60v40h70V60h80M40 200h80v-46h90v46h70M330 60v56h40" />
      </g>
      <g fill="#6e9e28">
        {[[80, 100], [150, 60], [230, 60], [120, 200], [210, 154], [300, 200], [370, 116]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" />
        ))}
      </g>
      <rect x="150" y="96" width="100" height="72" rx="12" fill="#2459b6" />
      <rect x="170" y="116" width="60" height="32" rx="6" fill="#8bb3ee" />
      <g stroke="#fbb914" strokeWidth="3" strokeLinecap="round">
        <path d="M150 112h-16M150 132h-16M150 152h-16M250 112h16M250 132h16M250 152h16" />
      </g>
    </>
  ),
  monument: () => (
    <>
      <Sky from="#fff0c2" to="#ffe28a" />
      <circle cx="326" cy="60" r="30" fill="#fbb914" opacity=".5" />
      <path d="M0 250v-40h400v40Z" fill="#9a5607" opacity=".25" />
      <g fill="#fdfaf4" stroke="#7f440d" strokeWidth="2.5">
        <path d="M132 210V132c0-38 30-64 68-64s68 26 68 64v78Z" />
        <path d="M164 210v-52a36 36 0 0 1 72 0v52" fill="#fff0c2" />
        <path d="M200 68V44" strokeLinecap="round" />
        <circle cx="200" cy="38" r="7" fill="#fbb914" />
        <rect x="112" y="208" width="176" height="16" rx="4" />
      </g>
      <g fill="#fdfaf4" stroke="#7f440d" strokeWidth="2.5">
        <rect x="82" y="150" width="20" height="74" rx="8" />
        <rect x="298" y="150" width="20" height="74" rx="8" />
        <circle cx="92" cy="144" r="9" />
        <circle cx="308" cy="144" r="9" />
      </g>
    </>
  ),
  stadium: () => (
    <>
      <Sky from="#eef4fd" to="#b9d1f5" />
      <ellipse cx="200" cy="220" rx="230" ry="90" fill="#578020" />
      <ellipse cx="200" cy="220" rx="170" ry="62" fill="none" stroke="#fdfaf4" strokeWidth="3" opacity=".8" />
      <path d="M200 158v124" stroke="#fdfaf4" strokeWidth="3" opacity=".8" />
      <circle cx="200" cy="220" r="26" fill="none" stroke="#fdfaf4" strokeWidth="3" opacity=".8" />
      <path d="M0 168c40-26 96-40 200-40s160 14 200 40v-40H0Z" fill="#1a3872" opacity=".35" />
      <g transform="translate(200 118)">
        <circle r="26" fill="#fdfaf4" stroke="#12324f" strokeWidth="3" />
        <path d="M0-26 10-8l-10 8-10-8Z" fill="#12324f" />
        <path d="M26 0 8 10 0 0l8-10Z" fill="#12324f" />
        <path d="M-26 0-8 10 0 0l-8-10Z" fill="#12324f" />
      </g>
      <path d="M42 44h14l6 22h-26Z" fill="#fbb914" />
      <path d="M344 44h14l6 22h-26Z" fill="#fbb914" />
    </>
  ),
  globe: () => (
    <>
      <Sky from="#eef4fd" to="#d9e6fa" />
      <circle cx="200" cy="122" r="80" fill="#2f6fd6" />
      <path d="M132 84c26 10 44 6 62 18s40 6 56-6" stroke="#8bb3ee" strokeWidth="4" fill="none" />
      <g fill="#6e9e28">
        <path d="M148 96c16-14 34-8 40 6s-6 26-22 24-30-16-18-30Z" />
        <path d="M226 140c18-10 34 0 36 14s-14 24-28 18-22-24-8-32Z" />
        <path d="M236 78c14-4 24 4 22 14s-16 14-24 6-8-18 2-20Z" />
      </g>
      <circle cx="200" cy="122" r="80" fill="none" stroke="#17305f" strokeWidth="4" />
      <ellipse cx="200" cy="122" rx="38" ry="80" fill="none" stroke="#17305f" strokeWidth="2.5" opacity=".5" />
      <path d="M120 122h160" stroke="#17305f" strokeWidth="2.5" opacity=".5" />
      <g stroke="#d0201f" strokeWidth="4" fill="none" strokeLinecap="round">
        <circle cx="316" cy="196" r="22" />
        <path d="M332 212 352 232" />
      </g>
    </>
  ),
  weather: () => (
    <>
      <defs>
        <linearGradient id="wx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2459b6" />
          <stop offset="52%" stopColor="#8bb3ee" />
          <stop offset="100%" stopColor="#fbb914" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#wx)" />
      <circle cx="200" cy="196" r="46" fill="#fff0c2" opacity=".9" />
      <g fill="#fdfaf4" opacity=".92">
        <path d="M60 92c0-14 12-24 26-22 6-14 26-16 36-4 14-4 28 6 28 20 10 2 16 10 14 20H50c-4-8 0-16 10-14Z" />
        <path d="M244 62c0-11 10-19 21-17 5-11 21-13 29-3 11-3 22 5 22 16 8 2 13 8 11 16H236c-3-6 0-13 8-12Z" />
      </g>
      <path d="M0 250v-30c60-20 110-6 168 6s120 12 232-16v40Z" fill="#354d1c" opacity=".35" />
    </>
  ),
  art: () => (
    <>
      <Sky from="#fdfaf4" to="#fff0c2" />
      <g transform="rotate(-8 200 125)">
        <rect x="96" y="52" width="208" height="146" rx="10" fill="#fff" stroke="#12324f" strokeWidth="3" />
        <path d="M116 170c26-40 44-14 62-38s34-42 56-18 30 42 50 56Z" fill="#84b845" />
        <circle cx="150" cy="88" r="16" fill="#fbb914" />
        <path d="M116 170h168" stroke="#12324f" strokeWidth="3" />
      </g>
      <g transform="translate(300 150) rotate(24)">
        <rect x="-6" y="-60" width="12" height="70" rx="3" fill="#e59d05" />
        <path d="M-6 10h12l-2 16c0 6-8 6-8 0Z" fill="#d0201f" />
      </g>
      <circle cx="64" cy="200" r="18" fill="#2f6fd6" opacity=".8" />
      <circle cx="98" cy="216" r="11" fill="#d0201f" opacity=".8" />
    </>
  ),
  harvest: () => (
    <>
      <Sky from="#f2f8ea" to="#fff0c2" />
      <circle cx="80" cy="58" r="28" fill="#fbb914" opacity=".65" />
      <path d="M0 250v-60c58-16 100 6 152-2s104-26 152-10 96 6 96 6v66Z" fill="#84b845" opacity=".45" />
      <path d="M0 250v-36c62-18 106 4 160-4s110-20 160-4 80 4 80 4v40Z" fill="#578020" />
      <g transform="translate(210 96)">
        <rect x="-42" y="30" width="84" height="70" rx="10" fill="#fdfaf4" stroke="#12324f" strokeWidth="3" />
        <path d="M-52 30 0-6l52 36Z" fill="#d0201f" />
        <rect x="-14" y="60" width="28" height="40" rx="5" fill="#2459b6" />
      </g>
      <g stroke="#44631d" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M60 214v-40M60 186c-12-6-16-16-14-26 12 0 20 8 22 18M60 194c12-8 16-18 14-28-12 0-20 8-22 18" />
      </g>
    </>
  ),
};

export function ArtScene({
  art,
  alt,
  className = "",
}: {
  art: ArtKey;
  alt: string;
  className?: string;
}) {
  const Scene = scenes[art] ?? scenes.globe;
  return (
    <svg
      viewBox={V}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={alt}
    >
      <title>{alt}</title>
      <Scene />
    </svg>
  );
}
