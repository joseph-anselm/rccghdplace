// 'use client'
// import React, { useState } from 'react';

// const CounselingRequestPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     telephone: '',
//     whatsapp: '',
//     message: '',
//     timeToReach: '',
//   });

//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage('');
//     setErrorMessage('');

//     try {
//       const response = await fetch('/api/sendCounselRequest', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit request');
//       }

//       setSuccessMessage('Your request has been submitted successfully!');
//       setFormData({
//         name: '',
//         email: '',
//         telephone: '',
//         whatsapp: '',
//         message: '',
//         timeToReach: '',
//       });
//     } catch (error) {
//       setErrorMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="container mx-auto max-w-lg px-6">
//         <h2 className="text-3xl font-bold text-center mb-6">Request Counseling</h2>
//         {successMessage && (
//           <div className="mb-4 text-green-500">{successMessage}</div>
//         )}
//         {errorMessage && (
//           <div className="mb-4 text-red-500">{errorMessage}</div>
//         )}
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="name">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="telephone">
//               Telephone
//             </label>
//             <input
//               type="tel"
//               name="telephone"
//               id="telephone"
//               value={formData.telephone}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="whatsapp">
//               WhatsApp Number
//             </label>
//             <input
//               type="tel"
//               name="whatsapp"
//               id="whatsapp"
//               value={formData.whatsapp}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="timeToReach">
//               Best Time to Reach You
//             </label>
//             <input
//               type="text"
//               name="timeToReach"
//               id="timeToReach"
//               value={formData.timeToReach}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="message">
//               Message
//             </label>
//             <textarea
//               name="message"
//               id="message"
//               value={formData.message}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-[#9CCF30] text-white rounded-lg hover:bg-[#86b829] focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
//           >
//             Submit Request
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CounselingRequestPage;


"use client";

// components/CounselingRequestPage.js — Request Counsel

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  LockClosedIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const API = "/api/sendCounselRequest"; // your existing endpoint
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const CHURCH_PHONE = { display: "+234 706 470 0115", tel: "+2347064700115" }; // keep in sync with ContactUs.js

const TOPICS = ["Prayer", "Marriage & family", "Relationships", "Career & finances", "Spiritual growth", "Grief & loss", "Something else"];
const METHODS = [
  { value: "WhatsApp", icon: FaWhatsapp },
  { value: "Phone call", icon: PhoneIcon },
  { value: "Email", icon: EnvelopeIcon },
  { value: "In person", icon: UserIcon },
];
const TIMES = ["Morning", "Afternoon", "Evening", "Weekends"];

const EMPTY = {
  name: "",
  email: "",
  telephone: "",
  whatsapp: "",
  message: "",
  website: "", // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s()-]{10,18}$/;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");

function Chip({ selected, onClick, children, icon: Icon, role = "radio" }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2",
        selected ? "border-[#061956] bg-[#061956] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-[#061956]/30 hover:text-[#061956]"
      )}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </button>
  );
}

