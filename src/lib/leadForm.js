import { config } from "./config.js";

/** Human-readable enquiry text, shared by the WhatsApp and email fallbacks. */
export function composeMessage({ name, phone, email, service, message }) {
  const lines = [
    `New enquiry for ${config.businessName}`,
    "",
    `Name: ${name || "-"}`,
    phone ? `Phone: ${phone}` : null,
    email ? `Email: ${email}` : null,
    service ? `Service: ${service}` : null,
    "",
    message || "",
  ];
  return lines.filter((l) => l !== null).join("\n").trim();
}

export function subjectFor({ service }) {
  return service
    ? `Website enquiry — ${service}`
    : `Website enquiry — ${config.businessName}`;
}

/** Fallback path: no backend needed, opens the visitor's own WhatsApp. */
export function whatsappFallbackUrl(values) {
  if (!config.whatsappNumber) return null;
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(composeMessage(values))}`;
}

/** Fallback path: no backend needed, opens the visitor's own mail client. */
export function mailtoFallbackUrl(values) {
  if (!config.email) return null;
  // Percent-encode, don't use URLSearchParams: it encodes spaces as "+",
  // which RFC 6068 mail clients render as literal plus signs.
  const subject = encodeURIComponent(subjectFor(values));
  const body = encodeURIComponent(composeMessage(values));
  return `mailto:${config.email}?subject=${subject}&body=${body}`;
}

/**
 * Endpoint path: POST the raw values as JSON. Used only when
 * companyConfig.leadFormEndpoint is set (this is where the Lead Capture
 * tool plugs in). Throws on a non-2xx so the caller can show an error and
 * offer the fallback links instead.
 */
export async function postLead(values) {
  const res = await fetch(config.leadFormEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...values,
      business: config.businessName,
      submittedAt: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`);
  return res;
}
