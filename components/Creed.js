
// "use client"
// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { HiArrowCircleDown } from 'react-icons/hi';

// const Creed = () => {
//   const router = useRouter();

//   const handleBoxClick = (link) => {
//     router.push(link);
//   };

//   return (
//     <div className='my-20'>
//       <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
//         <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Mission &</span>
//         <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Vision</span>
//       </h2>
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
//         {/* First Row */}
//         <div
//           className="bg-[#BF9930] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
//           onClick={() => handleBoxClick('/box1')}
//         >
//           <div className="flex flex-col items-center">
//             <HiArrowCircleDown className="text-4xl mb-2" />
//             <h2 className="text-2xl font-bold">To make heaven.</h2>
//           </div>
//           <p>To accomplish this objective, holiness will be our lifestyle.</p>
//         </div>
//         <div
//           className="bg-[#98CE33] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
//           onClick={() => handleBoxClick('/box2')}
//         >
//           <div className="flex flex-col items-center">
//             <HiArrowCircleDown className="text-4xl mb-2" />
//             <h2 className="text-2xl font-bold">To take as many people with us.</h2>
//           </div>
//           <p>We will accomplish this by evangelism and discipleship.</p>
//         </div>
//         <div
//           className="bg-[#BF9930] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
//           onClick={() => handleBoxClick('/box3')}
//         >
//           <div className="flex flex-col items-center">
//             <HiArrowCircleDown className="text-4xl mb-2" />
//             <h2 className="text-2xl font-bold">To have a member of RCCG in every family of all nations.</h2>
//           </div>
//           <p>We will accomplish this by planting churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.</p>
//         </div>
//         {/* Second Row */}
//         <div
//           className="bg-[#98CE33] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
//           onClick={() => handleBoxClick('/box4')}
//         >
//           <div className="flex flex-col items-center">
//             <HiArrowCircleDown className="text-4xl mb-2" />
//             <h2 className="text-2xl font-bold">To accomplish No. 1 above, holiness will be our lifestyle.</h2>
//           </div>
//           <p>Holiness will be our lifestyle.</p>
//         </div>
//         <div
//           className="bg-[#BF9930] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
//           onClick={() => handleBoxClick('/box5')}
//         >
//           <div className="flex flex-col items-center">
//             <HiArrowCircleDown className="text-4xl mb-2" />
//             <h2 className="text-2xl font-bold">We will pursue these objectives until every Nation in the world is reached for the Lord Jesus Christ.</h2>
//           </div>
//           <p>Every nation will be reached for the Lord Jesus Christ.</p>
//         </div>
//         <div
//           className="bg-[#98CE33] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
//           onClick={() => handleBoxClick('/box6')}
//         >
//           <div className="flex flex-col items-center">
//             <HiArrowCircleDown className="text-4xl mb-2" />
//             <h2 className="text-2xl font-bold">To plant churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.</h2>
//           </div>
//           <p>Church planting strategy for all cities and towns.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Creed;



"use client";

// components/Creed.js — Mission & Vision

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  SunIcon,
  UserGroupIcon,
  GlobeEuropeAfricaIcon,
  FireIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Content — RCCG Mission & Vision, grouped as goals → how → promise  */
/* ------------------------------------------------------------------ */

const goals = [
  {
    no: "01",
    tag: "Our Destination",
    title: "To make heaven.",
    via: "Through holiness",
    icon: SunIcon,
  },
  {
    no: "02",
    tag: "Our Commission",
    title: "To take as many people as possible with us.",
    via: "Through church planting",
    icon: UserGroupIcon,
  },
  {
    no: "03",
    tag: "Our Reach",
    title: "To have a member of RCCG in every family of all nations.",
    via: "Through church planting",
    icon: GlobeEuropeAfricaIcon,
  },
];

const strategies = [
  {
    for: "Goal 01",
    title: "Holiness will be our lifestyle.",
    body: "To accomplish goal 01, holiness will be our lifestyle.",
    icon: FireIcon,
    stats: null,
  },
  {
    for: "Goals 02 & 03",
    title: "A church close to every home.",
    body: "To accomplish goals 02 and 03, we will plant churches within five minutes walking distance in every city and town of developing countries, and within five minutes driving distance in every city and town of developed countries.",
    icon: MapPinIcon,
    stats: [
      { value: "5 min", label: "walk · developing countries" },
      { value: "5 min", label: "drive · developed countries" },
    ],
  },
];

const COMMITMENT =
  "We will pursue these objectives until every nation in the world is reached for the Lord Jesus Christ.";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");

// Reveal a block once when it scrolls into view.
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

