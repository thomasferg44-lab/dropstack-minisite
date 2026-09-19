import { useState } from "react";
import { config, content } from "../lib/config.js";
import {
  mailtoFallbackUrl,
  postLead,
  whatsappFallbackUrl,
} from "../lib/leadForm.js";

const EMPTY = { name: "", phone: "", email: "", service: "", message: "" };

// Two paths, same form:
//   leadFormEndpoint set  -> POST JSON, show a success state
//   leadFormEndpoint null -> hand the visitor a wa.me and a mailto: link
//                            built from what they typed (no backend at all)
// The fallback is also the recovery path if a configured endpoint fails.
export default function LeadForm() {
  const [values, setValues] = useState(EMPTY);
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const hasEndpoint = Boolean(config.leadFormEndpoint);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const waUrl = whatsappFallbackUrl(values);
  const mailUrl = mailtoFallbackUrl(values);

  // With no endpoint and neither a WhatsApp number nor an email configured,
  // the form would have nowhere to send to. Render nothing rather than a
  // dead form; the rest of the contact section still stands on its own.
  if (!hasEndpoint && !waUrl && !mailUrl) return null;

  async function onSubmit(e) {
    e.preventDefault();
    if (!hasEndpoint) return; // fallback links handle it; nothing to submit
    setState("sending");
    try {
      await postLead(values);
      setValues(EMPTY);
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8">
        <p className="font-display text-xl text-gray-900">Thanks — message received.</p>
        <p className="mt-2 text-gray-600">
          We'll get back to you shortly. If it's urgent, WhatsApp us and we'll pick it up faster.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 text-sm font-semibold text-primary hover:text-primary-hover underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8"
      noValidate={!hasEndpoint}
    >
      <h3 className="font-display text-xl font-medium text-gray-900">Request a quote</h3>
      <p className="mt-1.5 text-sm text-gray-600">
        Tell us what you need and we'll come back to you with a price.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            type="text" name="name" autoComplete="name" required
            value={values.name} onChange={set("name")} className={inputClass}
          />
        </Field>
        <Field label="Phone" hint="or WhatsApp number">
          <input
            type="tel" name="phone" autoComplete="tel" inputMode="tel"
            value={values.phone} onChange={set("phone")} className={inputClass}
          />
        </Field>
        <Field label="Email" className="sm:col-span-2">
          <input
            type="email" name="email" autoComplete="email"
            value={values.email} onChange={set("email")} className={inputClass}
          />
        </Field>

        {content.services.length > 0 && (
          <Field label="What do you need?" className="sm:col-span-2">
            <select name="service" value={values.service} onChange={set("service")} className={inputClass}>
              <option value="">Choose a service (optional)</option>
              {content.services.map((s) => (
                <option key={s.title} value={s.title}>{s.title}</option>
              ))}
              <option value="Something else">Something else</option>
            </select>
          </Field>
        )}

        <Field label="Message" required className="sm:col-span-2">
          <textarea
            name="message" rows="4" required
            value={values.message} onChange={set("message")}
            placeholder="A short description of the job, and roughly where you are."
            className={inputClass}
          />
        </Field>
      </div>

      {hasEndpoint ? (
        <>
          <button
            type="submit"
            disabled={state === "sending"}
            className="mt-6 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-contrast transition-colors hover:bg-primary-hover active:bg-primary-active disabled:opacity-60"
          >
            {state === "sending" ? "Sending…" : "Send enquiry"}
          </button>
          {state === "error" && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              That didn't go through. Please{" "}
              {waUrl && <FallbackInline href={waUrl}>send it on WhatsApp</FallbackInline>}
              {waUrl && mailUrl && " or "}
              {mailUrl && <FallbackInline href={mailUrl}>send it by email</FallbackInline>}
              {" "}instead — your message is already filled in.
            </p>
          )}
        </>
      ) : (
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {waUrl && (
              <a
                href={waUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-contrast transition-colors hover:bg-primary-hover active:bg-primary-active"
              >
                Send on WhatsApp
              </a>
            )}
            {mailUrl && (
              <a
                href={mailUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3.5 text-base font-semibold text-gray-800 transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                Send by email
              </a>
            )}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Opens WhatsApp or your mail app with these details already filled in.
          </p>
        </div>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-2 focus:outline-offset-0 focus:outline-primary";

function Field({ label, hint, required, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-600" aria-hidden="true"> *</span>}
        {hint && <span className="font-normal text-gray-500"> — {hint}</span>}
      </span>
      {children}
    </label>
  );
}

function FallbackInline({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
      {children}
    </a>
  );
}
