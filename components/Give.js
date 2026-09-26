// // components/Give.js
// import React from 'react';

// const Give = () => {
//   return (
//     <div className="container max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-center mb-8">Church Account Details</h2>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2 text-gray-500">Purpose: Tithe and Offering</h3>
//           <div className="flex flex-col md:flex-row md:items-center mb-4">
//             <div className="md:w-1/3">
//               <p className="font-medium">Bank Name:</p>
//             </div>
//             <div className="md:w-2/3">
//               <p>Zenith Bank</p>
//             </div>
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center mb-4">
//             <div className="md:w-1/3">
//               <p className="font-medium">Account Number:</p>
//             </div>
//             <div className="md:w-2/3">
//               <p>1017398919</p>
//             </div>
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center">
//             <div className="md:w-1/3">
//               <p className="font-medium">Account Name:</p>
//             </div>
//             <div className="md:w-2/3">
//               <p>RCCG His Dwelling Place</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold mb-2 text-gray-500">Purpose: Donations</h3>
//           <div className="flex flex-col md:flex-row md:items-center mb-4">
//             <div className="md:w-1/3">
//               <p className="font-medium">Bank Name:</p>
//             </div>
//             <div className="md:w-2/3">
//               <p>Zenith Bank</p>
//             </div>
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center mb-4">
//             <div className="md:w-1/3">
//               <p className="font-medium">Account Number:</p>
//             </div>
//             <div className="md:w-2/3">
//               <p>1017398926</p>
//             </div>
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center">
//             <div className="md:w-1/3">
//               <p className="font-medium">Account Name:</p>
//             </div>
//             <div className="md:w-2/3">
//               <p>RCCG His Dwelling Place Project</p>
//             </div>
//           </div>
//         </div>
//         <p className="mt-8 text-sm text-gray-500">
//           Thank you for your generous donations. Your support helps us continue our mission and reach out to more people. Always Ensure to include a reference / give purpose when sending to the account numbers 
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Give;


"use client";

// components/Give.js — Give page

import { useState } from "react";
import {
  DocumentDuplicateIcon,
  CheckIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  HeartIcon,
  SparklesIcon,
  PencilSquareIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Accounts — single place to update                                  */
/* ------------------------------------------------------------------ */

const ACCOUNTS = [
  {
    purpose: "Tithe & Offering",
    blurb: "Your tithes and weekly offerings.",
    bank: "Zenith Bank",
    number: "1017398919",
    name: "RCCG His Dwelling Place",
    icon: HeartIcon,
    references: ["Tithe", "Offering", "Thanksgiving", "First Fruit"],
    theme: "navy",
  },
  {
    purpose: "Donations & Projects",
    blurb: "Building, outreach and special projects.",
    bank: "Zenith Bank",
    number: "1017398926",
    name: "RCCG His Dwelling Place Project",
    icon: SparklesIcon,
    references: ["Donation", "Building Project", "Outreach", "Welfare"],
    theme: "green",
  },
];

const WHATSAPP = "2347064700115"; // for sending proof of payment — keep in sync with ContactUs.js

const SCRIPTURE = {
  text: "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.",
  ref: "2 Corinthians 9:7",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const groupDigits = (n) => n.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");

function useCopy() {
  const [copied, setCopied] = useState("");
  const copy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? "" : c)), 2000);
  };
  return [copied, copy];
}

/* ------------------------------------------------------------------ */
/*  Account card                                                       */
/* ------------------------------------------------------------------ */

