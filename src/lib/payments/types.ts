/**
 * PAYMENT & ORDER MODEL
 * ------------------------------------------------------------------
 * Designed so a real Indian payment gateway (Razorpay, Cashfree, PayU,
 * PhonePe) can be dropped in without changing the UI, AND so that the
 * offline UPI / NEFT route KidsChron uses today is a first-class path
 * rather than a hack.
 *
 * The single rule this model exists to enforce:
 *   a subscription is NEVER shown as paid until a verification step
 *   has actually confirmed the money arrived.
 *
 * `payment_reported` means the subscriber typed in a transaction
 * reference. That is a claim, not a confirmation. Only
 * `payment_verified` — set by a gateway webhook or by a human checking
 * the bank statement — means paid.
 */

export type PaymentMethod = "upi" | "neft" | "imps" | "bank-transfer" | "gateway";

export type OrderStatus =
  /** Form completed, nothing paid yet. */
  | "created"
  /** Redirected/handed off to a gateway; awaiting its callback. */
  | "payment_initiated"
  /** Subscriber says they have paid and gave a reference. Unverified. */
  | "payment_reported"
  /** Money confirmed — by webhook signature or by manual bank check. */
  | "payment_verified"
  /** Gateway reported a failure. */
  | "payment_failed"
  /** Verified and the subscription is running. */
  | "active"
  | "refund_requested"
  | "refunded"
  | "cancelled";

/** Statuses a subscriber may be told mean "paid". Exactly one. */
export const PAID_STATUSES: OrderStatus[] = ["payment_verified", "active"];

export interface SubscriberDetails {
  name: string;
  className: string;
  school: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
}

export interface DeliveryAddress {
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface ContactDetails {
  mobile: string;
  email: string;
  referredBy?: string;
}

export interface PaymentReport {
  method: PaymentMethod;
  /** Amount in whole rupees, as displayed. */
  amount: number;
  /** UTR / UPI reference / gateway payment id. */
  transactionReference?: string;
  paymentDate?: string;
  /** Gateway identifiers, when a gateway is in use. */
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
}

export interface Declaration {
  /** The subscriber/parent confirmed the declaration text. */
  confirmed: boolean;
  /** Typed name acting as the digital signature. */
  signedBy: string;
  signedOn: string;
  /** Who signed: the subscriber may be a child, so a guardian can sign. */
  signatoryRole: "subscriber" | "parent" | "guardian";
  guardianName?: string;
}

export interface SubscriptionOrder {
  reference: string;
  planId: "six-month" | "yearly";
  amount: number;
  currency: "INR";
  status: OrderStatus;
  createdAt: string;
  subscriber: SubscriberDetails;
  delivery: DeliveryAddress;
  contact: ContactDetails;
  payment: PaymentReport;
  declaration: Declaration;
  /** Audit trail. Every status change is appended, never overwritten. */
  history: { at: string; status: OrderStatus; note?: string }[];
}

/** What the confirmation screen is allowed to say, derived from status
 *  — so no component can accidentally claim success. */
export function paymentStatementFor(status: OrderStatus): {
  headline: string;
  detail: string;
  tone: "pending" | "success" | "failed";
} {
  switch (status) {
    case "payment_verified":
    case "active":
      return {
        headline: "Payment confirmed",
        detail:
          "Your payment has been verified and your subscription is active.",
        tone: "success",
      };
    case "payment_failed":
      return {
        headline: "Payment did not go through",
        detail:
          "The payment was not completed. Nothing has been charged. You can try again, or pay by UPI or bank transfer instead.",
        tone: "failed",
      };
    case "payment_initiated":
      return {
        headline: "Waiting for the payment to complete",
        detail:
          "We have not yet had confirmation from the payment provider. This page will not say your payment succeeded until we do.",
        tone: "pending",
      };
    case "payment_reported":
      return {
        headline: "Details received — payment being checked",
        detail:
          "Thank you. We have your subscription details and the transaction reference you entered. The team checks each payment against the bank record before confirming a subscription, so this is not yet a confirmation of payment.",
        tone: "pending",
      };
    default:
      return {
        headline: "Subscription details received",
        detail:
          "We have your details. The next step is payment — the instructions are below.",
        tone: "pending",
      };
  }
}
