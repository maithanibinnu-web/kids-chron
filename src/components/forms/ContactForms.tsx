"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/primitives";
import { FormSection, SelectField, TextArea, TextField } from "./fields";
import { contact } from "@/content";

type State = "idle" | "sending" | "sent" | "logged";

function Result({
  state,
  message,
  reference,
}: {
  state: "sent" | "logged";
  message: string;
  reference: string;
}) {
  const good = state === "sent";
  return (
    <div
      role="status"
      className={`rounded-xl2 border p-7 ${
        good ? "border-leaf-200 bg-leaf-50" : "border-sun-300 bg-sun-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-full text-white ${
            good ? "bg-leaf-600" : "bg-sun-500"
          }`}
        >
          <Icon name={good ? "sparkle" : "shield"} className="h-5 w-5" />
        </span>
        <h2 className={`text-xl ${good ? "text-leaf-900" : "text-sun-900"}`}>
          {good ? "Message received" : "Please also contact us directly"}
        </h2>
      </div>
      <p className={`mt-4 leading-relaxed ${good ? "text-leaf-900" : "text-sun-900"}`}>
        {message}
      </p>
      <p className={`mt-3 text-[0.9rem] ${good ? "text-leaf-800" : "text-sun-800"}`}>
        Reference: <strong className="font-bold">{reference}</strong>
      </p>
    </div>
  );
}

/* ============================================================
   Contact form
   ============================================================ */

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "general",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      const n = { ...e };
      delete n[k as string];
      return n;
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const local: Record<string, string> = {};
    if (!form.name.trim()) local.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      local.email = "Please enter a valid email address.";
    if (!form.message.trim()) local.message = "Please write your message.";
    setErrors(local);
    if (Object.keys(local).length) return;

    setState("sending");
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind: "contact", ...form }),
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
  }

  if (state === "sent" || state === "logged") {
    return <Result state={state} message={message} reference={reference} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <FormSection title="Send us a message">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Your name"
            required
            autoComplete="name"
            value={form.name}
            error={errors.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <TextField
            label="Email address"
            required
            type="email"
            autoComplete="email"
            value={form.email}
            error={errors.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <TextField
            label="Phone number"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          <SelectField
            label="What is this about?"
            placeholder="Choose a topic"
            options={[
              { value: "subscription", label: "Subscription or delivery" },
              { value: "school", label: "Schools and institutions" },
              { value: "submission", label: "A child's submission or a competition" },
              { value: "general", label: "Something else" },
            ]}
            value={form.topic}
            onChange={(e) => set("topic", e.target.value)}
          />
          <TextArea
            label="Message"
            required
            className="sm:col-span-2"
            rows={6}
            value={form.message}
            error={errors.message}
            help="If it is about a subscription, include your subscription reference if you have one."
            onChange={(e) => set("message", e.target.value)}
          />
        </div>
      </FormSection>

      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-hp">Leave empty</label>
        <input id="c-hp" tabIndex={-1} value={form.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p className="text-[0.88rem] text-ink-mute">
          Or call{" "}
          <a href={`tel:${contact.phoneHrefs[0]}`} className="font-semibold text-blue-700 underline">
            {contact.phones[0]}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/* ============================================================
   School / institution enquiry
   ============================================================ */

export function SchoolEnquiryForm() {
  const [form, setForm] = useState({
    school: "",
    contactName: "",
    role: "",
    email: "",
    phone: "",
    city: "",
    copies: "",
    classes: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      const n = { ...e };
      delete n[k as string];
      return n;
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const local: Record<string, string> = {};
    if (!form.school.trim()) local.school = "Please give the school or institution name.";
    if (!form.contactName.trim()) local.contactName = "Please give a contact name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      local.email = "Please enter a valid email address.";
    if (!/^(?:\+?91[-\s]?|0)?[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      local.phone = "Please enter a valid 10-digit Indian mobile number.";
    if (!form.city.trim()) local.city = "Please give the city.";
    setErrors(local);
    if (Object.keys(local).length) return;

    setState("sending");
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind: "school-enquiry", ...form }),
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
  }

  if (state === "sent" || state === "logged") {
    return <Result state={state} message={message} reference={reference} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <FormSection
        title="Institutional enquiry"
        description="Tell us roughly what you need and the team will come back to you with the arrangements."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="School / institution"
            required
            className="sm:col-span-2"
            value={form.school}
            error={errors.school}
            onChange={(e) => set("school", e.target.value)}
          />
          <TextField
            label="Your name"
            required
            value={form.contactName}
            error={errors.contactName}
            onChange={(e) => set("contactName", e.target.value)}
          />
          <TextField
            label="Your role"
            placeholder="e.g. Librarian, Class teacher"
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
          />
          <TextField
            label="Email address"
            required
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <TextField
            label="Phone number"
            required
            type="tel"
            value={form.phone}
            error={errors.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          <TextField
            label="City"
            required
            value={form.city}
            error={errors.city}
            onChange={(e) => set("city", e.target.value)}
          />
          <TextField
            label="Roughly how many copies?"
            placeholder="e.g. 40, or not sure yet"
            value={form.copies}
            onChange={(e) => set("copies", e.target.value)}
          />
          <TextField
            label="Which classes or year groups?"
            className="sm:col-span-2"
            placeholder="e.g. Classes 4 to 7"
            value={form.classes}
            onChange={(e) => set("classes", e.target.value)}
          />
          <TextArea
            label="Anything else?"
            className="sm:col-span-2"
            rows={5}
            value={form.message}
            help="Competitions, workshops, reading periods, library copies — tell us what you have in mind."
            onChange={(e) => set("message", e.target.value)}
          />
        </div>
      </FormSection>

      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="s-hp">Leave empty</label>
        <input id="s-hp" tabIndex={-1} value={form.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="mt-6">
        <Button type="submit" size="lg" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
