import { Icon } from "@/components/ui/Icon";
import { payment } from "@/content";

/**
 * Bank and UPI details, shown exactly as supplied by KidsChron.
 *
 * The Scan & Pay frame is a labelled placeholder because no verified
 * QR image or UPI ID has been provided. Generating a QR from guessed
 * details would be worse than useless — it would send a parent's money
 * somewhere unverified. Drop the real image at
 * /public/brand/upi-qr.png and set `payment.qrImage` in
 * src/content/site.ts; nothing else changes.
 */
export function PaymentPanel({ amount }: { amount?: number }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Bank transfer */}
      <div className="rounded-xl2 border border-line bg-paper p-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-50 text-navy-700">
            <Icon name="shield" className="h-5 w-5" strokeWidth={2} />
          </span>
          <h3 className="text-lg">Bank transfer</h3>
        </div>
        <p className="mt-1.5 text-[0.88rem] text-ink-mute">
          {payment.methods.join(" / ")}
        </p>

        <dl className="mt-5 divide-y divide-line text-[0.95rem]">
          {[
            ["Account name", payment.accountName],
            ["Account number", payment.accountNumber],
            ["IFSC", payment.ifsc],
            ["Bank", `${payment.bank}, ${payment.branch}`],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:gap-4">
              <dt className="w-36 shrink-0 text-[0.8rem] font-semibold uppercase tracking-wide text-ink-mute">
                {label}
              </dt>
              <dd className="font-medium break-words text-navy-900 tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {amount ? (
          <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-[0.92rem] text-blue-900 ring-1 ring-inset ring-blue-100">
            <strong className="font-bold">Amount to pay: ₹{amount.toLocaleString("en-IN")}</strong>
            <br />
            After paying, come back and enter the transaction reference so
            the team can match your payment.
          </p>
        ) : null}
      </div>

      {/* Scan & Pay */}
      <div className="rounded-xl2 border border-line bg-paper p-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf-50 text-leaf-700">
            <Icon name="camera" className="h-5 w-5" strokeWidth={2} />
          </span>
          <h3 className="text-lg">Scan &amp; Pay (UPI)</h3>
        </div>

        {payment.qrImage ? (
          <div className="mt-5 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={payment.qrImage}
              alt="KidsChron UPI QR code"
              className="h-56 w-56 rounded-xl border border-line bg-white p-2"
            />
          </div>
        ) : (
          <div className="mt-5">
            <div
              role="img"
              aria-label="UPI QR code placeholder — the verified code has not been supplied yet"
              className="mx-auto grid h-56 w-56 place-items-center rounded-xl border-2 border-dashed border-navy-300 bg-mist p-4 text-center"
            >
              <div>
                <span aria-hidden className="block text-3xl">▦</span>
                <p className="mt-2 text-[0.82rem] font-semibold text-navy-700">
                  QR code to be added
                </p>
                <p className="mt-1 text-[0.75rem] leading-snug text-ink-mute">
                  We will not display a QR code until the verified one has
                  been supplied.
                </p>
              </div>
            </div>
            <p className="mt-4 text-[0.88rem] text-ink-soft">
              In the meantime, pay by UPI, NEFT or IMPS using the account
              details alongside. Any UPI app accepts an account number and
              IFSC under &ldquo;Pay to bank account&rdquo;.
            </p>
          </div>
        )}

        {payment.upiId ? (
          <p className="mt-4 rounded-xl bg-leaf-50 px-4 py-3 text-[0.92rem] text-leaf-900">
            UPI ID: <strong className="font-bold">{payment.upiId}</strong>
          </p>
        ) : null}
      </div>
    </div>
  );
}
