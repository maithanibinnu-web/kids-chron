import type { SubscriptionOrder, OrderStatus } from "./payments/types";

/**
 * ORDER STORE
 * ------------------------------------------------------------------
 * An in-memory store, on purpose and with eyes open.
 *
 * This build ships without a database, so orders live for the lifetime
 * of the server process. That is fine for a demonstration and wrong
 * for production, so the honesty is pushed all the way to the UI:
 * `store.durable` is false here, and the confirmation screen tells the
 * subscriber their reference is not yet stored permanently.
 *
 * To make it durable, replace the three functions below with calls to
 * your database (Postgres/Prisma, Supabase, Firestore, a Sheet — the
 * interface is deliberately tiny) and set `durable` to true. Nothing
 * else in the application needs to change.
 */

const orders = new Map<string, SubscriptionOrder>();

export const store = {
  durable: false,
  name: "in-memory (process lifetime only)",
};

export async function saveOrder(order: SubscriptionOrder): Promise<void> {
  orders.set(order.reference, order);
}

export async function getOrder(
  reference: string,
): Promise<SubscriptionOrder | undefined> {
  return orders.get(reference);
}

export async function updateOrderStatus(
  reference: string,
  status: OrderStatus,
  note?: string,
): Promise<SubscriptionOrder | undefined> {
  const order = orders.get(reference);
  if (!order) return undefined;
  const updated: SubscriptionOrder = {
    ...order,
    status,
    history: [...order.history, { at: new Date().toISOString(), status, note }],
  };
  orders.set(reference, updated);
  return updated;
}

export async function listOrders(): Promise<SubscriptionOrder[]> {
  return [...orders.values()].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1,
  );
}
