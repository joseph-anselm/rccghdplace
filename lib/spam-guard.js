// lib/spam-guard.js — shared bot & abuse protection for public forms (server only)
//
// Layers, cheapest first:
//   1. Honeypot field        — hidden input only bots fill in
//   2. Signed form token     — proves the form was loaded from our site, and not
//                              submitted too fast (bots) or too late (replays)
//   3. Rate limit per IP     — stops floods from one source
//   4. Content checks        — link spam, repeated characters, duplicate posts
//   5. Cloudflare Turnstile  — invisible "are you human" check (when configured)
//
// Required env:  FORM_SECRET                     (any long random string)
// Optional env:  TURNSTILE_SECRET_KEY            (enables layer 5)

import crypto from "crypto";

const MIN_FILL_MS = 3_000; // humans need at least a few seconds to type
const MAX_AGE_MS = 2 * 60 * 60 * 1000; // form tokens expire after 2 hours

/* ------------------------------------------------------------------ */
/*  Signed form token                                                  */
/* ------------------------------------------------------------------ */

const secret = () => {
  const s = process.env.FORM_SECRET;
  if (!s || s.length < 16) throw new Error("FORM_SECRET is missing or too short");
  return s;
};

const sign = (payload) => crypto.createHmac("sha256", secret()).update(payload).digest("base64url");

export function issueFormToken(form) {
  const payload = `${form}.${Date.now()}.${crypto.randomBytes(8).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

function checkFormToken(token, form) {
  if (typeof token !== "string") return "missing";
  const parts = token.split(".");
  if (parts.length !== 4) return "malformed";
  const [f, ts, nonce, sig] = parts;
  const expected = sign(`${f}.${ts}.${nonce}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return "bad-signature";
  if (f !== form) return "wrong-form";
  const age = Date.now() - Number(ts);
  if (!Number.isFinite(age) || age < MIN_FILL_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  if (usedNonces.has(nonce)) return "replayed";
  usedNonces.set(nonce, Date.now() + MAX_AGE_MS);
  return null;
}

/* ------------------------------------------------------------------ */
/*  In-memory stores                                                   */
/*  Fine for a single server. On serverless hosts (e.g. Vercel) each   */
/*  instance has its own memory, so for heavy traffic swap these for   */
/*  Upstash Redis (@upstash/ratelimit). Turnstile + moderation still   */
/*  protect you either way.                                            */
/* ------------------------------------------------------------------ */

const hits = new Map(); // key -> [timestamps]
const usedNonces = new Map(); // nonce -> expiry
const recentHashes = new Map(); // content hash -> expiry

function sweep(map, now) {
  if (map.size < 5000) return;
  for (const [k, exp] of map) if (typeof exp === "number" && exp < now) map.delete(k);
}

function rateLimited(key, limit, windowMs) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (list.length >= limit) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return false;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// Works with App Router requests (Headers) and Pages Router requests (plain object)
export function getHeader(req, name) {
  const h = req?.headers;
  if (!h) return null;
  if (typeof h.get === "function") return h.get(name);
  const v = h[name.toLowerCase()];
  return Array.isArray(v) ? v[0] : v ?? null;
}

export function clientIp(req) {
  const fwd = getHeader(req, "x-forwarded-for");
  return (fwd ? String(fwd).split(",")[0] : getHeader(req, "x-real-ip") || req?.socket?.remoteAddress || "unknown").trim();
}

// True when the request comes from our own site (or has no Origin header, e.g. same-origin GET)
export function sameOrigin(req) {
  const origin = getHeader(req, "origin");
  const host = getHeader(req, "host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function looksLikeSpam(text) {
  const links = (text.match(/https?:\/\/|www\.|\.(com|net|ru|xyz|top|info)\b/gi) || []).length;
  if (links > 1) return "too-many-links";
  if (/(.)\1{9,}/.test(text)) return "repeated-characters";
  if (/<\s*(script|a|iframe|img)\b/i.test(text)) return "html";
  if (/\b(viagra|casino|crypto\s*invest|forex\s*signal|loan\s*offer|seo\s*service)\b/i.test(text)) return "keywords";
  return null;
}

async function verifyTurnstile(token, ip) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true; // not configured → skip this layer
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Main guard                                                         */
/*  Returns { ok: true } or { ok: false, status, error, silent }.     */
/*  `silent` = likely a bot: reply "success" but save nothing, so the  */
/*  bot learns nothing about what tripped it.                          */
/* ------------------------------------------------------------------ */

export async function guardSubmission(req, body, { form, text, limit = 3, windowMs = 10 * 60 * 1000 }) {
  const ip = clientIp(req);
  const now = Date.now();
  sweep(usedNonces, now);
  sweep(recentHashes, now);

  // 1. Honeypot
  if (body.website) return { ok: false, silent: true, reason: "honeypot" };

  // 2. Signed token (checked before rate limiting so bots can't burn real users' quota)
  const tokenProblem = checkFormToken(body.formToken, form);
  if (tokenProblem === "too-fast") return { ok: false, silent: true, reason: tokenProblem };
  if (tokenProblem) {
    return {
      ok: false,
      status: 400,
      error: "Your session expired. Please refresh the page and try again.",
      reason: tokenProblem,
    };
  }

  // 3. Rate limit
  if (rateLimited(`${form}:${ip}`, limit, windowMs)) {
    return { ok: false, status: 429, error: "You've sent a few messages already. Please try again in a little while." };
  }

  // 4. Content
  const spam = looksLikeSpam(text);
  if (spam) {
    return { ok: false, status: 400, error: "Please remove links or unusual content and try again.", reason: spam };
  }
  const hash = crypto.createHash("sha256").update(`${form}|${text.toLowerCase().replace(/\s+/g, " ").trim()}`).digest("hex");
  if (recentHashes.has(hash)) return { ok: false, silent: true, reason: "duplicate" };

  // 5. Turnstile
  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return { ok: false, status: 400, error: "Please complete the verification check and try again." };
  }

  recentHashes.set(hash, now + 24 * 60 * 60 * 1000);
  return { ok: true, ip };
}