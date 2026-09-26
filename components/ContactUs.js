// "use client"
// import React from 'react';
// import Image from 'next/image';

// const ContactUs = () => {
//   return (
//     <div className="container max-w-7xl mx-auto px-4 py-8 my-8">
//       <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
//         <div className="relative w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
//           <div className="relative h-64">
//             <Image
//               src="/images/rccghdp-banner3.jpg"
//               alt="Church 1"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg shadow-lg"
//             />
//           </div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 w-40 lg:h-56 lg:w-56">
//             <Image
//               src="/images/hdplace-contact.jpg"
//               alt="Church 2"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-full border-4 border-white shadow-lg"
//             />
//           </div>
//         </div>
//         <div className="w-full lg:w-1/2 order-1 lg:order-1">
//           <div className="space-y-4">
//             <h3 className="text-2xl font-semibold">Get in Touch</h3>
//             <p className="text-gray-700">We&apos;d love to hear from you! Please reach out with any questions or concerns.</p>
//             <p><strong>Phone:</strong> +234 706 4700115</p>
//             <p><strong>Email:</strong> contact@rccghdplace.org</p>
//             <p><strong>Address:</strong> 2nd Floor Ajebo Building Adjacent Akintonde Arcade New Market Road, Ijebu-Ode, Ogun.</p>
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-96 my-20">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6217010647874!2d3.9102890252004454!3d6.815781993181863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103968adb2b78415%3A0xc1ab6664f7169e74!2sAjebo%20Building%20Ijebu%20Ode!5e0!3m2!1sen!2sng!4v1717258869611!5m2!1sen!2sn"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;



"use client";

// components/ContactUs.js — Contact page

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowUpRightIcon,
  PaperAirplaneIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Contact details — single place to update                           */
/* ------------------------------------------------------------------ */

