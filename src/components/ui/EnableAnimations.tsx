"use client";

import { useEffect } from "react";

/**
 * Keep server and first-client markup identical, then enable reveal
 * animations once React has hydrated the page.
 */
export function EnableAnimations() {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
  }, []);

  return null;
}
