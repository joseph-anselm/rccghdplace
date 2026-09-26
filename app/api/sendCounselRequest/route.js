// pages/api/sendCounselRequest.js
//
// Emails counselling requests to the pastoral team — securely.
//
// Required in .env.local (and your host's environment settings):
//   SMTP_HOST=smtp.titan.email
//   SMTP_PORT=465
//   SMTP_USER=counselling@rccghdplace.org
//   SMTP_PASS=your-NEW-email-password        ← never put this in code
//   COUNSEL_TO=counselling@rccghdplace.org   ← who receives requests (comma-separate for several)
//   FORM_SECRET=...                          ← already set up for the testimonies form

import nodemailer from "nodemailer";
import { guardSubmission, sameOrigin } from "@/lib/spam-guard";

// Reject oversized payloads before they reach our code
export const config = { api: { bodyParser: { sizeLimit: "20kb" } } };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s()-]{10,18}$/;

// Strip control characters; single-line fields also lose line breaks (blocks email header injection)
const clean = (v, max, multiline = false) => {
  if (typeof v !== "string") return "";
  let s = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  if (!multiline) s = s.replace(/[\r\n]+/g, " ");
  return s.trim().slice(0, max);
};

const escapeHtml = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const toIntl = (p = "") => {
  const d = p.replace(/\D/g, "");
  return d.startsWith("234") ? d : d.startsWith("0") ? `234${d.slice(1)}` : d;
};

// Reuse one SMTP connection across requests
let transporter;
function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

function buildEmail(r) {
  const row = (label, value, href) =>
    value
      ? `<tr>
          <td style="padding:10px 0;color:#64748b;font-size:13px;width:140px;vertical-align:top">${label}</td>
          <td style="padding:10px 0;color:#061956;font-size:15px;font-weight:600">${
            href ? `<a href="${href}" style="color:#061956">${escapeHtml(value)}</a>` : escapeHtml(value)
          }</td>
        </tr>`
      : "";

  const wa = r.whatsapp ? `https://wa.me/${toIntl(r.whatsapp)}` : "";
  const received = new Date().toLocaleString("en-GB", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `<!doctype html>
<html><body style="margin:0;background:#F6F8FB;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <div style="background:#061956;border-radius:16px 16px 0 0;padding:24px 28px">
      <p style="margin:0;color:#98CE2F;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">Confidential</p>
      <h1 style="margin:6px 0 0;color:#fff;font-size:22px">New counselling request</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,.7);font-size:13px">${escapeHtml(received)}</p>
    </div>
    <div style="background:#fff;border-radius:0 0 16px 16px;padding:24px 28px">
      <table style="width:100%;border-collapse:collapse">
        ${row("Name", r.name)}
        ${row("Topic", r.topic)}
        ${row("Prefers", r.preferredContact)}
        ${row("Best time", r.timeToReach)}
        ${row("Phone", r.telephone, `tel:+${toIntl(r.telephone)}`)}
        ${row("WhatsApp", r.whatsapp, wa)}
        ${row("Email", r.email, `mailto:${r.email}`)}
      </table>
      ${
        r.message
          ? `<div style="margin-top:20px;padding:16px 18px;background:#F6F8FB;border-left:4px solid #98CE2F;border-radius:8px;color:#334155;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(r.message)}</div>`
          : ""
      }
      <div style="margin-top:24px">
        ${wa ? `<a href="${wa}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;background:#25D366;color:#fff;text-decoration:none;border-radius:999px;font-weight:bold;font-size:14px">WhatsApp ${escapeHtml(r.name.split(" ")[0])}</a>` : ""}
        <a href="tel:+${toIntl(r.telephone)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;background:#061956;color:#fff;text-decoration:none;border-radius:999px;font-weight:bold;font-size:14px">Call</a>
      </div>
      <p style="margin:20px 0 0;color:#94a3b8;font-size:12px">Reply to this email to respond directly to ${escapeHtml(r.name)}. Please keep this request confidential.</p>
    </div>
  </div>
</body></html>`;

  const text = [
    "NEW COUNSELLING REQUEST (confidential)",
    received,
    "",
    `Name: ${r.name}`,
    r.topic && `Topic: ${r.topic}`,
    r.preferredContact && `Prefers: ${r.preferredContact}`,
    `Best time: ${r.timeToReach}`,
    `Phone: ${r.telephone}`,
    r.whatsapp && `WhatsApp: ${r.whatsapp} (${wa})`,
    `Email: ${r.email}`,
    "",
    r.message && `Message:\n${r.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { html, text };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, FORM_SECRET } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FORM_SECRET) {
    console.error("[counsel] Missing SMTP_* or FORM_SECRET environment variables");
    return res.status(500).json({ error: "This form is temporarily unavailable. Please call the church office." });
  }

  if (!sameOrigin(req)) return res.status(403).json({ error: "Forbidden." });
  if (!String(req.headers["content-type"] || "").includes("application/json")) {
    return res.status(415).json({ error: "Invalid request." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  const r = {
    name: clean(body.name, 80),
    email: clean(body.email, 200).toLowerCase(),
    telephone: clean(body.telephone, 18),
    whatsapp: clean(body.whatsapp, 18),
    timeToReach: clean(body.timeToReach, 100) || "Any time",
    topic: clean(body.topic, 60),
    preferredContact: clean(body.preferredContact, 30),
    message: clean(body.message, 2500, true),
  };

  // Validation
  if (!r.name) return res.status(400).json({ error: "Please tell us your name." });
  if (!EMAIL_RE.test(r.email)) return res.status(400).json({ error: "Please enter a valid email address." });
  if (!PHONE_RE.test(r.telephone)) return res.status(400).json({ error: "Please enter a valid phone number." });
  if (r.whatsapp && !PHONE_RE.test(r.whatsapp)) return res.status(400).json({ error: "Please enter a valid WhatsApp number." });

  // Spam & abuse protection (2 requests per person every 30 minutes)
  const guard = await guardSubmission(req, body, {
    form: "counsel",
    text: `${r.name} ${r.message}`,
    limit: 2,
    windowMs: 30 * 60 * 1000,
  });
  if (!guard.ok) {
    if (guard.silent) {
      console.warn("[counsel] blocked silently:", guard.reason);
      return res.status(200).json({ message: "Counselling request sent successfully!" });
    }
    if (guard.reason) console.warn("[counsel] rejected:", guard.reason);
    return res.status(guard.status).json({ error: guard.error });
  }

  try {
    const { html, text } = buildEmail(r);
    await getTransporter().sendMail({
      from: `"HDP Counsel Request" <${SMTP_USER}>`,
      to: process.env.COUNSEL_TO || SMTP_USER,
      replyTo: { name: r.name, address: r.email }, // pastors can just hit Reply
      subject: `Counselling request — ${r.name}${r.topic ? ` (${r.topic})` : ""}`,
      text,
      html,
      priority: "high",
    });

    return res.status(200).json({ message: "Counselling request sent successfully!" });
  } catch (error) {
    console.error("[counsel] Error sending email:", error?.message || error);
    return res.status(500).json({
      error: "We couldn't send your request just now. Please try again, or call the church office.",
    });
  }
}