const PHONE = { display: "+234 706 470 0115", tel: "+2347064700115" };
const WHATSAPP = "2347064700115"; // international format, no "+" — confirm this number is on WhatsApp
const EMAIL = "contact@rccghdplace.org";
const ADDRESS_LINES = [
  "2nd Floor, Ajebo Building",
  "Adjacent Akintonde Arcade, New Market Road",
  "Ijebu-Ode, Ogun State",
];
const ADDRESS = ADDRESS_LINES.join(", ");
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Ajebo Building, New Market Road, Ijebu-Ode"
)}`;
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6217010647874!2d3.9102890252004454!3d6.815781993181863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103968adb2b78415%3A0xc1ab6664f7169e74!2sAjebo%20Building%20Ijebu%20Ode!5e0!3m2!1sen!2sng!4v1717258869611!5m2!1sen!2sng";

// Keep in sync with ChurchServices.js and Footer.js
const SERVICE_TIMES = [
  { day: "Sunday", time: "8:00 AM & 10:00 AM" },
  { day: "Wednesday", time: "5:30 PM – 7:00 PM" },
];

const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/rccghdplace", icon: FaFacebookF },
  { name: "Instagram", href: "https://www.instagram.com/rccghdplace", icon: FaInstagram },
  { name: "YouTube", href: "https://youtube.com/@rccghdplace", icon: FaYoutube },
];

const TOPICS = ["General enquiry", "Prayer request", "Joining a department", "Events & programmes", "Other"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/*  Quick-action card                                                  */
/* ------------------------------------------------------------------ */

function ActionCard({ href, icon: Icon, label, value, hint, external, copy }) {
  const [copied, setCopied] = useState(false);
  const doCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="group relative h-full">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#061956] hover:bg-[#061956] hover:shadow-[0_30px_60px_-30px_rgba(6,25,86,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2"
      >
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#98CE2F]/15 text-[#5E8A00] transition-colors duration-500 group-hover:bg-[#98CE2F] group-hover:text-[#061956]">
            <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <ArrowUpRightIcon className="h-5 w-5 text-slate-300 transition-all duration-500 group-hover:rotate-45 group-hover:text-[#98CE2F]" strokeWidth={2.2} aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#7FB000] transition-colors duration-500 group-hover:text-[#98CE2F]">
          {label}
        </p>
        <p className="mt-1.5 break-words text-lg font-bold leading-snug text-[#061956] transition-colors duration-500 group-hover:text-white">
          {value}
        </p>
        <p className="mt-1 text-sm text-slate-500 transition-colors duration-500 group-hover:text-white/60">{hint}</p>
      </a>
      {copy && (
        <button
          type="button"
          onClick={doCopy}
          aria-label={copied ? "Copied" : `Copy ${label.toLowerCase()}`}
          title="Copy"
          className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-[#98CE2F] hover:text-[#061956] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white"
        >
          {copied ? <CheckIcon className="h-4 w-4" strokeWidth={2.4} /> : <DocumentDuplicateIcon className="h-4 w-4" strokeWidth={2} />}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Message form — sends via WhatsApp or email (no backend needed)     */
/* ------------------------------------------------------------------ */

function MessageForm() {
  const [form, setForm] = useState({ name: "", phone: "", topic: TOPICS[0], message: "" });
  const [error, setError] = useState("");

  // Pre-fill from links like /contact-us?subject=Joining the Media Department
  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get("subject");
    if (!subject) return;
    const topic = /join/i.test(subject) ? "Joining a department" : /pray/i.test(subject) ? "Prayer request" : TOPICS[0];
    setForm((f) => ({ ...f, topic, message: f.message || `Hello, I'm interested in ${subject.replace(/^joining /i, "joining ")}.` }));
  }, []);

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (error) setError("");
  };

  const compose = () =>
    [
      `Hello RCCG His Dwelling Place,`,
      ``,
      form.message.trim(),
      ``,
      `— ${form.name.trim()}${form.phone.trim() ? ` (${form.phone.trim()})` : ""}`,
      `Topic: ${form.topic}`,
    ].join("\n");

  const validate = () => {
    if (!form.name.trim()) return setError("Please tell us your name."), false;
    if (form.message.trim().length < 5) return setError("Please write a short message."), false;
    return true;
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(compose())}`, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    if (!validate()) return;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${form.topic} — ${form.name.trim()}`)}&body=${encodeURIComponent(compose())}`;
  };

  const input =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-[#061956] placeholder:text-slate-400 transition-colors focus:border-[#98CE2F] focus:outline-none focus:ring-4 focus:ring-[#98CE2F]/15";

  return (
    <form onSubmit={sendWhatsApp} noValidate className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(6,25,86,0.35)] sm:p-9">
      <h2 className="text-2xl font-extrabold tracking-tight text-[#061956] sm:text-3xl">Send us a message</h2>
      <p className="mt-2 text-slate-500">We usually reply within a day. For urgent prayer, please call.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="mb-1.5 block text-sm font-semibold text-[#061956]">
            Your name <span className="text-[#7FB000]">*</span>
          </label>
          <input id="ct-name" type="text" autoComplete="name" value={form.name} onChange={update("name")} className={input} placeholder="e.g. Tolu Adebayo" />
        </div>
        <div>
          <label htmlFor="ct-phone" className="mb-1.5 block text-sm font-semibold text-[#061956]">
            Phone <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input id="ct-phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={update("phone")} className={input} placeholder="080…" />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold text-[#061956]">What&apos;s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="topic" value={t} checked={form.topic === t} onChange={update("topic")} className="peer sr-only" />
              <span className="inline-block rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all peer-checked:border-[#061956] peer-checked:bg-[#061956] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#98CE2F] hover:border-[#061956]/30">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="ct-message" className="mb-1.5 block text-sm font-semibold text-[#061956]">
          Message <span className="text-[#7FB000]">*</span>
        </label>
        <textarea id="ct-message" rows={5} maxLength={1500} value={form.message} onChange={update("message")} className={cn(input, "resize-y")} placeholder="How can we help or pray with you?" />
      </div>

      {error && (
        <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-red-600">
          <ExclamationCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-12px_rgba(37,211,102,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fb857] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
          Send on WhatsApp
        </button>
        <button
          type="button"
          onClick={sendEmail}
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[#061956] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0a2472] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2"
        >
          <PaperAirplaneIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
          Send by email
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">Your message opens in WhatsApp or your email app, ready to send.</p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Page section                                                       */
/* ------------------------------------------------------------------ */

export default function ContactUs() {
  return (
    <div className="bg-[#F6F8FB]">
      {/* ---------- Quick actions ---------- */}
      <section aria-label="Contact options" className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <ActionCard href={`tel:${PHONE.tel}`} icon={PhoneIcon} label="Call us" value={PHONE.display} hint="Tap to call" copy={PHONE.display} />
          </li>
          <li>
            <ActionCard href={`https://wa.me/${WHATSAPP}`} external icon={FaWhatsapp} label="WhatsApp" value="Chat with us" hint="Quickest way to reach us" />
          </li>
          <li>
            <ActionCard href={`mailto:${EMAIL}`} icon={EnvelopeIcon} label="Email" value={EMAIL} hint="We reply within a day" copy={EMAIL} />
          </li>
          <li>
            <ActionCard href={DIRECTIONS_URL} external icon={MapPinIcon} label="Visit" value="Ajebo Building" hint="New Market Road, Ijebu-Ode" />
          </li>
        </ul>
      </section>

      {/* ---------- Form + visit info ---------- */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <MessageForm />
        </div>

        <aside className="space-y-6 lg:col-span-5">
          {/* Photo collage */}
          <div className="relative pb-10 pr-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#061956] shadow-[0_30px_60px_-30px_rgba(6,25,86,0.5)]">
              <Image src="/images/rccghdp-banner3.jpg" alt="Worship at RCCG His Dwelling Place" fill sizes="(min-width:1024px) 36vw, 90vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#061956]/60 to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-[60%] text-lg font-extrabold leading-tight text-white">
                Come as you are. <span className="text-[#98CE2F]">You&apos;re family.</span>
              </p>
            </div>
            <div className="absolute bottom-0 right-0 h-32 w-32 overflow-hidden rounded-full border-[6px] border-[#F6F8FB] bg-[#061956] shadow-xl sm:h-40 sm:w-40">
              <Image src="/images/hdplace-contact.jpg" alt="" fill sizes="160px" className="object-cover" />
            </div>
          </div>

          {/* Address + times */}
          <div className="rounded-3xl bg-[#061956] p-7 text-white">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" /> Our address
            </p>
            <address className="mt-3 not-italic leading-relaxed text-white/85">
              {ADDRESS_LINES.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#98CE2F] px-5 py-2.5 text-sm font-bold text-[#061956] transition-all hover:bg-[#A9DD3F]"
            >
              Get directions
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.4} aria-hidden="true" />
            </a>

            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                <ClockIcon className="h-4 w-4 text-[#98CE2F]" aria-hidden="true" /> Service times
              </p>
              <dl className="mt-3 space-y-2">
                {SERVICE_TIMES.map((s) => (
                  <div key={s.day} className="flex justify-between gap-4 text-sm">
                    <dt className="text-white/60">{s.day}</dt>
                    <dd className="font-semibold tabular-nums">{s.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-6">
              <p className="text-sm text-white/60">Follow us</p>
              <ul className="flex gap-2">
                {SOCIALS.map(({ name, href, icon: Icon }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-[#98CE2F] hover:bg-[#98CE2F] hover:text-[#061956]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {/* ---------- Map ---------- */}
      <section aria-label="Map" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-[0_30px_60px_-40px_rgba(6,25,86,0.4)]">
          <iframe
            src={MAP_EMBED}
            title="Map showing RCCG His Dwelling Place at Ajebo Building, Ijebu-Ode"
            className="block h-[420px] w-full sm:h-[480px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex sm:inset-x-auto sm:left-6 sm:bottom-6">
            <div className="pointer-events-auto flex w-full items-center gap-4 rounded-2xl bg-white p-4 shadow-xl sm:w-auto sm:pr-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#061956] text-[#98CE2F]">
                <MapPinIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#061956]">RCCG His Dwelling Place</p>
                <p className="truncate text-sm text-slate-500">Ajebo Building, Ijebu-Ode</p>
              </div>
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-[#98CE2F] px-4 py-2 text-sm font-bold text-[#061956] hover:bg-[#A9DD3F]">
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}