"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Button, ButtonLink, Chip } from "@/components/ui/primitives";
import {
  CheckboxField,
  FormSection,
  RadioGroup,
  SelectField,
  TextArea,
  TextField,
} from "@/components/forms/fields";
import { PaymentPanel } from "./PaymentPanel";
import { INDIAN_STATES } from "@/lib/india";
import { contact, formatINR, planById, plans } from "@/content";
import { paymentStatementFor } from "@/lib/payments/types";
import type { OrderStatus } from "@/lib/payments/types";

/* ============================================================
   The subscription journey
   Choose Plan → Enter Details → Review → Payment → Confirmation
   ============================================================ */

const STEPS = ["Plan", "Details", "Review", "Payment", "Done"] as const;
type StepIndex = 0 | 1 | 2 | 3 | 4;

type Form = {
  planId: "six-month" | "yearly";
  name: string;
  className: string;
  school: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  mobile: string;
  email: string;
  referredBy: string;
  paymentMethod: string;
  hasPaid: boolean;
  transactionReference: string;
  paymentDate: string;
  declarationConfirmed: boolean;
  signatoryRole: string;
  signedBy: string;
  guardianName: string;
  website: string; // honeypot
};

const EMPTY: Form = {
  planId: "yearly",
  name: "",
  className: "",
  school: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  mobile: "",
  email: "",
  referredBy: "",
  paymentMethod: "upi",
  hasPaid: false,
  transactionReference: "",
  paymentDate: "",
  declarationConfirmed: false,
  signatoryRole: "parent",
  signedBy: "",
  guardianName: "",
  website: "",
};

const DECLARATION =
  "I confirm that the information provided is correct and complete. I understand that the subscription will be processed based on the information provided and that the newspaper will be delivered to the address mentioned above.";

/* ---- client-side validation (the server re-checks everything) ---- */

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RE_MOBILE = /^(?:\+?91[-\s]?|0)?[6-9]\d{9}$/;
const RE_PIN = /^[1-9]\d{5}$/;

function validateDetails(f: Form) {
  const e: Record<string, string> = {};
  if (!f.name.trim()) e.name = "Name is required.";
  if (!f.className.trim()) e.className = "Class is required.";
  if (!f.school.trim()) e.school = "School or institute is required.";
  if (!f.dateOfBirth) e.dateOfBirth = "Date of birth is required.";
  if (!f.gender) e.gender = "Please choose an option.";
  if (!f.address.trim()) e.address = "Address is required.";
  if (!f.city.trim()) e.city = "City is required.";
  if (!f.state) e.state = "State is required.";
  if (!RE_PIN.test(f.pinCode.trim())) e.pinCode = "A PIN code is 6 digits.";
  if (!RE_MOBILE.test(f.mobile.replace(/[\s-]/g, "")))
    e.mobile = "Enter a valid 10-digit Indian mobile number.";
  if (!RE_EMAIL.test(f.email.trim())) e.email = "Enter a valid email address.";
  return e;
}

function validatePayment(f: Form) {
  const e: Record<string, string> = {};
  if (!f.declarationConfirmed)
    e.declarationConfirmed = "Please confirm the declaration to continue.";
  if (!f.signedBy.trim()) e.signedBy = "Please type your name as a digital signature.";
  if (f.hasPaid && !f.transactionReference.trim())
    e.transactionReference =
      "Please enter the transaction or reference number so we can match your payment.";
  return e;
}

/* ============================================================ */

