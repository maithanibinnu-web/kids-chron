import { NextResponse } from "next/server";
import { activeGateway } from "@/lib/payments/gateway";
import { updateOrderStatus } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The ONLY place in the application that can mark a payment verified.
 *
 * It refuses to act on an unsigned or badly-signed request, which is
 * what stops anyone from POSTing "I paid" and flipping an order to
 * paid. If no gateway is configured this route always rejects, and
 * verification stays a manual bank-record check.
 */
export async function POST(request: Request) {
  const gateway = activeGateway();
  const rawBody = await request.text();

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  const signature =
    headers["x-razorpay-signature"] ??
    headers["x-webhook-signature"] ??
    headers["x-signature"] ??
    null;

  const result = await gateway.verifyWebhook({ rawBody, signature, headers });

  if (!result.valid) {
    console.warn("[kidschron] webhook rejected:", result.reason);
    return NextResponse.json(
      { ok: false, error: result.reason ?? "Verification failed." },
      { status: 400 },
    );
  }

  if (!result.reference || !result.status) {
    // Valid signature, but an event we do not act on.
    return NextResponse.json({ ok: true, handled: false, note: result.reason });
  }

  const updated = await updateOrderStatus(
    result.reference,
    result.status,
    `Verified by ${gateway.id} webhook`,
  );

  if (!updated) {
    console.warn("[kidschron] webhook for unknown order", result.reference);
    return NextResponse.json({ ok: true, handled: false, note: "Unknown order reference." });
  }

  if (result.status === "payment_verified") {
    await updateOrderStatus(result.reference, "active", "Subscription activated");
  }

  return NextResponse.json({ ok: true, handled: true, reference: result.reference });
}
