"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Share and save.
 *
 * "Save" is a per-viewer bookmark held in this browser's localStorage.
 * It is not an account, nothing is sent anywhere, and — because this is
 * a children's site — that limitation is stated rather than hidden.
 * Every storage access is wrapped: private windows and blocked site
 * data must not break the page.
 */
const KEY = "kidschron:saved";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function ShareRow({ title, slug }: { title: string; slug: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(slug));
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, [slug]);

  function toggleSave() {
    const list = readSaved();
    const next = list.includes(slug)
      ? list.filter((s) => s !== slug)
      : [...list, slug];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(next.includes(slug));
    } catch {
      // Storage unavailable — reflect the click without pretending it stuck.
      setSaved((v) => !v);
    }
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (canShare) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* the visitor cancelled — fall through to copying */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-mute">
        Share or save
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={share}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-[0.88rem] font-semibold text-navy-800 hover:border-blue-400 hover:bg-blue-50"
        >
          <Icon name="hands" className="h-4 w-4" strokeWidth={2} />
          {copied ? "Link copied" : canShare ? "Share" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={toggleSave}
          aria-pressed={saved}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-[0.88rem] font-semibold ${
            saved
              ? "border-sun-400 bg-sun-100 text-sun-900"
              : "border-navy-200 text-navy-800 hover:border-sun-400 hover:bg-sun-50"
          }`}
        >
          <Icon name="sparkle" className="h-4 w-4" strokeWidth={2} />
          {saved ? "Saved" : "Save for later"}
        </button>
      </div>
      <p className="mt-2.5 text-[0.78rem] leading-snug text-ink-mute">
        Saving keeps this article in a list on this device only. Nothing is sent
        to us and no account is needed.
      </p>
    </div>
  );
}
