import { NextResponse } from "next/server";
import { deliver, makeReference } from "@/lib/notifications";
import * as v from "@/lib/validate";

export const runtime = "nodejs";

/**
 * One route for the simple forms: contact, school enquiry, creative
 * submission and newsletter. Each has its own validation shape but the
 * same honest response contract:
 *
 *   delivered: true  → something actually received it
 *   delivered: false → it was logged on the server only, and the UI
 *                      says so rather than implying someone will read it
 */

type FormKind = "contact" | "school-enquiry" | "submission" | "newsletter";

const KINDS: FormKind[] = ["contact", "school-enquiry", "submission", "newsletter"];

const PREFIX: Record<FormKind, string> = {
  contact: "MSG",
  "school-enquiry": "SCH",
  submission: "SUB",
  newsletter: "NL",
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (v.isBot(body)) {
    return NextResponse.json({ ok: true, reference: makeReference("XX"), delivered: true, message: "Thank you." });
  }

  const errors: v.Errors = {};
  const kind = v.oneOf(errors, "kind", body.kind, KINDS, "form");
  if (v.fail(errors)) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  let data: Record<string, unknown> = {};

  if (kind === "contact") {
    const name = v.maxLen(errors, "name", v.required(errors, "name", body.name, "Name"), 120, "Name");
    const emailAddr = v.email(errors, "email", body.email);
    const phone = v.clean(body.phone).slice(0, 30);
    const topic = v.oneOf(
      errors,
      "topic",
      body.topic,
      ["subscription", "school", "submission", "general"] as const,
      "topic",
    );
    const message = v.maxLen(errors, "message", v.required(errors, "message", body.message, "Message"), 4000, "Message");
    data = { name, email: emailAddr, phone, topic, message };
  }

  if (kind === "school-enquiry") {
    const school = v.maxLen(errors, "school", v.required(errors, "school", body.school, "School or institution name"), 200, "School name");
    const contactName = v.maxLen(errors, "contactName", v.required(errors, "contactName", body.contactName, "Contact name"), 120, "Contact name");
    const role = v.clean(body.role).slice(0, 100);
    const emailAddr = v.email(errors, "email", body.email);
    const phone = v.mobile(errors, "phone", body.phone);
    const city = v.maxLen(errors, "city", v.required(errors, "city", body.city, "City"), 80, "City");
    const copies = v.clean(body.copies).slice(0, 30);
    const classes = v.clean(body.classes).slice(0, 120);
    const message = v.clean(body.message).slice(0, 3000);
    data = { school, contactName, role, email: emailAddr, phone, city, copies, classes, message };
  }

  if (kind === "submission") {
    // Child-safety rules are enforced HERE, not only in the browser.
    const childFirstName = v.maxLen(errors, "childFirstName", v.required(errors, "childFirstName", body.childFirstName, "First name"), 60, "First name");
    const ageOrClass = v.maxLen(errors, "ageOrClass", v.required(errors, "ageOrClass", body.ageOrClass, "Age or class"), 40, "Age or class");
    const school = v.clean(body.school).slice(0, 160);
    const city = v.clean(body.city).slice(0, 80);
    const category = v.oneOf(
      errors,
      "category",
      body.category,
      ["story", "poem", "artwork", "photography", "diy", "idea", "experiment"] as const,
      "category",
    );
    const title = v.maxLen(errors, "title", v.required(errors, "title", body.title, "Title"), 160, "Title");
    const work = v.clean(body.work).slice(0, 12000);
    const competitionSlug = v.clean(body.competitionSlug).slice(0, 80);

    const guardianName = v.maxLen(errors, "guardianName", v.required(errors, "guardianName", body.guardianName, "Parent or guardian name"), 120, "Parent or guardian name");
    const guardianEmail = v.email(errors, "guardianEmail", body.guardianEmail, "Parent or guardian email");
    const guardianPhone = v.clean(body.guardianPhone).slice(0, 30);

    v.mustBeTrue(errors, "consentOriginal", body.consentOriginal, "Please confirm this is the child's own work.");
    v.mustBeTrue(
      errors,
      "consentPublish",
      body.consentPublish,
      "A parent or guardian must consent before we can consider the work for publication.",
    );
    const consentCity = body.consentCity === true;

    data = {
      childFirstName,
      ageOrClass,
      school,
      // Recorded but never published — see the privacy policy.
      city: city || undefined,
      publishCity: consentCity,
      category,
      title,
      work,
      competitionSlug: competitionSlug || undefined,
      guardian: { name: guardianName, email: guardianEmail, phone: guardianPhone },
      consent: { original: true, publish: true, city: consentCity },
      moderation: "pending-review",
    };
  }

  if (kind === "newsletter") {
    const emailAddr = v.email(errors, "email", body.email);
    data = { email: emailAddr, audience: "parent-or-teacher" };
  }

  if (v.fail(errors)) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const reference = makeReference(PREFIX[kind]);
  const result = await deliver({
    kind: kind === "school-enquiry" ? "school-enquiry" : kind === "submission" ? "submission" : kind === "contact" ? "contact" : "newsletter",
    reference,
    receivedAt: new Date().toISOString(),
    data,
  });

  const messages: Record<FormKind, { yes: string; no: string }> = {
    contact: {
      yes: `Your message has reached the KidsChron team. Your reference is ${reference} — quote it if you follow up by phone or email.`,
      no: `Your message was recorded on this server but has not been sent on, because this deployment has no email or webhook configured yet. Please contact us directly on info@kidschron.com or 070859 15643 so nothing is missed.`,
    },
    "school-enquiry": {
      yes: `Your enquiry has reached the KidsChron team. Your reference is ${reference}.`,
      no: `Your enquiry was recorded on this server but has not been sent on, because this deployment has no email or webhook configured yet. Please email info@kidschron.com so the team sees it.`,
    },
    submission: {
      yes: `Thank you. The entry has been sent to the editorial team for review — reference ${reference}. Nothing is published until it has been read and approved.`,
      no: `The entry was recorded on this server but has not been sent on, because this deployment has no email or webhook configured yet. Please email it to info@kidschron.com so the editorial team receives it.`,
    },
    newsletter: {
      yes: `You are on the list. We will email only when there is something worth saying.`,
      no: `Your address was recorded on this server but has not been added to a mailing list, because this deployment has no email service configured yet.`,
    },
  };

  return NextResponse.json({
    ok: true,
    reference,
    delivered: result.delivered,
    channels: result.channels,
    message: result.delivered ? messages[kind].yes : messages[kind].no,
  });
}
