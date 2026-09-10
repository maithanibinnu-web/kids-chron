"use client";

import type { ReactNode } from "react";
import { useId } from "react";

/**
 * Form field primitives.
 * Accessibility rules baked in, not bolted on:
 *  - every control has a real <label> tied by id
 *  - required is marked in text as well as with the attribute
 *  - help text and errors are linked with aria-describedby
 *  - errors set aria-invalid and are announced via role="alert"
 *  - touch targets are at least 44px tall
 */

const controlBase =
  "w-full rounded-xl border bg-paper px-4 py-3 text-[1rem] text-ink placeholder:text-ink-mute/70 " +
  "transition-colors min-h-12 " +
  "focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500";

const ok = "border-navy-200 hover:border-navy-300";
const bad = "border-coral-500 bg-coral-50/40";

export function FieldShell({
  label,
  required,
  help,
  error,
  children,
  id,
  className = "",
}: {
  label: string;
  required?: boolean;
  help?: ReactNode;
  error?: string;
  children: (props: {
    id: string;
    describedBy: string | undefined;
    invalid: boolean;
  }) => ReactNode;
  id?: string;
  className?: string;
}) {
  const auto = useId();
  const fieldId = id ?? auto;
  const helpId = help ? `${fieldId}-help` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-sm font-semibold text-navy-900"
      >
        {label}
        {required ? (
          <span className="ml-1 text-coral-600" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-ink-mute">(optional)</span>
        )}
      </label>
      {children({ id: fieldId, describedBy, invalid: Boolean(error) })}
      {help && (
        <p id={helpId} className="mt-1.5 text-[0.82rem] text-ink-mute">
          {help}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-[0.85rem] font-medium text-coral-700"
        >
          <span aria-hidden>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  required,
  help,
  error,
  className,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  help?: ReactNode;
  error?: string;
}) {
  return (
    <FieldShell label={label} required={required} help={help} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={`${controlBase} ${invalid ? bad : ok}`}
          {...input}
        />
      )}
    </FieldShell>
  );
}

export function TextArea({
  label,
  required,
  help,
  error,
  className,
  ...input
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  help?: ReactNode;
  error?: string;
}) {
  return (
    <FieldShell label={label} required={required} help={help} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          rows={5}
          className={`${controlBase} resize-y ${invalid ? bad : ok}`}
          {...input}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({
  label,
  required,
  help,
  error,
  options,
  className,
  placeholder = "Please choose…",
  ...input
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  help?: ReactNode;
  error?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <FieldShell label={label} required={required} help={help} error={error} className={className}>
      {({ id, describedBy, invalid }) => (
        <select
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={`${controlBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="%2346536a" stroke-width="2.4" stroke-linecap="round"><path d="m5 8 5 5 5-5"/></svg>')] bg-[length:20px] bg-[right_0.9rem_center] bg-no-repeat pr-11 ${invalid ? bad : ok}`}
          {...input}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required,
  error,
  help,
  className = "",
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  help?: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <fieldset className={className} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="mb-1.5 text-sm font-semibold text-navy-900">
        {label}
        {required && (
          <span className="ml-1 text-coral-600" aria-hidden>
            *
          </span>
        )}
      </legend>
      {help && <p className="mb-2 text-[0.82rem] text-ink-mute">{help}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${
                checked
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-navy-200 bg-paper text-navy-800 hover:border-navy-300"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                required={required}
                onChange={() => onChange(o.value)}
                className="h-4 w-4 accent-blue-700"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.85rem] font-medium text-coral-700">
          ⚠ {error}
        </p>
      )}
    </fieldset>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
  required,
  error,
  name,
  className = "",
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
  error?: string;
  name?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
          error ? "border-coral-400 bg-coral-50/40" : "border-navy-200 bg-paper hover:border-navy-300"
        }`}
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded accent-blue-700"
        />
        <span className="text-[0.92rem] leading-relaxed text-ink-soft">{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.85rem] font-medium text-coral-700">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

export function FormSection({
  step,
  title,
  description,
  children,
}: {
  step?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl2 border border-line bg-paper p-5 sm:p-7">
      <header className="mb-5">
        <div className="flex items-center gap-3">
          {step && (
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-700 text-sm font-bold text-white">
              {step}
            </span>
          )}
          <h3 className="text-xl">{title}</h3>
        </div>
        {description && (
          <p className="mt-2 text-[0.92rem] text-ink-soft">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}