function Field({ id, label, required, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-[#061956]">
        <span>
          {label} {required ? <span className="text-[#7FB000]">*</span> : <span className="font-normal text-slate-400">(optional)</span>}
        </span>
        {hint && <span className="text-xs font-normal text-slate-400">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Turnstile (only renders when a site key is configured)             */
/* ------------------------------------------------------------------ */

function Turnstile({ onToken, resetSignal }) {
  const box = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !box.current || !window.turnstile || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: "interaction-only",
        callback: (t) => onToken(t),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };
    if (window.turnstile) render();
    else {
      let s = document.querySelector("script[data-turnstile]");
      if (!s) {
        s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.dataset.turnstile = "1";
        document.head.appendChild(s);
      }
      s.addEventListener("load", render);
    }
    return () => {
      cancelled = true;
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [onToken]);

  useEffect(() => {
    if (resetSignal && widgetId.current !== null && window.turnstile) {
      window.turnstile.reset(widgetId.current);
      onToken("");
    }
  }, [resetSignal, onToken]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={box} className="mt-5" />;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CounselingRequestPage() {
  const [form, setForm] = useState(EMPTY);
  const [topic, setTopic] = useState("");
  const [method, setMethod] = useState("WhatsApp");
  const [times, setTimes] = useState([]);
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverError, setServerError] = useState("");
  const [formToken, setFormToken] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const firstName = useRef("");

  const fetchToken = useCallback(async () => {
    try {
      const res = await fetch("/api/form-token?form=counsel", { cache: "no-store" });
      const data = await res.json();
      setFormToken(data.token || "");
    } catch {
      setFormToken("");
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const toggleTime = (t) => setTimes((list) => (list.includes(t) ? list.filter((x) => x !== t) : [...list, t]));

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please tell us your name.";
    if (!EMAIL_RE.test(form.email.trim())) er.email = "Please enter a valid email address.";
    if (!PHONE_RE.test(form.telephone.trim())) er.telephone = "Please enter a valid phone number.";
    if (!sameAsPhone && form.whatsapp.trim() && !PHONE_RE.test(form.whatsapp.trim()))
      er.whatsapp = "Please enter a valid WhatsApp number.";
    if (!consent) er.consent = "Please confirm so we can reach out to you.";
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) document.getElementById(`c-${first}`)?.focus();
    return !first;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setServerError("Please wait a moment for the security check to finish, then try again.");
      return;
    }

    setStatus("loading");
    setServerError("");

    // Same fields your existing API already expects, with the new choices folded in
    const whatsapp = sameAsPhone ? form.telephone.trim() : form.whatsapp.trim();
    const details = [
      topic && `Topic: ${topic}`,
      `Preferred contact: ${method}`,
      form.message.trim() && `\n${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          telephone: form.telephone.trim(),
          whatsapp,
          timeToReach: times.length ? times.join(", ") : "Any time",
          message: details,
          // Extra fields for the spam guard (ignored if the API doesn't check them)
          topic,
          preferredContact: method,
          website: form.website,
          formToken,
          turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "We couldn't send your request. Please try again.");

      firstName.current = form.name.trim().split(/\s+/)[0];
      setForm(EMPTY);
      setTopic("");
      setTimes([]);
      setConsent(false);
      setStatus("success");
      window.scrollTo({ top: document.getElementById("counsel")?.offsetTop - 100 || 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setServerError(err.message);
    } finally {
      fetchToken();
      setResetSignal((n) => n + 1);
    }
  };

  const input = (hasError) =>
    cn(
      "w-full rounded-xl border bg-white px-4 py-3 text-base text-[#061956] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-4 disabled:opacity-60",
      hasError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-[#98CE2F] focus:ring-[#98CE2F]/15"
    );

  return (
    <section id="counsel" aria-labelledby="counsel-title" className="bg-[#F6F8FB] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* ---------- Reassurance panel ---------- */}
        <aside className="lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-28">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FB000]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
                You&apos;re not alone
              </p>
              <h2 id="counsel-title" className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl">
                Let&apos;s talk and <span className="bg-gradient-to-r from-[#7FB000] via-[#98CE2F] to-[#DAB24B] bg-clip-text text-transparent">pray together.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
                Whatever you&apos;re facing, our pastors and counsellors are ready to listen, pray with you and walk with you.
              </p>
            </div>

            <div className="rounded-3xl bg-[#061956] p-7 text-white">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]">
                <LockClosedIcon className="h-4 w-4" aria-hidden="true" />
                Private &amp; confidential
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Your request goes only to our pastoral care team. It is never published or shared.
              </p>

              <ol className="mt-6 space-y-4 border-t border-white/10 pt-6">
                {[
                  { t: "Send your request", d: "Share as much or as little as you're comfortable with." },
                  { t: "We reach out", d: "A pastor or counsellor contacts you the way you prefer, usually within 48 hours." },
                  { t: "We meet & pray", d: "By phone, WhatsApp or in person — whatever suits you." },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#98CE2F] text-sm font-bold text-[#061956]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{s.t}</p>
                      <p className="mt-0.5 text-sm text-white/60">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Urgent help */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <p className="flex items-center gap-2 font-bold text-[#061956]">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-600" strokeWidth={2} aria-hidden="true" />
                Need to talk now?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Call the church on{" "}
                <a href={`tel:${CHURCH_PHONE.tel}`} className="font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-2">
                  {CHURCH_PHONE.display}
                </a>
                . If you or someone else is in immediate danger, call the emergency line <a href="tel:112" className="font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-2">112</a>.
              </p>
            </div>
          </div>
        </aside>

        {/* ---------- Form / success ---------- */}
        <div className="lg:col-span-7">
          {status === "success" ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-[0_30px_60px_-40px_rgba(6,25,86,0.35)] sm:p-12">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#98CE2F]/15 text-[#5E8A00]">
                <CheckCircleIcon className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[#061956] sm:text-3xl" role="status">
                Thank you{firstName.current ? `, ${firstName.current}` : ""}. We&apos;ve received your request.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-slate-500">
                A member of our pastoral team will reach out to you soon. You are loved, and we&apos;re already praying for you.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/" className="rounded-full bg-[#061956] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a2472]">
                  Back to home
                </Link>
                <Link href="/testimony-feedback" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#061956]/15 px-6 py-3 text-sm font-semibold text-[#061956] transition-colors hover:border-[#061956]">
                  <SparklesIcon className="h-4 w-4" aria-hidden="true" />
                  Read testimonies
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(6,25,86,0.35)] sm:p-9">
              <h3 className="text-2xl font-extrabold tracking-tight text-[#061956]">Request counsel</h3>
              <p className="mt-1 text-sm text-slate-500">Fields marked * are required.</p>

              {/* About you */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field id="c-name" label="Your name" required error={errors.name}>
                    <input id="c-name" type="text" autoComplete="name" maxLength={80} value={form.name} onChange={update("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-error" : undefined} className={input(errors.name)} placeholder="First and last name" />
                  </Field>
                </div>
                <Field id="c-telephone" label="Phone number" required error={errors.telephone}>
                  <input id="c-telephone" type="tel" autoComplete="tel" inputMode="tel" maxLength={18} value={form.telephone} onChange={update("telephone")} aria-invalid={!!errors.telephone} aria-describedby={errors.telephone ? "c-telephone-error" : undefined} className={input(errors.telephone)} placeholder="080 1234 5678" />
                </Field>
                <Field id="c-email" label="Email" required error={errors.email}>
                  <input id="c-email" type="email" autoComplete="email" inputMode="email" maxLength={200} value={form.email} onChange={update("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-error" : undefined} className={input(errors.email)} placeholder="you@example.com" />
                </Field>

                <div className="sm:col-span-2">
                  <label className="inline-flex cursor-pointer select-none items-center gap-2.5 text-sm text-slate-600">
                    <input type="checkbox" checked={sameAsPhone} onChange={(e) => setSameAsPhone(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-[#98CE2F]" />
                    <FaWhatsapp className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                    My WhatsApp number is the same as my phone number
                  </label>
                  <div className={cn("grid transition-all duration-300", sameAsPhone ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100")} aria-hidden={sameAsPhone}>
                    <div className="min-h-0">
                      <div className="pt-3">
                        <Field id="c-whatsapp" label="WhatsApp number" error={errors.whatsapp}>
                          <input id="c-whatsapp" type="tel" inputMode="tel" maxLength={18} value={form.whatsapp} onChange={update("whatsapp")} tabIndex={sameAsPhone ? -1 : 0} disabled={sameAsPhone} className={input(errors.whatsapp)} placeholder="080 1234 5678" />
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic */}
              <fieldset className="mt-8">
                <legend className="mb-3 text-sm font-semibold text-[#061956]">
                  What would you like to talk about? <span className="font-normal text-slate-400">(optional)</span>
                </legend>
                <div role="radiogroup" className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <Chip key={t} selected={topic === t} onClick={() => setTopic(topic === t ? "" : t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              {/* Message */}
              <div className="mt-6">
                <Field id="c-message" label="Tell us a little more" hint={`${form.message.length}/2000`}>
                  <textarea id="c-message" rows={5} maxLength={2000} value={form.message} onChange={update("message")} className={cn(input(false), "resize-y")} placeholder="Share only what you're comfortable with. You can tell us more when we talk." />
                </Field>
              </div>

              {/* How & when */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <fieldset>
                  <legend className="mb-3 text-sm font-semibold text-[#061956]">How should we reach you?</legend>
                  <div role="radiogroup" className="flex flex-wrap gap-2">
                    {METHODS.map((m) => (
                      <Chip key={m.value} selected={method === m.value} onClick={() => setMethod(m.value)} icon={m.icon}>
                        {m.value}
                      </Chip>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#061956]">
                    <ClockIcon className="h-4 w-4 text-[#7FB000]" aria-hidden="true" />
                    Best time to reach you
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {TIMES.map((t) => (
                      <Chip key={t} role="checkbox" selected={times.includes(t)} onClick={() => toggleTime(t)}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                <label>
                  Website
                  <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
                </label>
              </div>

              {/* Consent */}
              <div className="mt-8 rounded-2xl bg-[#F6F8FB] p-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                  <input
                    id="c-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent) setErrors((er) => ({ ...er, consent: undefined }));
                    }}
                    aria-invalid={!!errors.consent}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#98CE2F]"
                  />
                  <span>
                    I&apos;m happy for the RCCG His Dwelling Place pastoral team to contact me about this request. My details will be kept confidential.
                  </span>
                </label>
                {errors.consent && <p className="mt-2 pl-7 text-xs font-medium text-red-600">{errors.consent}</p>}
              </div>

              <Turnstile onToken={setTurnstileToken} resetSignal={resetSignal} />

              {status === "error" && serverError && (
                <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !formToken}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#98CE2F] px-6 py-4 text-base font-bold text-[#061956] shadow-[0_10px_30px_-12px_rgba(152,206,47,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9DD3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#061956] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#061956]/30 border-t-[#061956]" />
                    Sending securely…
                  </>
                ) : (
                  <>
                    Send my request
                    <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
                Sent securely and protected against spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}