// import React from 'react';

// const ChurchServices = () => {
//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container p-1 border border-gray-300 rounded-lg max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
//           <span
//             className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text"
//             style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}
//           >
//             Church </span>
//           <span
//             className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text"
//             style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}
//           >Services</span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="p-4 border border-gray-300 rounded-lg">
//             <h3 className="text-xl font-semibold mb-2">Sunday Worship</h3>
//             <p className="text-gray-600">Join us every Sunday for a time of worship and fellowship.</p>
//             <p className="text-lg font-bold text-gray-800 mt-2">Time: 08:00 AM & 10:00 AM</p>
//             <button className="bg-[#9ACD35] text-white px-4 py-2 rounded-lg mt-4">Worship With Us</button>
//           </div>
//           <div className="p-4 border border-gray-300 rounded-lg">
//             <h3 className="text-xl font-semibold mb-2">Wednesday Service</h3>
//             <p className="text-gray-600">Join us for our midweek service for a time of prayer and reflection.</p>
//             <p className="text-lg font-bold text-gray-800 mt-2">Time: 5:30 PM - 7:00 PM</p>
//             <button className="bg-[#9ACD35] text-white px-4 py-2 rounded-lg mt-4">Worship With Us</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ChurchServices;




"use client";

// components/ChurchServices.js

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/*  day: 0 = Sunday … 6 = Saturday. Times are 24h, Lagos time.         */
/*  duration (mins) is used only for the "Happening now" indicator.    */
/* ------------------------------------------------------------------ */

const TIMEZONE = "Africa/Lagos";

const services = [
  {
    day: 0,
    dayLabel: "Sunday",
    name: "Sunday Worship",
    description: "A time of worship, the Word and fellowship.",
    sessions: [
      { start: "08:00", duration: 120, label: "First Service" },
      { start: "10:00", duration: 120, label: "Second Service" },
    ],
  },
  {
    day: 3,
    dayLabel: "Wednesday",
    name: "Midweek Service",
    description: "Prayer, reflection and the Word in the middle of the week.",
    sessions: [{ start: "17:30", duration: 90, end: "19:00" }],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");

const toMins = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const fmt = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};

// Current weekday + minutes past midnight in Lagos, regardless of visitor's zone.
function lagosNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { day: days[get("weekday")], mins: Number(get("hour")) * 60 + Number(get("minute")) };
}

// Returns { status: "live" | "next", service, session } for the indicator.
function getNextService() {
  const { day, mins } = lagosNow();
  const nowWeek = day * 1440 + mins;
  const WEEK = 7 * 1440;

  let best = null;
  for (const svc of services) {
    for (const s of svc.sessions) {
      const start = svc.day * 1440 + toMins(s.start);
      const end = start + (s.duration ?? 90);
      if (nowWeek >= start && nowWeek < end) return { status: "live", service: svc, session: s };
      const wait = (start - nowWeek + WEEK) % WEEK;
      if (!best || wait < best.wait) best = { wait, service: svc, session: s };
    }
  }
  return best && { status: "next", service: best.service, session: best.session };
}

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ChurchServices() {
  const [ref, shown] = useReveal();
  const [next, setNext] = useState(null);

  // Computed on the client only (avoids hydration mismatch), refreshed each minute.
  useEffect(() => {
    const update = () => setNext(getNextService());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="service-times"
      aria-labelledby="service-times-title"
      className="bg-white py-24 sm:py-32"
    >
      <ServicesStyles />

      <div ref={ref} className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* ---------- Intro ---------- */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p
              className={cn(
                "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FB000]",
                shown ? "svc-in" : "opacity-0"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
              Join us
            </p>
            <h2
              id="service-times-title"
              className={cn(
                "mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl",
                shown ? "svc-in" : "opacity-0"
              )}
              style={{ "--d": "100ms" }}
            >
              Service times.
            </h2>
            <p
              className={cn(
                "mt-5 max-w-sm text-base leading-relaxed text-slate-500",
                shown ? "svc-in" : "opacity-0"
              )}
              style={{ "--d": "200ms" }}
            >
              Come as you are. There&apos;s a seat saved for you.
            </p>

            {/* Next / live indicator */}
            <div
              className={cn("mt-8 min-h-[2.25rem]", shown ? "svc-in" : "opacity-0")}
              style={{ "--d": "300ms" }}
              aria-live="polite"
            >
              {next && (
                <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
                  <span className="relative flex h-2 w-2">
                    {next.status === "live" && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#98CE2F] opacity-75" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#98CE2F]" />
                  </span>
                  {next.status === "live" ? (
                    <span>
                      <span className="font-semibold text-[#061956]">Happening now</span> ·{" "}
                      {next.service.name}
                    </span>
                  ) : (
                    <span>
                      Next: <span className="font-semibold text-[#061956]">{next.service.dayLabel}</span>{" "}
                      · {fmt(next.session.start)}
                    </span>
                  )}
                </span>
              )}
            </div>

            <Link
              href="/contact-us"
              className={cn(
                "group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-[6px] transition-colors hover:text-[#5E8A00]",
                shown ? "svc-in" : "opacity-0"
              )}
              style={{ "--d": "400ms" }}
            >
              Plan your visit
              <ArrowRightIcon
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* ---------- Schedule ---------- */}
        <ul className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-8">
          {services.map((svc, i) => {
            const isNext = next?.service === svc;
            return (
              <li
                key={svc.name}
                className={cn(
                  "group grid gap-4 py-9 sm:grid-cols-[9rem_1fr_auto] sm:items-start sm:gap-8 sm:py-11",
                  shown ? "svc-in" : "opacity-0"
                )}
                style={{ "--d": `${200 + i * 140}ms` }}
              >
                {/* Day */}
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px w-4 transition-all duration-300 group-hover:w-6",
                      isNext ? "bg-[#98CE2F]" : "bg-slate-300 group-hover:bg-[#98CE2F]"
                    )}
                  />
                  {svc.dayLabel}
                </p>

                {/* Name + description */}
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#061956] sm:text-[1.75rem]">
                    {svc.name}
                  </h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-slate-500">
                    {svc.description}
                  </p>
                </div>

                {/* Times */}
                <dl className="flex gap-8 sm:flex-col sm:gap-4 sm:text-right">
                  {svc.sessions.map((s) => (
                    <div key={s.start}>
                      <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        {s.label || "Time"}
                      </dt>
                      <dd className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-[#061956]">
                        {fmt(s.start)}
                        {s.end && (
                          <span className="text-slate-400"> – {fmt(s.end)}</span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function ServicesStyles() {
  return (
    <style>{`
      .svc-in {
        animation: svcUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes svcUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .svc-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}