export function CheckoutWizard() {
  const params = useSearchParams();
  const initialPlan = params.get("plan");
  const [step, setStep] = useState<StepIndex>(initialPlan ? 1 : 0);
  const [form, setForm] = useState<Form>({
    ...EMPTY,
    planId:
      initialPlan === "six-month" || initialPlan === "yearly"
        ? initialPlan
        : EMPTY.planId,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [result, setResult] = useState<null | {
    reference: string;
    status: OrderStatus;
    amount: number;
    gateway: { id: string; offline: boolean; redirectUrl: string | null };
    recordKeeping: {
      delivered: boolean;
      durableStore: boolean;
      note?: string;
    };
  }>(null);

  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const goto = (s: StepIndex) => {
    setStep(s);
    // Move focus to the step heading so keyboard and screen-reader
    // users are not stranded at the bottom of the previous step.
    requestAnimationFrame(() => {
      topRef.current?.focus();
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const next = () => {
    if (step === 1) {
      const e = validateDetails(form);
      setErrors(e);
      if (Object.keys(e).length) return;
    }
    goto(Math.min(step + 1, 4) as StepIndex);
  };

  async function submit() {
    const e = validatePayment(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.errors) {
          setErrors(json.errors);
          // Send the visitor back to the step that owns the problem.
          const detailKeys = ["name","className","school","dateOfBirth","gender","address","city","state","pinCode","mobile","email"];
          if (Object.keys(json.errors).some((k) => detailKeys.includes(k))) goto(1);
        } else {
          setServerError(json.error ?? "Something went wrong. Please try again.");
        }
        return;
      }
      if (json.gateway?.redirectUrl) {
        window.location.href = json.gateway.redirectUrl;
        return;
      }
      setResult(json);
      goto(4);
    } catch {
      setServerError(
        "We could not reach the server. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Stepper step={step} onJump={(s) => s < step && goto(s)} />

      <div
        ref={topRef}
        tabIndex={-1}
        className="mt-8 scroll-mt-28 outline-none"
        aria-live="polite"
      >
        {step === 0 && <StepPlan form={form} set={set} onNext={next} />}
        {step === 1 && (
          <StepDetails form={form} set={set} errors={errors} onNext={next} onBack={() => goto(0)} />
        )}
        {step === 2 && (
          <StepReview form={form} onNext={next} onBack={() => goto(1)} onEdit={() => goto(1)} />
        )}
        {step === 3 && (
          <StepPayment
            form={form}
            set={set}
            errors={errors}
            submitting={submitting}
            serverError={serverError}
            onSubmit={submit}
            onBack={() => goto(2)}
          />
        )}
        {step === 4 && result && <StepDone form={form} result={result} />}
      </div>
    </div>
  );
}

/* ---------------- Stepper ---------------- */

function Stepper({ step, onJump }: { step: number; onJump: (s: StepIndex) => void }) {
  return (
    <nav aria-label="Subscription progress">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {STEPS.map((label, i) => {
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <li key={label} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onJump(i as StepIndex)}
                disabled={i >= step}
                aria-current={state === "current" ? "step" : undefined}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 py-2 text-[0.88rem] font-semibold transition-colors ${
                  state === "current"
                    ? "bg-blue-700 text-white"
                    : state === "done"
                      ? "bg-leaf-50 text-leaf-800 hover:bg-leaf-100"
                      : "text-ink-mute"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[0.7rem] ${
                    state === "current"
                      ? "bg-white/20"
                      : state === "done"
                        ? "bg-leaf-600 text-white"
                        : "bg-navy-100 text-navy-600"
                  }`}
                >
                  {state === "done" ? "✓" : i + 1}
                </span>
                {label}
              </button>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="hidden h-px w-5 bg-navy-200 sm:block" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------------- Step 1: plan ---------------- */

function StepPlan({
  form,
  set,
  onNext,
}: {
  form: Form;
  set: <K extends keyof Form>(k: K, v: Form[K]) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl">Choose your plan</h2>
      <p className="mt-2 text-ink-soft">
        Both plans are currently on offer. You can change this before you pay.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {plans.map((p) => {
          const selected = form.planId === p.id;
          return (
            <label
              key={p.id}
              className={`relative cursor-pointer rounded-xl2 border-2 p-6 transition-all ${
                selected
                  ? "border-blue-600 bg-blue-50/50 shadow-lift"
                  : "border-line bg-paper hover:border-navy-300"
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={p.id}
                checked={selected}
                onChange={() => set("planId", p.id)}
                className="sr-only"
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl">{p.name}</h3>
                  <p className="mt-0.5 text-[0.9rem] font-semibold text-blue-700">
                    {p.editions} editions · {p.months} months
                  </p>
                </div>
                <span
                  aria-hidden
                  className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
                    selected ? "border-blue-600 bg-blue-600 text-white" : "border-navy-300"
                  }`}
                >
                  {selected ? "✓" : ""}
                </span>
              </div>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2.5">
                <span className="font-display text-3xl text-navy-900">
                  {formatINR(p.offerPrice)}
                </span>
                <span className="text-ink-mute line-through">
                  {formatINR(p.regularPrice)}
                </span>
              </p>
              <p className="mt-1">
                <Chip className="bg-coral-50 text-coral-700 ring-coral-200">
                  Save {formatINR(p.savings)}
                </Chip>
              </p>
              {p.recommended && (
                <p className="mt-3 text-[0.82rem] font-semibold text-leaf-700">
                  Best value — about {formatINR(p.perMonthReference)} a month
                </p>
              )}
            </label>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Button size="lg" onClick={onNext}>
          Continue to details
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Step 2: details ---------------- */

function StepDetails({
  form,
  set,
  errors,
  onNext,
  onBack,
}: {
  form: Form;
  set: <K extends keyof Form>(k: K, v: Form[K]) => void;
  errors: Record<string, string>;
  onNext: () => void;
  onBack: () => void;
}) {
  const errorCount = Object.keys(errors).length;
  return (
    <div>
      <h2 className="text-2xl">Subscriber and delivery details</h2>
      <p className="mt-2 text-ink-soft">
        This is the online version of the printed subscription form. Fields
        marked <span className="text-coral-600">*</span> are required.
      </p>

      {errorCount > 0 && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-coral-300 bg-coral-50 p-4 text-[0.92rem] text-coral-800"
        >
          <p className="font-semibold">
            {errorCount === 1
              ? "There is one thing to fix:"
              : `There are ${errorCount} things to fix:`}
          </p>
          <ul className="mt-1.5 list-disc pl-5">
            {Object.entries(errors).map(([k, msg]) => (
              <li key={k}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <FormSection
          step="1"
          title="Subscriber details"
          description="The child who will read KidsChron."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Name"
              required
              autoComplete="name"
              value={form.name}
              error={errors.name}
              onChange={(e) => set("name", e.target.value)}
            />
            <TextField
              label="Class"
              required
              placeholder="e.g. Class 5"
              value={form.className}
              error={errors.className}
              onChange={(e) => set("className", e.target.value)}
            />
            <TextField
              label="School / Institute"
              required
              className="sm:col-span-2"
              value={form.school}
              error={errors.school}
              onChange={(e) => set("school", e.target.value)}
            />
            <TextField
              label="Date of birth"
              required
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              value={form.dateOfBirth}
              error={errors.dateOfBirth}
              help="Used to send age-appropriate reading suggestions. Never published."
              onChange={(e) => set("dateOfBirth", e.target.value)}
            />
            <RadioGroup
              label="Gender"
              name="gender"
              required
              value={form.gender}
              error={errors.gender}
              onChange={(v) => set("gender", v)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>
        </FormSection>

        <FormSection
          step="2"
          title="Delivery address"
          description="Where the printed edition should be posted."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextArea
              label="Address"
              required
              rows={3}
              className="sm:col-span-2"
              autoComplete="street-address"
              value={form.address}
              error={errors.address}
              onChange={(e) => set("address", e.target.value)}
            />
            <TextField
              label="City"
              required
              autoComplete="address-level2"
              value={form.city}
              error={errors.city}
              onChange={(e) => set("city", e.target.value)}
            />
            <SelectField
              label="State"
              required
              options={INDIAN_STATES}
              value={form.state}
              error={errors.state}
              onChange={(e) => set("state", e.target.value)}
            />
            <TextField
              label="PIN code"
              required
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
              value={form.pinCode}
              error={errors.pinCode}
              onChange={(e) => set("pinCode", e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </FormSection>

        <FormSection
          step="3"
          title="Contact details"
          description="A parent or guardian's contact, so we can reach you about delivery."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Mobile number"
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.mobile}
              error={errors.mobile}
              onChange={(e) => set("mobile", e.target.value)}
            />
            <TextField
              label="Email ID"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              error={errors.email}
              onChange={(e) => set("email", e.target.value)}
            />
            <TextField
              label="Referral / referred by"
              className="sm:col-span-2"
              value={form.referredBy}
              help="If someone told you about KidsChron, tell us who — it helps us thank them."
              onChange={(e) => set("referredBy", e.target.value)}
            />
          </div>
        </FormSection>
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button variant="secondary" size="lg" onClick={onBack}>
          Back to plans
        </Button>
        <Button size="lg" onClick={onNext}>
          Review your details
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Step 3: review ---------------- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-4">
      <dt className="w-48 shrink-0 text-[0.8rem] font-semibold uppercase tracking-wide text-ink-mute">
        {label}
      </dt>
      <dd className="text-navy-900">{value || "—"}</dd>
    </div>
  );
}

function StepReview({
  form,
  onNext,
  onBack,
  onEdit,
}: {
  form: Form;
  onNext: () => void;
  onBack: () => void;
  onEdit: () => void;
}) {
  const plan = planById(form.planId)!;
  const genderLabel = { male: "Male", female: "Female", other: "Other" }[
    form.gender
  ] ?? "—";

  return (
    <div>
      <h2 className="text-2xl">Check everything is right</h2>
      <p className="mt-2 text-ink-soft">
        The newspaper will be posted to exactly this address, so it is worth a
        second look.
      </p>

      <div className="mt-6 rounded-xl2 border border-line bg-paper p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
          <div>
            <h3 className="text-xl">{plan.name}</h3>
            <p className="text-[0.9rem] text-ink-mute">
              {plan.editions} editions over {plan.months} months
            </p>
          </div>
          <p className="text-right">
            <span className="font-display text-3xl text-navy-900">
              {formatINR(plan.offerPrice)}
            </span>
            <br />
            <span className="text-[0.82rem] text-ink-mute">
              regular {formatINR(plan.regularPrice)} · you save{" "}
              {formatINR(plan.savings)}
            </span>
          </p>
        </div>

        <dl className="divide-y divide-line pt-2">
          <Row label="Subscriber" value={form.name} />
          <Row label="Class" value={form.className} />
          <Row label="School / Institute" value={form.school} />
          <Row label="Date of birth" value={form.dateOfBirth} />
          <Row label="Gender" value={genderLabel} />
          <Row
            label="Delivery address"
            value={[form.address, form.city, form.state, form.pinCode]
              .filter(Boolean)
              .join(", ")}
          />
          <Row label="Mobile" value={form.mobile} />
          <Row label="Email" value={form.email} />
          <Row label="Referred by" value={form.referredBy} />
        </dl>

        <p className="mt-4">
          <button
            type="button"
            onClick={onEdit}
            className="text-[0.92rem] font-semibold text-blue-700 underline underline-offset-4"
          >
            Change any of these details
          </button>
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button variant="secondary" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onNext}>
          Continue to payment
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Step 4: payment + declaration ---------------- */

function StepPayment({
  form,
  set,
  errors,
  submitting,
  serverError,
  onSubmit,
  onBack,
}: {
  form: Form;
  set: <K extends keyof Form>(k: K, v: Form[K]) => void;
  errors: Record<string, string>;
  submitting: boolean;
  serverError: string;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const plan = planById(form.planId)!;
  return (
    <div>
      <h2 className="text-2xl">Payment</h2>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Pay {formatINR(plan.offerPrice)} by UPI, NEFT, IMPS or bank transfer
        using the details below, then tell us the reference so the team can
        match your payment against the bank record.
      </p>

      <div className="mt-6">
        <PaymentPanel amount={plan.offerPrice} />
      </div>

      <div className="mt-4 space-y-4">
        <FormSection
          step="5"
          title="Tell us about your payment"
          description="If you have not paid yet, you can still submit this form — we will send you the details and wait for the payment."
        >
          <div className="space-y-4">
            <RadioGroup
              label="How did you pay (or plan to pay)?"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={(v) => set("paymentMethod", v)}
              options={[
                { value: "upi", label: "UPI" },
                { value: "neft", label: "NEFT" },
                { value: "imps", label: "IMPS" },
                { value: "bank-transfer", label: "Bank transfer" },
              ]}
            />

            <CheckboxField
              label="I have already made the payment"
              checked={form.hasPaid}
              onChange={(v) => set("hasPaid", v)}
            />

            {form.hasPaid && (
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Transaction / reference number"
                  required
                  value={form.transactionReference}
                  error={errors.transactionReference}
                  help="The UTR or UPI reference from your bank's confirmation."
                  onChange={(e) => set("transactionReference", e.target.value)}
                />
                <TextField
                  label="Payment date"
                  type="date"
                  max={new Date().toISOString().slice(0, 10)}
                  value={form.paymentDate}
                  onChange={(e) => set("paymentDate", e.target.value)}
                />
              </div>
            )}

            <p className="rounded-xl bg-sun-50 px-4 py-3 text-[0.88rem] text-sun-900 ring-1 ring-inset ring-sun-200">
              <strong className="font-bold">How this works: </strong>
              entering a reference tells us you have paid — it is not itself a
              confirmation. A person checks each payment against the bank record
              before a subscription is confirmed, and you will hear from us
              either way.
            </p>
          </div>
        </FormSection>

        <FormSection
          step="6"
          title="Declaration"
          description="Because the subscriber may be a child, a parent or guardian can sign on their behalf."
        >
          <div className="space-y-4">
            <blockquote className="rounded-xl border-l-4 border-blue-300 bg-mist px-4 py-3 text-[0.95rem] leading-relaxed text-ink-soft">
              {DECLARATION}
            </blockquote>

            <CheckboxField
              label="I confirm the declaration above."
              checked={form.declarationConfirmed}
              error={errors.declarationConfirmed}
              required
              onChange={(v) => set("declarationConfirmed", v)}
            />

            <RadioGroup
              label="Who is confirming this?"
              name="signatoryRole"
              value={form.signatoryRole}
              onChange={(v) => set("signatoryRole", v)}
              options={[
                { value: "parent", label: "Parent" },
                { value: "guardian", label: "Guardian" },
                { value: "subscriber", label: "Subscriber" },
              ]}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Full name (digital signature)"
                required
                value={form.signedBy}
                error={errors.signedBy}
                help="Typing your name here has the same effect as signing the printed form."
                onChange={(e) => set("signedBy", e.target.value)}
              />
              <TextField
                label="Date"
                value={new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                readOnly
                className="pointer-events-none opacity-80"
                onChange={() => {}}
              />
            </div>
          </div>
        </FormSection>
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website-hp">Leave this field empty</label>
        <input
          id="website-hp"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      {serverError && (
        <p role="alert" className="mt-5 rounded-xl border border-coral-300 bg-coral-50 p-4 text-coral-800">
          {serverError}
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button variant="secondary" size="lg" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button size="lg" onClick={onSubmit} disabled={submitting}>
          {submitting ? "Submitting…" : "Submit subscription"}
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Step 5: confirmation ---------------- */

function StepDone({
  form,
  result,
}: {
  form: Form;
  result: {
    reference: string;
    status: OrderStatus;
    amount: number;
    gateway: { id: string; offline: boolean; redirectUrl: string | null };
    recordKeeping: { delivered: boolean; durableStore: boolean; note?: string };
  };
}) {
  const plan = planById(form.planId)!;
  const statement = paymentStatementFor(result.status);
  const tone = {
    success: "border-leaf-300 bg-leaf-50 text-leaf-900",
    pending: "border-blue-200 bg-blue-50 text-blue-900",
    failed: "border-coral-300 bg-coral-50 text-coral-900",
  }[statement.tone];

  useEffect(() => {
    document.title = `Subscription ${result.reference} | KidsChron`;
  }, [result.reference]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-sun-400 text-navy-900">
          <Icon name="sparkle" className="h-6 w-6" strokeWidth={2} />
        </span>
        <h2 className="text-3xl">Thank You for Choosing KidsChron!</h2>
      </div>

      <div className={`mt-6 rounded-xl2 border p-5 ${tone}`}>
        <p className="font-display text-xl">{statement.headline}</p>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed">{statement.detail}</p>
      </div>

      <div className="mt-6 rounded-xl2 border border-line bg-paper p-6">
        <dl className="divide-y divide-line">
          <Row label="Subscription reference" value={result.reference} />
          <Row label="Plan" value={`${plan.name} — ${plan.editions} editions`} />
          <Row label="Amount" value={formatINR(result.amount)} />
          <Row
            label="Payment status"
            value={
              result.status === "payment_reported"
                ? "Reported by you — awaiting verification"
                : result.status === "created"
                  ? "Not yet paid"
                  : statement.headline
            }
          />
          <Row label="Subscriber" value={form.name} />
          <Row
            label="Delivery to"
            value={[form.address, form.city, form.state, form.pinCode]
              .filter(Boolean)
              .join(", ")}
          />
        </dl>
      </div>

      {/* Honest note about this deployment's record-keeping. */}
      {(!result.recordKeeping.delivered || !result.recordKeeping.durableStore) && (
        <div className="mt-4 rounded-xl2 border border-sun-300 bg-sun-50 p-5 text-[0.92rem] text-sun-900">
          <p className="font-bold">Please also contact us directly</p>
          <p className="mt-1.5 leading-relaxed">
            This deployment has not yet been connected to KidsChron&apos;s inbox
            or subscriber database, so we cannot promise this form reached
            anyone. Please email{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold underline">
              {contact.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${contact.phoneHrefs[0]}`} className="font-semibold underline">
              {contact.phones[0]}
            </a>{" "}
            quoting reference <strong>{result.reference}</strong>, so nothing is
            lost.
          </p>
        </div>
      )}

      {result.gateway.offline && result.status !== "payment_reported" && (
        <div className="mt-6">
          <h3 className="text-xl">Next step: make the payment</h3>
          <p className="mt-1.5 text-ink-soft">
            Pay {formatINR(result.amount)} using the details below, then email
            the transaction reference to {contact.email} quoting{" "}
            {result.reference}.
          </p>
          <div className="mt-4">
            <PaymentPanel amount={result.amount} />
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl2 bg-navy-900 p-6 text-navy-100">
        <h3 className="text-xl text-white">While you wait</h3>
        <p className="mt-1.5 text-navy-200">
          There is plenty to read here already — and puzzles and quizzes that
          need no subscription at all.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/explore" variant="onDark">
            Start exploring
          </ButtonLink>
          <ButtonLink href="/play" variant="sun">
            Challenge your brain
          </ButtonLink>
        </div>
      </div>

      <p className="mt-6 text-[0.92rem] text-ink-mute">
        Questions about your subscription? Call{" "}
        <a href={`tel:${contact.phoneHrefs[0]}`} className="font-semibold text-blue-700 underline">
          {contact.phones[0]}
        </a>{" "}
        or{" "}
        <a href={`tel:${contact.phoneHrefs[1]}`} className="font-semibold text-blue-700 underline">
          {contact.phones[1]}
        </a>
        , email{" "}
        <a href={`mailto:${contact.email}`} className="font-semibold text-blue-700 underline">
          {contact.email}
        </a>
        , or read the{" "}
        <Link href="/faq" className="font-semibold text-blue-700 underline">
          frequently asked questions
        </Link>
        .
      </p>
    </div>
  );
}
