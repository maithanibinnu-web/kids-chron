"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { didYouKnow } from "@/content";

/**
 * Rotating "Did You Know?" card.
 * Auto-advances, but pauses on hover/focus and stops entirely when the
 * visitor prefers reduced motion — an auto-rotating card that cannot be
 * stopped is an accessibility failure, not a flourish.
 */
export function DidYouKnow() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setI((v) => (v + 1) % didYouKnow.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [paused, next]);

  const item = didYouKnow[i];

  return (
    <div
      className="relative overflow-hidden rounded-xl2 bg-navy-900 p-6 text-navy-100 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <span
        aria-hidden
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sun-400/15 blur-2xl"
      />
      <div className="relative flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-sun-400 text-navy-900">
          <Icon name="bulb" className="h-5 w-5" strokeWidth={2} />
        </span>
        <h3 className="text-lg text-white">Did You Know?</h3>
        <span className="ml-auto rounded-full bg-navy-800 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-sun-300">
          {item.tag}
        </span>
      </div>

      <p
        aria-live="polite"
        className="relative mt-4 min-h-[5.5rem] font-display text-xl leading-snug text-white sm:text-[1.45rem]"
      >
        {item.fact}
      </p>

      <div className="relative mt-5 flex items-center justify-between">
        <ul className="flex gap-1.5">
          {didYouKnow.map((f, idx) => (
            <li key={f.tag + idx}>
              <button
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show fact ${idx + 1} of ${didYouKnow.length}`}
                aria-current={idx === i}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-6 bg-sun-400" : "w-2 bg-navy-600 hover:bg-navy-500"
                }`}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={next}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-sun-300 hover:text-sun-200"
        >
          Another one
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
