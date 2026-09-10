/**
 * Server-side validation.
 * Client-side validation is a convenience for the visitor; this is the
 * one that actually protects the data. Every API route validates here
 * before doing anything else.
 */

export type Errors = Record<string, string>;

const RE = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  // Indian mobile: 10 digits starting 6-9, optionally +91 / 0 prefixed.
  mobile: /^(?:\+?91[-\s]?|0)?[6-9]\d{9}$/,
  pin: /^[1-9]\d{5}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
};

export const clean = (v: unknown) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ") : "";

export function required(errors: Errors, key: string, value: unknown, label: string) {
  const v = clean(value);
  if (!v) errors[key] = `${label} is required.`;
  return v;
}

export function maxLen(errors: Errors, key: string, value: string, n: number, label: string) {
  if (value.length > n) errors[key] = `${label} must be ${n} characters or fewer.`;
  return value.slice(0, n);
}

export function email(errors: Errors, key: string, value: unknown, label = "Email address") {
  const v = clean(value);
  if (!v) errors[key] = `${label} is required.`;
  else if (!RE.email.test(v)) errors[key] = "Please enter a valid email address.";
  return v;
}

export function mobile(errors: Errors, key: string, value: unknown) {
  const v = clean(value).replace(/[\s-]/g, "");
  if (!v) errors[key] = "Mobile number is required.";
  else if (!RE.mobile.test(v))
    errors[key] = "Please enter a valid 10-digit Indian mobile number.";
  return v;
}

export function pinCode(errors: Errors, key: string, value: unknown) {
  const v = clean(value);
  if (!v) errors[key] = "PIN code is required.";
  else if (!RE.pin.test(v)) errors[key] = "A PIN code is 6 digits.";
  return v;
}

export function isoDate(errors: Errors, key: string, value: unknown, label: string) {
  const v = clean(value);
  if (!v) errors[key] = `${label} is required.`;
  else if (!RE.date.test(v)) errors[key] = `Please enter a valid ${label.toLowerCase()}.`;
  return v;
}

export function oneOf<T extends string>(
  errors: Errors,
  key: string,
  value: unknown,
  allowed: readonly T[],
  label: string,
): T {
  const v = clean(value) as T;
  if (!allowed.includes(v)) errors[key] = `Please choose a ${label.toLowerCase()}.`;
  return v;
}

export function mustBeTrue(errors: Errors, key: string, value: unknown, message: string) {
  if (value !== true) errors[key] = message;
  return value === true;
}

/** Very small honeypot check: a hidden field bots tend to fill. */
export function isBot(body: Record<string, unknown>) {
  return Boolean(clean(body.website));
}

export function fail(errors: Errors) {
  return Object.keys(errors).length > 0;
}
