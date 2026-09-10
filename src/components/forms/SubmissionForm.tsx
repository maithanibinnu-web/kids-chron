"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button, ButtonLink } from "@/components/ui/primitives";
import {
  CheckboxField,
  FormSection,
  SelectField,
  TextArea,
  TextField,
} from "./fields";
import { SUBMISSION_CATEGORY_LABELS, competitions, contact } from "@/content";

/**
 * CREATIVE SUBMISSION FORM
 * ------------------------------------------------------------------
 * This form is where a children's website is most likely to do harm,
 * so the safety rules are part of the design rather than a policy page:
 *
 *  - First name only. There is no field for a surname anywhere.
 *  - School and city are optional, and publishing the city needs its
 *    own separate opt-in. School is never published.
 *  - A parent or guardian's name, email and explicit consent are
 *    required before anything can be submitted.
 *  - The form says plainly that nothing is published automatically.
 *  - No child is ever asked for their own contact details.
 */

const CATEGORY_OPTIONS = Object.entries(SUBMISSION_CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label }),
);

type State = "idle" | "sending" | "sent" | "logged";

export function SubmissionForm({
  defaultCompetition,
}: {
  defaultCompetition?: string;
}) {
  const [form, setForm] = useState({
    childFirstName: "",
    ageOrClass: "",
    school: "",
    city: "",
    category: "",
    title: "",
    work: "",
    competitionSlug: defaultCompetition ?? "",
    guardianName: "",
    guardianEmail: "",
    guardianPhone: "",
    consentOriginal: false,
    consentPublish: false,
    consentCity: false,
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!e[k as string]) return e;
      const n = { ...e };
      delete n[k as string];
      return n;
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const local: Record<string, string> = {};
    if (!form.childFirstName.trim()) local.childFirstName = "First name is required.";
    if (!form.ageOrClass.trim()) local.ageOrClass = "Age or class is required.";
    if (!form.category) local.category = "Please choose what kind of work this is.";
    if (!form.title.trim()) local.title = "Please give the work a title.";
    if (!form.guardianName.trim()) local.guardianName = "A parent or guardian's name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.guardianEmail.trim()))
      local.guardianEmail = "Please enter a valid email address for the parent or guardian.";
    if (!form.consentOriginal) local.consentOriginal = "Please confirm this is the child's own work.";
    if (!form.consentPublish)
      local.consentPublish = "A parent or guardian must consent before we can consider the work.";
    setErrors(local);
    if (Object.keys(local).length) return;

    setState("sending");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "submission", ...form }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? {});
        setState("idle");
        return;
      }
      setReference(json.reference);
      setMessage(json.message);
      setState(json.delivered ? "sent" : "logged");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setState("idle");
      setErrors({ form: "We could not reach the server. Please try again." });
    }
  }

  if (state === "sent" || state === "logged") {
    return (
      <div className="rounded-xl2 border border-leaf-200 bg-leaf-50 p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-leaf-600 text-white">
            <Icon name="sparkle" className="h-6 w-6" />
          </span>
          <h2 className="text-2xl text-leaf-900">Thank you!</h2>
        </div>
        <p className="mt-4 leading-relaxed text-leaf-900">{message}</p>
        <p className="mt-3 text-[0.92rem] text-leaf-800">
          Reference: <strong className="font-bold">{reference}</strong>
        </p>
        <div className="mt-6 rounded-xl bg-paper p-5 text-[0.92rem] text-ink-soft ring-1 ring-inset ring-leaf-200">
          <p className="font-semibold text-navy-900">What happens next</p>
          <ul className="mt-2 space-y-1.5">
            <li>The editorial team reads every entry.</li>
            <li>Nothing is published automatically.</li>
            <li>
              If the work is selected, we contact the parent or guardian on the
              email given before it appears anywhere.
            </li>
            <li>
              Only a first name and a class or age is ever published alongside
              the work.
            </li>
          </ul>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href="/reader-corner" variant="secondary">
            See the Reader Corner
          </ButtonLink>
          <ButtonLink href="/create">Back to the Creativity Corner</ButtonLink>
        </div>
      </div>
    );
  }

  const openCompetitions = competitions.filter((c) => c.status === "open");

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Consent-first framing, before anything is typed */}
      <div className="rounded-xl2 border-2 border-blue-200 bg-blue-50 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-700 text-white">
            <Icon name="shield" className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-lg text-blue-900">
              A grown-up needs to be here for this bit
            </h2>
            <p className="mt-1.5 text-[0.94rem] leading-relaxed text-blue-900">
              This form asks for a parent or guardian&apos;s name, email and
              consent. We ask for a child&apos;s <strong>first name only</strong>,
              and we never publish a full name, a school and a town together.
              Read how we handle this in our{" "}
              <Link href="/privacy#children" className="font-semibold underline">
                child safety and privacy notes
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {errors.form && (
        <p role="alert" className="mt-5 rounded-xl border border-coral-300 bg-coral-50 p-4 text-coral-800">
          {errors.form}
        </p>
      )}

      <div className="mt-5 space-y-4">
        <FormSection
          step="1"
          title="About the young creator"
          description="First name only, please — that is all we need and all we would ever publish."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="First name"
              required
              value={form.childFirstName}
              error={errors.childFirstName}
              help="Just the first name. Please do not enter a surname."
              onChange={(e) => set("childFirstName", e.target.value)}
            />
            <TextField
              label="Age or class"
              required
              placeholder="e.g. Class 5, or 10 years"
              value={form.ageOrClass}
              error={errors.ageOrClass}
              onChange={(e) => set("ageOrClass", e.target.value)}
            />
            <TextField
              label="School"
              value={form.school}
              help="Optional, and never published. It only helps us if a school is running the competition."
              onChange={(e) => set("school", e.target.value)}
            />
            <TextField
              label="City or town"
              value={form.city}
              help="Optional. Published only if you tick the box below."
              onChange={(e) => set("city", e.target.value)}
            />
          </div>
        </FormSection>

        <FormSection step="2" title="The work" description="Tell us what you have made.">
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="What kind of work is it?"
                required
                options={CATEGORY_OPTIONS}
                value={form.category}
                error={errors.category}
                onChange={(e) => set("category", e.target.value)}
              />
              <TextField
                label="Title"
                required
                value={form.title}
                error={errors.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>

            <TextArea
              label="Write it here, or describe it"
              rows={8}
              value={form.work}
              help="For a story or poem, type it in. For artwork, a photo or a DIY project, describe it — we will reply to the parent or guardian's email to ask for the picture, so no image is uploaded from this page."
              onChange={(e) => set("work", e.target.value)}
            />

            {openCompetitions.length > 0 && (
              <SelectField
                label="Is this an entry to a competition?"
                placeholder="No — just sharing it"
                options={openCompetitions.map((c) => ({
                  value: c.slug,
                  label: c.title,
                }))}
                value={form.competitionSlug}
                onChange={(e) => set("competitionSlug", e.target.value)}
              />
            )}
          </div>
        </FormSection>

        <FormSection
          step="3"
          title="Parent or guardian"
          description="We contact you — not the child — about anything to do with this entry."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Parent or guardian's full name"
              required
              value={form.guardianName}
              error={errors.guardianName}
              onChange={(e) => set("guardianName", e.target.value)}
            />
            <TextField
              label="Parent or guardian's email"
              required
              type="email"
              value={form.guardianEmail}
              error={errors.guardianEmail}
              onChange={(e) => set("guardianEmail", e.target.value)}
            />
            <TextField
              label="Phone number"
              type="tel"
              className="sm:col-span-2"
              value={form.guardianPhone}
              help="Optional — only used if we cannot reach you by email."
              onChange={(e) => set("guardianPhone", e.target.value)}
            />
          </div>
        </FormSection>

        <FormSection
          step="4"
          title="Consent"
          description="Nothing is published without these."
        >
          <div className="space-y-3">
            <CheckboxField
              label="I confirm this is the child's own original work."
              required
              checked={form.consentOriginal}
              error={errors.consentOriginal}
              onChange={(v) => set("consentOriginal", v)}
            />
            <CheckboxField
              label={
                <>
                  As the parent or guardian, I consent to KidsChron considering
                  this work for publication in the newspaper and on this
                  website, shown with the child&apos;s{" "}
                  <strong>first name and class or age only</strong>. I
                  understand that I will be contacted before anything is
                  published, and that I can withdraw consent at any time.
                </>
              }
              required
              checked={form.consentPublish}
              error={errors.consentPublish}
              onChange={(v) => set("consentPublish", v)}
            />
            <CheckboxField
              label="You may also show the city or town alongside the work."
              checked={form.consentCity}
              onChange={(v) => set("consentCity", v)}
            />
          </div>
        </FormSection>
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="sub-hp">Leave this field empty</label>
        <input
          id="sub-hp"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Submit for review"}
        </Button>
        <p className="text-[0.88rem] text-ink-mute">
          Prefer email? Send it to{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold text-blue-700 underline">
            {contact.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