function AccountCard({ acct, copied, copy }) {
  const Icon = acct.icon;
  const navy = acct.theme === "navy";
  const numKey = `num-${acct.number}`;
  const allKey = `all-${acct.number}`;
  const [ref, setRef] = useState(acct.references[0]);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_60px_-40px_rgba(6,25,86,0.4)]">
      {/* Bank-card style header */}
      <div
        className={cn(
          "relative overflow-hidden p-7 sm:p-8",
          navy ? "bg-[#061956] text-white" : "bg-[#98CE2F] text-[#061956]"
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[70px]",
            navy ? "bg-[#98CE2F]/30" : "bg-white/40"
          )}
        />
        <div aria-hidden="true" className={cn("pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full border", navy ? "border-white/10" : "border-[#061956]/10")} />
        <div aria-hidden="true" className={cn("pointer-events-none absolute -bottom-32 left-10 h-48 w-48 rounded-full border", navy ? "border-white/10" : "border-[#061956]/10")} />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", navy ? "text-[#98CE2F]" : "text-[#061956]/70")}>
              Purpose
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{acct.purpose}</h2>
            <p className={cn("mt-1 text-sm", navy ? "text-white/60" : "text-[#061956]/70")}>{acct.blurb}</p>
          </div>
          <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", navy ? "bg-white/10 text-[#98CE2F]" : "bg-[#061956] text-[#98CE2F]")}>
            <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>

        {/* Account number — the thing people actually need */}
        <div className="relative mt-8">
          <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", navy ? "text-white/50" : "text-[#061956]/60")}>
            Account number
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="font-mono text-3xl font-bold tracking-[0.08em] tabular-nums sm:text-[2.1rem]" aria-label={acct.number.split("").join(" ")}>
              {groupDigits(acct.number)}
            </p>
            <button
              type="button"
              onClick={() => copy(numKey, acct.number)}
              aria-label={copied === numKey ? "Account number copied" : `Copy account number ${acct.number}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                navy
                  ? copied === numKey
                    ? "bg-[#98CE2F] text-[#061956]"
                    : "bg-white/10 text-white hover:bg-white/20 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-[#061956]"
                  : copied === numKey
                    ? "bg-[#061956] text-white"
                    : "bg-[#061956]/10 text-[#061956] hover:bg-[#061956]/20 focus-visible:ring-[#061956] focus-visible:ring-offset-[#98CE2F]"
              )}
            >
              {copied === numKey ? (
                <>
                  <CheckIcon className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" /> Copied
                </>
              ) : (
                <>
                  <DocumentDuplicateIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Bank</dt>
            <dd className="mt-1 flex items-center gap-2 font-bold text-[#061956]">
              <BuildingLibraryIcon className="h-4 w-4 text-[#7FB000]" strokeWidth={2} aria-hidden="true" />
              {acct.bank}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Account name</dt>
            <dd className="mt-1 font-bold text-[#061956]">{acct.name}</dd>
          </div>
        </dl>

        {/* Reference picker */}
        <fieldset className="mt-7">
          <legend className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Add this to your transfer narration
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {acct.references.map((r) => (
              <label key={r} className="cursor-pointer">
                <input type="radio" name={`ref-${acct.number}`} value={r} checked={ref === r} onChange={() => setRef(r)} className="peer sr-only" />
                <span className="inline-block rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-all peer-checked:border-[#061956] peer-checked:bg-[#061956] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#98CE2F] hover:border-[#061956]/30">
                  {r}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500">
            e.g. <span className="rounded bg-[#98CE2F]/15 px-2 py-0.5 font-mono font-semibold text-[#061956]">{ref} – Your Name</span>
          </p>
        </fieldset>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() =>
              copy(allKey, `${acct.bank}\n${acct.number}\n${acct.name}\nNarration: ${ref} – [Your Name]`)
            }
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2",
              copied === allKey
                ? "bg-[#98CE2F] text-[#061956]"
                : "border border-[#061956]/15 text-[#061956] hover:border-[#061956] hover:bg-[#061956] hover:text-white"
            )}
          >
            {copied === allKey ? (
              <>
                <CheckIcon className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" /> Details copied
              </>
            ) : (
              <>
                <DocumentDuplicateIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> Copy all details
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Page section                                                       */
/* ------------------------------------------------------------------ */

const STEPS = [
  { icon: DocumentDuplicateIcon, title: "Copy the account", body: "Tap “Copy” next to the account number for your purpose." },
  { icon: DevicePhoneMobileIcon, title: "Transfer from your bank app", body: "Paste the number, confirm the account name matches exactly." },
  { icon: PencilSquareIcon, title: "Add a narration", body: "Include the purpose and your name, e.g. “Tithe – Tolu Adebayo”." },
];

export default function Give() {
  const [copied, copy] = useCopy();

  return (
    <div className="bg-[#F6F8FB]">
      <GiveStyles />

      <section aria-labelledby="give-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="give-grid pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          {/* Heading */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FB000]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
                Give
              </p>
              <h2 id="give-title" className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl lg:text-6xl">
                Give <span className="give-gradient-text">cheerfully.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-slate-500 sm:text-lg lg:col-span-5 lg:justify-self-end">
              Thank you for your generosity. Your giving helps us continue our mission and reach even more people.
            </p>
          </div>

          {/* Accounts */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {ACCOUNTS.map((a) => (
              <AccountCard key={a.number} acct={a} copied={copied} copy={copy} />
            ))}
          </div>

          {/* Live region so screen readers hear "copied" */}
          <p className="sr-only" aria-live="polite">
            {copied ? "Copied to clipboard" : ""}
          </p>

          {/* How to give + trust */}
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 lg:col-span-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#061956]">How to give</h3>
              <ol className="mt-6 grid gap-6 sm:grid-cols-3">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.title} className="relative">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#98CE2F]/15 text-[#5E8A00]">
                          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-300">0{i + 1}</span>
                      </div>
                      <p className="mt-4 font-bold text-[#061956]">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.body}</p>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[#F6F8FB] p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-3 text-sm text-slate-600">
                  <ChatBubbleLeftRightIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#7FB000]" strokeWidth={1.8} aria-hidden="true" />
                  Want a confirmation? Send your receipt and we'll acknowledge your gift.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello HDP, I just made a transfer. Here is my receipt:")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fb857]"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  Send receipt
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-4">
              {/* Safety notice */}
              <div className="rounded-3xl border border-[#98CE2F]/40 bg-[#98CE2F]/[0.08] p-7">
                <ShieldCheckIcon className="h-8 w-8 text-[#5E8A00]" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-4 font-bold text-[#061956]">Give safely</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  These are our <strong className="text-[#061956]">only</strong> official accounts. Always check the account
                  name reads <strong className="text-[#061956]">RCCG His Dwelling Place</strong>. We will never ask you to pay into a personal account.
                </p>
              </div>

              {/* Scripture */}
              <figure className="relative flex-1 overflow-hidden rounded-3xl bg-[#061956] p-7 text-white">
                <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-4 select-none font-serif text-[8rem] leading-none text-white/[0.07]">
                  &rdquo;
                </span>
                <blockquote className="relative text-lg font-semibold leading-relaxed">{SCRIPTURE.text}</blockquote>
                <figcaption className="relative mt-4 text-sm font-bold text-[#98CE2F]">— {SCRIPTURE.ref}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function GiveStyles() {
  return (
    <style>{`
      .give-gradient-text {
        background: linear-gradient(100deg, #7FB000 0%, #98CE2F 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .give-grid {
        background-image:
          linear-gradient(rgba(6,25,86,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,25,86,0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: radial-gradient(ellipse at top, #000 20%, transparent 70%);
        mask-image: radial-gradient(ellipse at top, #000 20%, transparent 70%);
      }
    `}</style>
  );
}