export default function Creed() {
  const [headRef, headIn] = useReveal();
  const [goalsRef, goalsIn] = useReveal();
  const [howRef, howIn] = useReveal();
  const [bannerRef, bannerIn] = useReveal();

  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-title"
      className="relative overflow-hidden bg-[#F6F8FB] py-24 sm:py-32"
    >
      <CreedStyles />

      {/* Background texture */}
      <div aria-hidden="true" className="creed-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-[#98CE2F]/20 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[#DAB24B]/15 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* ---------- Heading ---------- */}
        <div ref={headRef} className="mx-auto max-w-3xl text-center">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-[#061956]/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#061956] shadow-sm",
              headIn ? "creed-in" : "opacity-0"
            )}
            style={{ "--d": "0ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
            Mission &amp; Vision
          </span>
          <h2
            id="mission-vision-title"
            className={cn(
              "mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl lg:text-6xl",
              headIn ? "creed-in" : "opacity-0"
            )}
            style={{ "--d": "120ms" }}
          >
            Why we <span className="creed-gradient-text">exist.</span>
          </h2>
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg",
              headIn ? "creed-in" : "opacity-0"
            )}
            style={{ "--d": "240ms" }}
          >
            Three goals shape everything we do, from Sunday worship to the way we
            live every day.
          </p>
        </div>

        {/* ---------- Goals ---------- */}
        <ol ref={goalsRef} className="mt-16 grid gap-5 md:grid-cols-3 lg:gap-6">
          {goals.map((g, i) => {
            const Icon = g.icon;
            return (
              <li
                key={g.no}
                className={cn(goalsIn ? "creed-in" : "opacity-0")}
                style={{ "--d": `${i * 120}ms` }}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_1px_2px_rgba(6,25,86,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-30px_rgba(6,25,86,0.45)] sm:p-8">
                  {/* Hover gradient edge */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#98CE2F] to-[#DAB24B] transition-transform duration-500 group-hover:scale-x-100"
                  />
                  {/* Big outlined numeral */}
                  <span
                    aria-hidden="true"
                    className="creed-numeral pointer-events-none absolute -right-2 -top-4 select-none text-[7.5rem] font-black leading-none transition-colors duration-500"
                  >
                    {g.no}
                  </span>

                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#061956] text-[#98CE2F] transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-[#98CE2F] group-hover:text-[#061956]">
                    <Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
                  </span>

                  <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#7FB000]">
                    <span className="sr-only">Goal {g.no}: </span>
                    {g.tag}
                  </p>
                  <h3 className="relative mt-2 flex-1 text-2xl font-extrabold leading-snug tracking-tight text-[#061956] lg:text-[1.65rem]">
                    {g.title}
                  </h3>

                  <p className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors duration-500 group-hover:bg-[#98CE2F]/15 group-hover:text-[#061956]">
                    <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                    {g.via}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>

        {/* ---------- How we get there ---------- */}
        <div ref={howRef} className="mt-24">
          <div
            className={cn(
              "flex items-center gap-4",
              howIn ? "creed-in" : "opacity-0"
            )}
          >
            <h3 className="shrink-0 text-sm font-bold uppercase tracking-[0.2em] text-[#061956]">
              How we get there
            </h3>
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-[#061956]/20 to-transparent" />
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-5 lg:gap-6">
            {strategies.map((s, i) => {
              const Icon = s.icon;
              const wide = i === 1;
              return (
                <article
                  key={s.title}
                  className={cn(
                    "relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-9",
                    wide ? "lg:col-span-3" : "lg:col-span-2",
                    howIn ? "creed-in" : "opacity-0"
                  )}
                  style={{ "--d": `${120 + i * 140}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#98CE2F]/15 text-[#5E8A00]">
                      <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                      For {s.for}
                    </span>
                  </div>
                  <h4 className="mt-6 text-2xl font-extrabold tracking-tight text-[#061956] sm:text-3xl">
                    {s.title}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{s.body}</p>

                  {s.stats && (
                    <dl className="mt-7 grid grid-cols-2 gap-3">
                      {s.stats.map((st) => (
                        <div
                          key={st.label}
                          className="rounded-2xl bg-[#061956] px-5 py-4 text-white"
                        >
                          <dt className="sr-only">{st.label}</dt>
                          <dd>
                            <span className="block text-3xl font-black tracking-tight text-[#98CE2F]">
                              {st.value}
                            </span>
                            <span className="mt-1 block text-xs font-medium leading-snug text-white/70">
                              {st.label}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* ---------- Commitment banner ---------- */}
        <div
          ref={bannerRef}
          className={cn(
            "relative mt-6 overflow-hidden rounded-3xl bg-[#061956] px-7 py-12 sm:px-12 sm:py-14 lg:mt-8",
            bannerIn ? "creed-in" : "opacity-0"
          )}
        >
          <div aria-hidden="true" className="creed-glow pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#98CE2F]/30 blur-[100px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#DAB24B]/20 blur-[100px]" />
          <GlobeEuropeAfricaIcon
            aria-hidden="true"
            strokeWidth={0.6}
            className="creed-spin pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 text-white/[0.06] sm:h-96 sm:w-96"
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]">
                Our commitment
              </p>
              <blockquote className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
                {COMMITMENT}
              </blockquote>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/who-we-are"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#98CE2F] px-6 py-3.5 text-sm font-bold text-[#061956] shadow-[0_10px_30px_-10px_rgba(152,206,47,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9DD3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#061956]"
              >
                Discover who we are
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Visit us this Sunday
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function CreedStyles() {
  return (
    <style>{`
      .creed-gradient-text {
        background: linear-gradient(100deg, #7FB000 0%, #98CE2F 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .creed-grid {
        background-image:
          linear-gradient(rgba(6,25,86,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,25,86,0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
        mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
      }

      .creed-numeral {
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(6,25,86,0.08);
      }
      .group:hover .creed-numeral { -webkit-text-stroke-color: rgba(152,206,47,0.45); }

      .creed-in {
        animation: creedUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes creedUp {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .creed-glow { animation: creedGlow 6s ease-in-out infinite alternate; }
      @keyframes creedGlow {
        from { opacity: 0.6; transform: scale(1); }
        to   { opacity: 1;   transform: scale(1.15); }
      }

      .creed-spin { animation: creedSpin 60s linear infinite; }
      @keyframes creedSpin { to { transform: rotate(360deg); } }

      @media (prefers-reduced-motion: reduce) {
        .creed-in { animation-duration: 0.01ms; }
        .creed-glow, .creed-spin { animation: none; }
      }
    `}</style>
  );
}