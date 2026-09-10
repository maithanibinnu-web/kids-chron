"use client";

import { useState } from "react";
import { Button } from "@/components/ui/primitives";

/**
 * Parent-facing newsletter. Deliberately worded for a grown-up:
 * children are never asked to hand over an email address.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "logged" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "newsletter", email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setState("error");
        setMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setState(json.delivered ? "done" : "logged");
      setMessage(json.message ?? "");
      setEmail("");
    } catch {
      setState("error");
      setMessage("We could not reach the server. Please try again.");
    }
  }

  if (state === "done" || state === "logged") {
    return (
      <div
        role="status"
        className="rounded-xl2 bg-navy-800 p-5 text-navy-100 ring-1 ring-navy-700 lg:w-[26rem]"
      >
        <p className="font-semibold text-white">Thank you.</p>
        <p className="mt-1 text-sm">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="lg:w-[26rem]">
      <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-navy-200">
        Parent or teacher email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-h-12 flex-1 rounded-full border border-navy-700 bg-navy-800 px-5 py-3 text-white placeholder:text-navy-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        />
        <Button type="submit" variant="sun" size="md" disabled={state === "sending"}>
          {state === "sending" ? "Signing up…" : "Sign Up"}
        </Button>
      </div>
      {state === "error" && (
        <p role="alert" className="mt-2 text-sm text-coral-300">
          {message}
        </p>
      )}
      <p className="mt-2.5 text-xs text-navy-400">
        We use this address only to send the KidsChron update. It is never sold
        or shared. This sign-up is for grown-ups — children should ask a parent
        or teacher to sign up on their behalf.
      </p>
    </form>
  );
}
