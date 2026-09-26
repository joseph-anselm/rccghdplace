// "use client";
// import React, { useState, useEffect } from 'react';
// import { client } from '@/sanityClient';
// import { Disclosure } from '@headlessui/react';
// import { ChevronUpIcon } from '@heroicons/react/20/solid'; 

// const TestimoniesPage = () => {
//   const [testimonies, setTestimonies] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     messageType: 'testimony',
//     message: '',
//     anonymous: false,
//   });

//   useEffect(() => {
//     const fetchTestimonies = async () => {
//       try {
//         const query = `*[_type == "testimonyFeedback" && messageType == "testimony"] | order(_createdAt desc) {
//           _id,
//           name,
//           message,
//           anonymous,
//           _createdAt
//         }`;
//         const data = await client.fetch(query);
//         setTestimonies(data);
//       } catch (error) {
//         console.error('Error fetching testimonies:', error);
//       }
//     };
//     fetchTestimonies();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await client.create({
//         _type: 'testimonyFeedback',
//         ...formData,
//       });
//       setFormData({
//         name: '',
//         email: '',
//         messageType: 'testimony',
//         message: '',
//         anonymous: false,
//       });
//       // Refresh testimonies list after submission
//       const updatedTestimonies = await client.fetch(`*[_type == "testimonyFeedback" && messageType == "testimony"] | order(_createdAt desc)`);
//       setTestimonies(updatedTestimonies);
//     } catch (error) {
//       console.error('Error submitting testimony:', error);
//     }
//   };

//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container max-w-5xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-10">Testimonies</h2>

//         {/* Submission Form */}
//         <form onSubmit={handleSubmit} className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-md mb-8">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full md:w-1/5 p-2 border border-gray-300 rounded mb-4 md:mb-0 mr-[2px]"
//             disabled={formData.anonymous}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full md:w-1/5 p-2 border border-gray-300 rounded mb-4 md:mb-0"
//             disabled={formData.anonymous}
//             required
//           />
//           <textarea
//             placeholder="Your Testimony or Feedback"
//             value={formData.message}
//             onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//             className="w-full md:w-2/5 p-2 border border-gray-300 rounded mb-6 md:mb-0"
//             required
//           ></textarea>
//           <div className="w-full md:w-1/5 flex items-center">
//             <input
//               type="checkbox"
//               checked={formData.anonymous}
//               onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
//               className="mr-2"
//             />
//             <label>Submit Anonymously</label>
//           </div>
//           <button
//             type="submit"
//             className="w-full md:w-auto mt-6 md:mt-0 px-4 py-2 bg-[#9CCF30] text-white rounded hover:bg-green-600 focus:outline-none"
//           >
//             Submit
//           </button>
//         </form>

//         {/* Testimonies List */}
//         {testimonies.length > 0 ? (
//           <div className="space-y-4">
//             {testimonies.map((testimony) => (
//               <Disclosure key={testimony._id}>
//                 {({ open }) => (
//                   <>
//                     <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gold bg-go rounded-lg hover:bg-gold-dark focus:outline-none focus-visible:ring focus-visible:ring-gold focus-visible:ring-opacity-75">
//                       <span>
//                         {testimony.anonymous ? 'Anonymous' : testimony.name} - {new Date(testimony._createdAt).toLocaleDateString()}
//                       </span>
//                       <ChevronUpIcon
//                         className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gold`}
//                       />
//                     </Disclosure.Button>
//                     <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
//                       {testimony.message}
//                     </Disclosure.Panel>
//                   </>
//                 )}
//               </Disclosure>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No testimonies found.</div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TestimoniesPage;


"use client";

// components/TestimoniesPage.js — Testimonies & Feedback

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { client } from "@/sanityClient";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const PAGE_SIZE = 8;
const PREVIEW_CHARS = 280;
const MAX_MESSAGE = 3000;
const MIN_MESSAGE = 20;

// Only approved testimonies are public. `approved != false` keeps older
// testimonies (saved before moderation existed) visible.
const TESTIMONIES_QUERY = `*[_type == "testimonyFeedback" && messageType == "testimony" && approved != false]
  | order(_createdAt desc){ _id, name, message, anonymous, _createdAt }`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const formatDate = (iso) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
const initials = (name = "") =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "A";

