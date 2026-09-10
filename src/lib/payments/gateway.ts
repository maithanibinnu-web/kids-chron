import type { OrderStatus, PaymentReport } from "./types";

/**
 * PAYMENT GATEWAY ADAPTER
 * ------------------------------------------------------------------
 * A deliberately small interface. Implement it once per provider and
 * nothing else in the application changes.
 *
 * The default export is `offlineGateway`: no gateway configured, so
 * the site uses the UPI / NEFT / IMPS route with manual verification.
 * That is exactly how KidsChron takes payment today, and it is a
 * legitimate implementation rather than a stub.
 *
 * There is intentionally NO code path anywhere in this repository that
 * marks an order verified without either
 *   (a) a signature-checked webhook, or
 *   (b) an explicit manual confirmation by a KidsChron operator.
 */

export interface CreateOrderInput {
  reference: string;
  amount: number; // whole rupees
  currency: "INR";
  customerEmail: string;
  customerMobile: string;
  description: string;
}

export interface CreateOrderResult {
  /** Where to send the subscriber next, if the gateway is hosted. */
  redirectUrl?: string;
  /** Identifiers to store against the order. */
  gatewayOrderId?: string;
  /** Client-side handle for an embedded checkout. */
  clientToken?: string;
  status: OrderStatus;
  /** Shown to the subscriber when no gateway is available. */
  instructions?: "offline";
}

export interface VerificationInput {
  rawBody: string;
  signature: string | null;
  headers: Record<string, string>;
}

export interface VerificationResult {
  valid: boolean;
  reference?: string;
  status?: Extract<OrderStatus, "payment_verified" | "payment_failed">;
  payment?: Partial<PaymentReport>;
  reason?: string;
}

export interface PaymentGateway {
  readonly id: string;
  readonly available: boolean;
  createOrder(input: CreateOrderInput): Promise<CreateOrderResult>;
  /** Must verify a cryptographic signature. Never trust the body alone. */
  verifyWebhook(input: VerificationInput): Promise<VerificationResult>;
}

/**
 * The offline gateway: the subscriber pays by UPI/NEFT/IMPS to the
 * KidsChron account and reports the reference. The order rests at
 * `payment_reported` until a person verifies it against the bank.
 */
export const offlineGateway: PaymentGateway = {
  id: "offline",
  available: true,
  async createOrder() {
    return { status: "created", instructions: "offline" };
  },
  async verifyWebhook() {
    return {
      valid: false,
      reason:
        "No payment gateway is configured. Payments are verified manually against the bank record.",
    };
  },
};

/**
 * Razorpay adapter, wired but inert until keys are present.
 * Left in place because it is the integration KidsChron is most likely
 * to add, and because it demonstrates that the interface is real.
 */
export function razorpayGateway(): PaymentGateway {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const available = Boolean(keyId && keySecret);

  return {
    id: "razorpay",
    available,
    async createOrder(input) {
      if (!available) return offlineGateway.createOrder(input);
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          authorization:
            "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
          "content-type": "application/json",
        },
        body: JSON.stringify({
          amount: input.amount * 100, // paise
          currency: input.currency,
          receipt: input.reference,
          notes: { description: input.description },
        }),
      });
      if (!res.ok) {
        console.error("[kidschron] razorpay order creation failed", await res.text());
        return { status: "created", instructions: "offline" };
      }
      const order = (await res.json()) as { id: string };
      return {
        gatewayOrderId: order.id,
        clientToken: keyId,
        status: "payment_initiated",
      };
    },
    async verifyWebhook({ rawBody, signature }) {
      if (!webhookSecret || !signature) {
        return { valid: false, reason: "Webhook secret or signature missing." };
      }
      const { createHmac, timingSafeEqual } = await import("node:crypto");
      const expected = createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");
      const a = Buffer.from(expected, "utf8");
      const b = Buffer.from(signature, "utf8");
      if (a.length !== b.length || !timingSafeEqual(a, b)) {
        return { valid: false, reason: "Signature mismatch." };
      }
      const event = JSON.parse(rawBody) as {
        event: string;
        payload?: {
          payment?: {
            entity?: { id?: string; order_id?: string; amount?: number; notes?: Record<string, string> };
          };
          order?: { entity?: { receipt?: string } };
        };
      };
      const reference = event.payload?.order?.entity?.receipt;
      const entity = event.payload?.payment?.entity;
      if (event.event === "payment.captured") {
        return {
          valid: true,
          reference,
          status: "payment_verified",
          payment: {
            method: "gateway",
            gatewayPaymentId: entity?.id,
            gatewayOrderId: entity?.order_id,
            amount: entity?.amount ? entity.amount / 100 : undefined,
          },
        };
      }
      if (event.event === "payment.failed") {
        return { valid: true, reference, status: "payment_failed" };
      }
      return { valid: true, reason: `Unhandled event: ${event.event}` };
    },
  };
}

/** The gateway the app should use, chosen from the environment. */
export function activeGateway(): PaymentGateway {
  const rp = razorpayGateway();
  return rp.available ? rp : offlineGateway;
}
