// // components/AboutUsSection.js
// import React from 'react';
// import Image from 'next/image';

// const AboutUsSection = () => {
//   return (
//     <section className=" max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-16">
//       <div className="container mx-auto flex flex-col md:flex-row items-center md:space-x-8 space-y-8 md:space-y-0">
//         <div className="md:hidden">
//           <Image
//             src="/images/psd.png" // Replace with the actual path to the pastor's image
//             alt="Pastor"
//             width={500}
//             height={500}
//             className="rounded-tl-[50px] rounded-br-[50px] object-cover"
//           />
//         </div>
//         <div className="md:w-1/2">
//         <h3 className="text-3xl font-handwriting text-[#595916] mb-4">Welcome to RCCG - His Dwelling Place</h3>

//           <p className="text-lg text-gray-700 mb-4">
//           Hey there, and welcome to HDPLACE! We’re absolutely thrilled to have you with us. Whether you’re here for the worship, the community, or just the snacks, we’ve got you covered. 
//           </p>
//           <p className="text-lg text-gray-700 mb-4">
//           Our mission?
//           To raise kingdom role models who will dominate all spheres of influence

//           </p>
//           <p className="text-lg text-gray-700 mb-4">
//           At HDPLACE, we’re all about creating a supportive and inclusive vibe where everyone can grow in their spiritual journey—and have some fun while we’re at it. We believe church should be a place where you feel right at home, and we’re dedicated to making sure you do.  </p>
//             <p className="text-lg text-gray-700 mb-4">
//             Don’t be shy—jump right in and get involved! Whether you’ve got a knack for singing, a talent for organizing, or just love meeting new people, there’s a place for you here. We’re a big family, and we can’t wait to see how you’ll add to the awesomeness.

//             So, sit back, relax, and let’s make some incredible memories together. And remember, at HDPLACE, you’re not just a visitor—you’re family. Let’s grow, laugh, and spread some love together!


//           </p>
//         <p className="text-xl font-handwriting text-[#36360e]">Pastor Sam & Sade Doh<br></br>
//           Lead Pastor, RCCG, HIS DWELLING PLACE, MEGA YOUTH CHURCH.</p>
//         </div>
//         <div className="hidden md:block md:w-1/2">
//           <Image
//             src="/images/psd.png" // Replace with the actual path to the pastor's image
//             alt="Pastor"
//             width={500}
//             height={500}
//             className="rounded-tl-[50px] rounded-br-[50px] object-cover"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUsSection;



"use client";

// components/AboutUsSection.js — welcome from the Lead Pastors (Who We Are page)

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const PASTORS_IMAGE = "/images/psd.png";
const PASTORS_NAME = "Pastors Sam & Sade Doh";
const PASTORS_ROLE = "Lead Pastors, RCCG His Dwelling Place — Mega Youth Church";

const VISION = "To raise kingdom role models who will dominate all spheres of influence.";

const LETTER = [
  "Hey there, and welcome to HDPlace! We're absolutely thrilled to have you with us. Whether you're here for the worship, the community or just the snacks, we've got you covered.",
  "At HDPlace, we're all about creating a supportive and inclusive space where everyone can grow in their spiritual journey — and have some fun while we're at it. We believe church should be a place where you feel right at home, and we're dedicated to making sure you do.",
  "Don't be shy — jump right in and get involved! Whether you've got a knack for singing, a talent for organising or you just love meeting new people, there's a place for you here. We're a big family, and we can't wait to see how you'll add to the awesomeness.",
  "So sit back, relax and let's make some incredible memories together. Remember, at HDPlace you're not just a visitor — you're family. Let's grow, laugh and spread some love together!",
];