/* ------------------------------------------------------------------ */
/*  Cloudflare Turnstile widget (renders only when a site key is set)  */
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
        theme: "light",
        appearance: "interaction-only", // invisible for most people
        callback: (t) => onToken(t),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };

    if (window.turnstile) render();
    else {
      let s = document.querySelector('script[data-turnstile]');
      if (!s) {
        s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.defer = true;
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
  return <div ref={box} className="mt-5 min-h-0" />;
}

/* ------------------------------------------------------------------ */
/*  Form                                                               */
/* ------------------------------------------------------------------ */

const EMPTY = { name: "", email: "", message: "", website: "" };

function ShareForm() {
  const [type, setType] = useState("testimony");
  const [form, setForm] = useState(EMPTY);
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const [formToken, setFormToken] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  const fetchToken = useCallback(async () => {
    try {
      const res = await fetch("/api/form-token?form=testimony", { cache: "no-store" });
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
    if (status === "error") setStatus("idle");
  };

  const fail = (msg) => {
    setStatus("error");
    setMessage(msg);
  };

  const submit = async (e) => {
    e.preventDefault();
    const text = form.message.trim();
    if (text.length < MIN_MESSAGE) return fail(`Please write at least ${MIN_MESSAGE} characters.`);
    if (!anonymous) {
      if (!form.name.trim()) return fail("Please enter your name, or choose to share anonymously.");
      if (!EMAIL_RE.test(form.email.trim())) return fail("Please enter a valid email address.");
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) return fail("Please wait a moment for the verification check, then try again.");

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/testimonies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageType: type,
          name: anonymous ? "" : form.name.trim(),
          email: anonymous ? "" : form.email.trim(),
          message: text,
          anonymous,
          website: form.website,
          formToken,
          turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      setForm(EMPTY);
      setAnonymous(false);
      setStatus("success");
      setMessage(
        type === "testimony"
          ? "Thank you for sharing! Your testimony will appear here once our team has reviewed it."
          : "Thank you! Your feedback has been sent privately to our team."
      );
    } catch (err) {
      fail(err.message);
    } finally {
      // Fresh one-time token + challenge for any next submission
      fetchToken();
      setResetSignal((n) => n + 1);
    }
  };

  const input =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-[#061956] placeholder:text-slate-400 transition-colors focus:border-[#98CE2F] focus:outline-none focus:ring-4 focus:ring-[#98CE2F]/15 disabled:bg-slate-50 disabled:opacity-60";

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-[0_30px_60px_-40px_rgba(6,25,86,0.35)] sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#98CE2F]/15 text-[#5E8A00]">
          <CheckCircleIcon className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[#061956]">Received — God bless you!</h3>
        <p className="mx-auto mt-2 max-w-sm text-slate-500" role="status">{message}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-full border border-[#061956]/15 px-6 py-3 text-sm font-semibold text-[#061956] transition-colors hover:bg-[#061956] hover:text-white"
        >
          Share something else
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(6,25,86,0.35)] sm:p-8">
      {/* Type switch */}
      <div role="radiogroup" aria-label="What would you like to share?" className="grid grid-cols-2 gap-1 rounded-2xl bg-[#F6F8FB] p-1">
        {[
          { v: "testimony", label: "Testimony", icon: SparklesIcon },
          { v: "feedback", label: "Feedback", icon: ChatBubbleBottomCenterTextIcon },
        ].map(({ v, label, icon: Icon }) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={type === v}
            onClick={() => setType(v)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]",
              type === v ? "bg-[#061956] text-white shadow" : "text-slate-500 hover:text-[#061956]"
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <p className="mt-5 flex items-start gap-2 text-sm text-slate-500">
        {type === "testimony" ? (
          <>
            <SparklesIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#7FB000]" strokeWidth={2} aria-hidden="true" />
            Share what God has done. Approved testimonies are published here to encourage others.
          </>
        ) : (
          <>
            <LockClosedIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#7FB000]" strokeWidth={2} aria-hidden="true" />
            Feedback goes privately to the church team and is never published.
          </>
        )}
      </p>

      <div className="mt-5">
        <label htmlFor="t-message" className="mb-1.5 block text-sm font-semibold text-[#061956]">
          {type === "testimony" ? "Your testimony" : "Your feedback"}
        </label>
        <textarea
          id="t-message"
          rows={6}
          maxLength={MAX_MESSAGE}
          value={form.message}
          onChange={update("message")}
          placeholder={type === "testimony" ? "Tell us what God has done for you…" : "What's working well, and what could we do better?"}
          disabled={status === "loading"}
          className={cn(input, "resize-y")}
        />
        <p className={cn("mt-1 text-right text-xs tabular-nums", form.message.trim().length < MIN_MESSAGE && form.message ? "text-amber-600" : "text-slate-400")}>
          {form.message.length}/{MAX_MESSAGE}
        </p>
      </div>

      {/* Name + email collapse when anonymous */}
      <div className={cn("grid overflow-hidden transition-all duration-300", anonymous ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100")} aria-hidden={anonymous}>
        <div className="min-h-0">
          <div className="grid gap-3 pt-1 sm:grid-cols-2">
            <div>
              <label htmlFor="t-name" className="sr-only">Your name</label>
              <input id="t-name" type="text" autoComplete="name" value={form.name} onChange={update("name")} placeholder="Your name" maxLength={80} disabled={status === "loading" || anonymous} tabIndex={anonymous ? -1 : 0} className={input} />
            </div>
            <div>
              <label htmlFor="t-email" className="sr-only">Your email</label>
              <input id="t-email" type="email" autoComplete="email" inputMode="email" value={form.email} onChange={update("email")} placeholder="Email (kept private)" maxLength={200} disabled={status === "loading" || anonymous} tabIndex={anonymous ? -1 : 0} className={input} />
            </div>
          </div>
        </div>
      </div>

      {/* Honeypot — invisible to people, irresistible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
        </label>
      </div>

      <label className="mt-5 inline-flex cursor-pointer select-none items-center gap-3 text-sm text-slate-600">
        <span className="relative inline-flex">
          <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="peer sr-only" />
          <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-[#98CE2F] peer-focus-visible:ring-2 peer-focus-visible:ring-[#98CE2F] peer-focus-visible:ring-offset-2" />
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
        </span>
        Share anonymously
      </label>

      <Turnstile onToken={setTurnstileToken} resetSignal={resetSignal} />

      {status === "error" && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !formToken}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#98CE2F] px-6 py-3.5 text-sm font-bold text-[#061956] shadow-[0_10px_30px_-12px_rgba(152,206,47,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9DD3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#061956] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#061956]/30 border-t-[#061956]" />
            Sending…
          </>
        ) : (
          <>
            {type === "testimony" ? "Share my testimony" : "Send feedback"}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
        Protected against spam. Your email is never shown.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimony card                                                     */
/* ------------------------------------------------------------------ */

function TestimonyCard({ t }) {
  const [expanded, setExpanded] = useState(false);
  const long = t.message.length > PREVIEW_CHARS;
  const text = expanded || !long ? t.message : `${t.message.slice(0, PREVIEW_CHARS).trimEnd()}…`;
  const name = t.anonymous || !t.name ? "Anonymous" : t.name;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(6,25,86,0.35)]">
      <span aria-hidden="true" className="pointer-events-none absolute -top-5 right-5 select-none font-serif text-[7rem] leading-none text-[#98CE2F]/15 transition-colors duration-500 group-hover:text-[#98CE2F]/30">
        &rdquo;
      </span>
      <p className="relative flex-1 whitespace-pre-line break-words text-[1.05rem] leading-relaxed text-slate-700">{text}</p>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="relative mt-3 w-fit text-sm font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-4 hover:text-[#5E8A00]"
        >
          {expanded ? "Show less" : "Read full testimony"}
        </button>
      )}
      <footer className="relative mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#061956] text-sm font-bold text-[#98CE2F]">
          {name === "Anonymous" ? "✦" : initials(name)}
        </span>
        <div>
          <p className="font-bold text-[#061956]">{name}</p>
          <time dateTime={t._createdAt} className="text-xs text-slate-400">{formatDate(t._createdAt)}</time>
        </div>
      </footer>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState([]);
  const [state, setState] = useState("loading");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await client.fetch(TESTIMONIES_QUERY);
        if (!cancelled) {
          setTestimonies((data || []).filter((t) => t?.message));
          setState("ready");
        }
      } catch (err) {
        console.error("Error fetching testimonies:", err);
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = useMemo(() => testimonies.slice(0, visible), [testimonies, visible]);

  return (
    <section aria-labelledby="testimonies-title" className="relative overflow-hidden bg-[#F6F8FB] py-16 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* ---------- Form ---------- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FB000]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
              Your story matters
            </p>
            <h2 id="testimonies-title" className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl">
              Share what God <span className="bg-gradient-to-r from-[#7FB000] via-[#98CE2F] to-[#DAB24B] bg-clip-text text-transparent">has done.</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500">
              Your testimony could be exactly what someone needs to hear today. Or tell us how we can serve you better.
            </p>
            <div className="mt-8">
              <ShareForm />
            </div>
          </div>
        </div>

        {/* ---------- Testimonies ---------- */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4">
            <h3 className="shrink-0 text-sm font-bold uppercase tracking-[0.2em] text-[#061956]">
              Testimonies{state === "ready" && testimonies.length > 0 && <span className="text-slate-400"> ({testimonies.length})</span>}
            </h3>
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-[#061956]/20 to-transparent" />
          </div>

          {state === "loading" && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-56 animate-pulse rounded-3xl bg-white" />
              ))}
            </div>
          )}

          {state === "error" && (
            <p className="mt-8 rounded-3xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500">
              We couldn't load testimonies right now. Please refresh to try again.
            </p>
          )}

          {state === "ready" && testimonies.length === 0 && (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 px-6 py-14 text-center">
              <SparklesIcon className="mx-auto h-10 w-10 text-[#98CE2F]" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-4 text-lg font-semibold text-[#061956]">Be the first to share</p>
              <p className="mt-1 text-slate-500">Your testimony will encourage everyone who visits.</p>
            </div>
          )}

          {state === "ready" && shown.length > 0 && (
            <>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {shown.map((t) => (
                  <li key={t._id}>
                    <TestimonyCard t={t} />
                  </li>
                ))}
              </ul>
              {testimonies.length > shown.length && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-full bg-[#061956] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0a2472]"
                  >
                    Load more testimonies
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
} 