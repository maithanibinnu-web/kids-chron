import { NextResponse } from "next/server";
import { planById } from "@/content";
import { deliver, makeReference } from "@/lib/notifications";
import { saveOrder } from "@/lib/orders";
import { store } from "@/lib/orders";
import { activeGateway } from "@/lib/payments/gateway";
import type { SubscriptionOrder } from "@/lib/payments/types";
import * as v from "@/lib/validate";

export const runtime = "nodejs";

/**
 * Create a subscription order.
 *
 * What this route will NEVER do:
 *  - report a payment as successful
 *  - set status to payment_verified
 * Verification happens only in the webhook route (signature-checked)
 * or through an operator confirming the bank record.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (v.isBot(body)) {
    // Silently accept and discard — do not tell a bot it was caught.
    return NextResponse.json({ ok: true, reference: makeReference("KC") });
  }

  const errors: v.Errors = {};

  // --- Plan ---------------------------------------------------------
  const planId = v.oneOf(errors, "planId", body.planId, ["six-month", "yearly"] as const, "plan");
  const plan = planById(planId);
  if (!plan) errors.planId = "Please choose a subscription plan.";

  // --- Section 1: subscriber ---------------------------------------
  const name = v.maxLen(errors, "name", v.required(errors, "name", body.name, "Name"), 120, "Name");
  const className = v.maxLen(errors, "className", v.required(errors, "className", body.className, "Class"), 40, "Class");
  const school = v.maxLen(errors, "school", v.required(errors, "school", body.school, "School or institute"), 160, "School or institute");
  const dateOfBirth = v.isoDate(errors, "dateOfBirth", body.dateOfBirth, "Date of birth");
  const gender = v.oneOf(errors, "gender", body.gender, ["male", "female", "other"] as const, "gender");

  // --- Section 2: delivery -----------------------------------------
  const address = v.maxLen(errors, "address", v.required(errors, "address", body.address, "Address"), 300, "Address");
  const city = v.maxLen(errors, "city", v.required(errors, "city", body.city, "City"), 80, "City");
  const state = v.maxLen(errors, "state", v.required(errors, "state", body.state, "State"), 80, "State");
  const pinCode = v.pinCode(errors, "pinCode", body.pinCode);

  // --- Section 3: contact ------------------------------------------
  const mobile = v.mobile(errors, "mobile", body.mobile);
  const email = v.email(errors, "email", body.email);
  const referredBy = v.clean(body.referredBy).slice(0, 120);

  // --- Section 5: payment ------------------------------------------
  const method = v.oneOf(
    errors,
    "paymentMethod",
    body.paymentMethod,
    ["upi", "neft", "imps", "bank-transfer", "gateway"] as const,
    "payment method",
  );
  const transactionReference = v.clean(body.transactionReference).slice(0, 80);
  const paymentDate = v.clean(body.paymentDate).slice(0, 20);

  // A reported offline payment must carry a reference — otherwise
  // there is nothing for the team to match against the bank record.
  const reportingPayment = Boolean(body.hasPaid);
  if (reportingPayment && method !== "gateway" && !transactionReference) {
    errors.transactionReference =
      "Please enter the transaction or reference number so we can match your payment.";
  }

  // --- Section 6: declaration --------------------------------------
  v.mustBeTrue(
    errors,
    "declarationConfirmed",
    body.declarationConfirmed,
    "Please confirm the declaration to continue.",
  );
  const signedBy = v.maxLen(errors, "signedBy", v.required(errors, "signedBy", body.signedBy, "Signature name"), 120, "Signature name");
  const signatoryRole = v.oneOf(
    errors,
    "signatoryRole",
    body.signatoryRole,
    ["subscriber", "parent", "guardian"] as const,
    "signatory",
  );
  const guardianName = v.clean(body.guardianName).slice(0, 120);

  if (v.fail(errors)) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // --- Build the order ---------------------------------------------
  const reference = makeReference("KC");
  const now = new Date().toISOString();

  const order: SubscriptionOrder = {
    reference,
    planId,
    amount: plan!.offerPrice,
    currency: "INR",
    status: reportingPayment ? "payment_reported" : "created",
    createdAt: now,
    subscriber: { name, className, school, dateOfBirth, gender },
    delivery: { address, city, state, pinCode },
    contact: { mobile, email, referredBy: referredBy || undefined },
    payment: {
      method,
      amount: plan!.offerPrice,
      transactionReference: transactionReference || undefined,
      paymentDate: paymentDate || undefined,
    },
    declaration: {
      confirmed: true,
      signedBy,
      signedOn: now,
      signatoryRole,
      guardianName: guardianName || undefined,
    },
    history: [{ at: now, status: reportingPayment ? "payment_reported" : "created" }],
  };

  // If a gateway is configured, hand off. Otherwise the offline UPI /
  // NEFT route stands, and the order waits for manual verification.
  const gateway = activeGateway();
  const gatewayResult = await gateway.createOrder({
    reference,
    amount: order.amount,
    currency: "INR",
    customerEmail: email,
    customerMobile: mobile,
    description: `${plan!.name} — ${plan!.editions} editions`,
  });

  if (gatewayResult.gatewayOrderId) {
    order.payment.gatewayOrderId = gatewayResult.gatewayOrderId;
    order.status = "payment_initiated";
    order.history.push({ at: now, status: "payment_initiated", note: gateway.id });
  }

  await saveOrder(order);

  const delivery = await deliver({
    kind: "subscription",
    reference,
    receivedAt: now,
    data: {
      plan: plan!.name,
      amount: order.amount,
      status: order.status,
      subscriber: order.subscriber,
      delivery: order.delivery,
      contact: order.contact,
      payment: order.payment,
      declaration: order.declaration,
    },
  });

  return NextResponse.json({
    ok: true,
    reference,
    status: order.status,
    amount: order.amount,
    planId,
    gateway: {
      id: gateway.id,
      redirectUrl: gatewayResult.redirectUrl ?? null,
      offline: gatewayResult.instructions === "offline",
    },
    // Told plainly so the confirmation screen can be honest about it.
    recordKeeping: {
      delivered: delivery.delivered,
      channels: delivery.channels,
      durableStore: store.durable,
      note: delivery.reason,
    },
  });
}
