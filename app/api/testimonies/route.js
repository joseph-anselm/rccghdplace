// app/api/testimonies/route.js — saves testimonies & feedback securely
//


import { NextResponse } from "next/server";
import { client } from "@/sanityClient";
import { guardSubmission } from "@/lib/spam-guard";

const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = new Set(["testimony", "feedback"]);
const LIMITS = { name: 80, email: 200, message: 3000, minMessage: 20 };

const clean = (v, max) =>
  typeof v === "string"
    ? v
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") // strip control chars
        .trim()
        .slice(0, max)
    : "";

export async function POST(req) {
  if (!process.env.SANITY_API_WRITE_TOKEN || !process.env.FORM_SECRET) {
    console.error("Missing SANITY_API_WRITE_TOKEN or FORM_SECRET");
    return NextResponse.json({ error: "This form is temporarily unavailable." }, { status: 500 });
  }

  // Only accept JSON from our own site
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messageType = TYPES.has(body.messageType) ? body.messageType : "testimony";
  const anonymous = Boolean(body.anonymous);
  const message = clean(body.message, LIMITS.message);
  const name = anonymous ? "" : clean(body.name, LIMITS.name);
  const email = anonymous ? "" : clean(body.email, LIMITS.email).toLowerCase();

  // Validation
  if (message.length < LIMITS.minMessage) {
    return NextResponse.json({ error: `Please write at least ${LIMITS.minMessage} characters.` }, { status: 400 });
  }
  if (!anonymous) {
    if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Spam guard
  const guard = await guardSubmission(req, body, { form: "testimony", text: `${name} ${message}` });
  if (!guard.ok) {
    if (guard.silent) {
      console.warn("Testimony blocked silently:", guard.reason);
      return NextResponse.json({ ok: true, pending: messageType === "testimony" });
    }
    if (guard.reason) console.warn("Testimony rejected:", guard.reason);
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  try {
    await writeClient.create({
      _type: "testimonyFeedback",
      messageType,
      name: anonymous ? "Anonymous" : name,
      email: anonymous ? null : email,
      message,
      anonymous,
      approved: false,
    });
    return NextResponse.json({ ok: true, pending: messageType === "testimony" });
  } catch (err) {
    console.error("Error saving testimony:", err);
    return NextResponse.json({ error: "We couldn't send that. Please try again." }, { status: 500 });
  }
}