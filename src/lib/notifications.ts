/**
 * OUTBOUND DELIVERY
 * ------------------------------------------------------------------
 * Every form on the site funnels through here. The point of this
 * module is honesty: the UI must never tell a parent "we have received
 * your message" unless something actually received it.
 *
 * Two integration points, both driven by environment variables:
 *
 *   KIDSCHRON_WEBHOOK_URL  — POSTs the payload as JSON. Point this at
 *                            a CRM, a Google Apps Script, Zapier, or
 *                            your own endpoint.
 *   RESEND_API_KEY +
 *   KIDSCHRON_NOTIFY_EMAIL — sends a notification email via Resend.
 *
 * With neither configured, `deliver()` returns `delivered: false` and
 * the UI says so plainly instead of pretending.
 */

export type DeliveryChannel = "webhook" | "email" | "none";

export interface DeliveryResult {
  delivered: boolean;
  channels: DeliveryChannel[];
  /** Present when nothing is configured — surfaced to the operator in
   *  server logs and to the visitor as an honest fallback message. */
  reason?: string;
}

export interface DeliverablePayload {
  kind:
    | "subscription"
    | "submission"
    | "contact"
    | "school-enquiry"
    | "newsletter";
  reference: string;
  receivedAt: string;
  data: Record<string, unknown>;
}

const notifyEmail = () => process.env.KIDSCHRON_NOTIFY_EMAIL;
const webhookUrl = () => process.env.KIDSCHRON_WEBHOOK_URL;
const resendKey = () => process.env.RESEND_API_KEY;

async function sendWebhook(payload: DeliverablePayload): Promise<boolean> {
  const url = webhookUrl();
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.error("[kidschron] webhook delivery failed", err);
    return false;
  }
}

async function sendEmail(payload: DeliverablePayload): Promise<boolean> {
  const key = resendKey();
  const to = notifyEmail();
  if (!key || !to) return false;
  const lines = Object.entries(payload.data)
    .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
    .join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.KIDSCHRON_FROM_EMAIL ?? "KidsChron <noreply@kidschron.com>",
        to: [to],
        subject: `KidsChron ${payload.kind} — ${payload.reference}`,
        text: `Reference: ${payload.reference}\nReceived: ${payload.receivedAt}\n\n${lines}`,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[kidschron] email delivery failed", err);
    return false;
  }
}

export async function deliver(
  payload: DeliverablePayload,
): Promise<DeliveryResult> {
  const channels: DeliveryChannel[] = [];

  const [hook, mail] = await Promise.all([
    sendWebhook(payload),
    sendEmail(payload),
  ]);
  if (hook) channels.push("webhook");
  if (mail) channels.push("email");

  if (channels.length > 0) return { delivered: true, channels };

  // Nothing configured (or everything failed). Log it so the record is
  // at least in the server output, and tell the truth upstream.
  console.info(
    "[kidschron] no delivery channel configured — payload logged only:",
    JSON.stringify(payload),
  );
  return {
    delivered: false,
    channels: ["none"],
    reason: webhookUrl() || resendKey()
      ? "The configured delivery channel did not accept this submission."
      : "No delivery channel is configured on this deployment (set KIDSCHRON_WEBHOOK_URL or RESEND_API_KEY).",
  };
}

/** Human-readable, non-sequential reference. Prefix identifies the
 *  kind so support can route a query from the reference alone. */
export function makeReference(prefix: string): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let body = "";
  for (let i = 0; i < 6; i++) {
    body += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  const year = new Date().getFullYear().toString().slice(-2);
  return `${prefix}-${year}${body}`;
}