const HIGHLIGHTS = [
  { value: "Youth", label: "A mega youth church" },
  { value: "Family", label: "Everyone belongs here" },
  { value: "Purpose", label: "Raising role models" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");

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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AboutUsSection() {
  const [ref, shown] = useReveal();

  return (
    <section
      id="welcome"
      aria-labelledby="welcome-title"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <AboutStyles />

      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[#98CE2F]/10 blur-[130px]" />

      <div
        ref={ref}
        className="relative mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16"
      >
        {/* ---------- Portrait ---------- */}
        <div
          className={cn(
            "mx-auto w-full max-w-md lg:sticky lg:top-32 lg:col-span-5 lg:max-w-none",
            shown ? "about-in" : "opacity-0"
          )}
        >
          <div className="relative">
            {/* Offset brand frame behind the photo */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] rounded-tl-[5rem] border-2 border-[#98CE2F]/60 sm:-bottom-5 sm:-right-5"
            />
            <div
              aria-hidden="true"
              className="about-dots absolute -left-5 -top-5 h-28 w-28 sm:-left-6 sm:-top-6"
            />

            {/* Fixed-ratio frame: any photo size fits without distorting the layout */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tl-[5rem] bg-[#061956] shadow-[0_40px_80px_-40px_rgba(6,25,86,0.55)]">
              <Image
                src={PASTORS_IMAGE}
                alt={PASTORS_NAME}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 90vw"
                className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#061956]/90 via-[#061956]/30 to-transparent" />

              {/* Name card on the photo */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#98CE2F]">
                  Lead Pastors
                </p>
                <p className="mt-1 text-lg font-extrabold tracking-tight sm:text-xl">{PASTORS_NAME}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Letter ---------- */}
        <div className="lg:col-span-7">
          <p
            className={cn(
              "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FB000]",
              shown ? "about-in" : "opacity-0"
            )}
            style={{ "--d": "100ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
            A word from our pastors
          </p>

          <h2
            id="welcome-title"
            className={cn(
              "mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl lg:text-[3.4rem]",
              shown ? "about-in" : "opacity-0"
            )}
            style={{ "--d": "180ms" }}
          >
            Welcome to <span className="about-gradient-text">His Dwelling Place.</span>
          </h2>

          {/* First paragraph as a larger lead-in */}
          <p
            className={cn(
              "mt-8 text-xl leading-relaxed text-slate-700 sm:text-[1.35rem]",
              shown ? "about-in" : "opacity-0"
            )}
            style={{ "--d": "260ms" }}
          >
            {LETTER[0]}
          </p>

          {/* Vision pull-quote */}
          <figure
            className={cn(
              "relative my-10 overflow-hidden rounded-3xl bg-[#061956] px-7 py-8 sm:px-10 sm:py-10",
              shown ? "about-in" : "opacity-0"
            )}
            style={{ "--d": "340ms" }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#98CE2F]/25 blur-[80px]" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 right-6 select-none font-serif text-[9rem] leading-none text-white/[0.07]"
            >
              &rdquo;
            </span>
            <figcaption className="relative text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]">
              Our vision
            </figcaption>
            <blockquote className="relative mt-3 text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl">
              {VISION}
            </blockquote>
          </figure>

          {/* Remaining paragraphs */}
          <div className="space-y-6">
            {LETTER.slice(1).map((para, i) => (
              <p
                key={i}
                className={cn(
                  "text-lg leading-[1.8] text-slate-600",
                  shown ? "about-in" : "opacity-0"
                )}
                style={{ "--d": `${420 + i * 80}ms` }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div
            className={cn(
              "mt-10 flex items-center gap-5 border-t border-slate-200 pt-8",
              shown ? "about-in" : "opacity-0"
            )}
            style={{ "--d": "700ms" }}
          >
            <span aria-hidden="true" className="h-12 w-1 shrink-0 rounded-full bg-gradient-to-b from-[#98CE2F] to-[#DAB24B]" />
            <div>
              <p className="font-handwriting text-3xl text-[#061956]">{PASTORS_NAME}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{PASTORS_ROLE}</p>
            </div>
          </div>

          {/* Highlights */}
          <dl
            className={cn(
              "mt-10 grid grid-cols-3 gap-3",
              shown ? "about-in" : "opacity-0"
            )}
            style={{ "--d": "780ms" }}
          >
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.value}
                className="rounded-2xl border border-slate-200/80 bg-[#F6F8FB] px-4 py-5 transition-colors duration-300 hover:border-[#98CE2F]/60 hover:bg-[#98CE2F]/[0.07]"
              >
                <dt className="sr-only">{h.label}</dt>
                <dd>
                  <span className="block text-lg font-extrabold tracking-tight text-[#061956] sm:text-xl">
                    {h.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-slate-500 sm:text-sm">
                    {h.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          {/* CTAs */}
          <div
            className={cn(
              "mt-10 flex flex-col gap-3 sm:flex-row",
              shown ? "about-in" : "opacity-0"
            )}
            style={{ "--d": "860ms" }}
          >
            <Link
              href="/contact-us"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#98CE2F] px-7 py-3.5 text-sm font-bold text-[#061956] shadow-[0_10px_30px_-10px_rgba(152,206,47,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9DD3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#061956] focus-visible:ring-offset-2"
            >
              Plan your visit
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
            </Link>
            <Link
              href="/program-events"
              className="inline-flex items-center justify-center rounded-full border border-[#061956]/15 px-7 py-3.5 text-sm font-semibold text-[#061956] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#061956] hover:bg-[#061956] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
            >
              See what&apos;s happening
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function AboutStyles() {
  return (
    <style>{`
      .about-gradient-text {
        background: linear-gradient(100deg, #7FB000 0%, #98CE2F 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .about-dots {
        background-image: radial-gradient(rgba(6,25,86,0.25) 1.5px, transparent 1.5px);
        background-size: 14px 14px;
      }

      .about-in {
        animation: aboutUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes aboutUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        .about-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}