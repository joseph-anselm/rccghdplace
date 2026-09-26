"use client";

// components/ThreeColumnSection.js — Get Involved (sits before the footer)

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  HandRaisedIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Content — same three services and routes as the navbar             */
/*  "Get Involved" menu. Every card links to its own page.             */
/* ------------------------------------------------------------------ */

const actions = [
  {
    no: "01",
    tag: "Prayer & guidance",
    title: "Get Counsel",
    description:
      "Need guidance or prayer? Our pastors and counsellors are here to help you navigate life's challenges.",
    cta: "Request Counsel",
    href: "/counsel-request",
    icon: HandRaisedIcon,
  },
  {
    no: "02",
    tag: "Your story matters",
    title: "Testimonies & Feedback",
    description:
      "Share your story or give feedback to help us grow together as a community of faith.",
    cta: "Share Your Story",
    href: "/testimony-feedback",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    no: "03",
    tag: "Grow & serve",
    title: "Jobs & Opportunities",
    description:
      "Discover opportunities, from volunteering and well-paying jobs to career advancement and more.",
    cta: "See Openings",
    href: "/job-opportunities",
    icon: BriefcaseIcon,
  },
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* ------------------------------------------------------------------ */
/*  Card — the whole card is a single link (no nested buttons).        */
/*  On hover it fills navy; the icon and CTA switch to green.          */
/* ------------------------------------------------------------------ */

function ActionCard({ item }) {
  const Icon = item.icon;

  const classes = cn(
    "group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 text-left sm:p-8",
    "transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#061956] hover:bg-[#061956] hover:shadow-[0_30px_60px_-30px_rgba(6,25,86,0.6)]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F6F8FB]"
  );

  const content = (
    <>
      {/* Glow that appears on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#98CE2F]/0 blur-[80px] transition-colors duration-500 group-hover:bg-[#98CE2F]/30"
      />
      {/* Outlined numeral */}
      <span
        aria-hidden="true"
        className="gi-numeral pointer-events-none absolute -right-1 -top-3 select-none text-[6.5rem] font-black leading-none"
      >
        {item.no}
      </span>

      <div className="relative flex items-center justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#98CE2F]/15 text-[#5E8A00] transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-[#98CE2F] group-hover:text-[#061956]">
          <Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>

      <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#7FB000] transition-colors duration-500 group-hover:text-[#98CE2F]">
        {item.tag}
      </p>
      <h3 className="relative mt-2 text-2xl font-extrabold tracking-tight text-[#061956] transition-colors duration-500 group-hover:text-white">
        {item.title}
      </h3>
      <p className="relative mt-3 flex-1 text-base leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-white/70">
        {item.description}
      </p>

      <span className="relative mt-8 flex items-center justify-between border-t border-slate-200 pt-5 transition-colors duration-500 group-hover:border-white/15">
        <span className="text-sm font-bold text-[#061956] transition-colors duration-500 group-hover:text-[#98CE2F]">
          {item.cta}
        </span>
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#061956] transition-all duration-500 group-hover:rotate-45 group-hover:border-[#98CE2F] group-hover:bg-[#98CE2F]"
        >
          <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2.4} />
        </span>
      </span>
    </>
  );

  return (
    <Link href={item.href} className={classes} aria-label={`${item.title}: ${item.cta}`}>
      {content}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function ThreeColumnSection() {
  const [ref, shown] = useReveal();

  return (
    <section
      id="get-involved"
      aria-labelledby="get-involved-title"
      className="relative overflow-hidden bg-[#F6F8FB] py-24 sm:py-32"
    >
      <GetInvolvedStyles />

      <div aria-hidden="true" className="gi-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[#98CE2F]/15 blur-[130px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* ---------- Heading row ---------- */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-[#061956]/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#061956] shadow-sm",
                shown ? "gi-in" : "opacity-0"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
              Get Involved
            </span>
            <h2
              id="get-involved-title"
              className={cn(
                "mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl lg:text-6xl",
                shown ? "gi-in" : "opacity-0"
              )}
              style={{ "--d": "100ms" }}
            >
              We're here <span className="gi-gradient-text">for you.</span>
            </h2>
          </div>
          <p
            className={cn(
              "max-w-md text-base leading-relaxed text-slate-500 sm:text-lg lg:col-span-5 lg:justify-self-end",
              shown ? "gi-in" : "opacity-0"
            )}
            style={{ "--d": "200ms" }}
          >
            Whether you need prayer, have a story to share or are looking for your
            next step, there's a place for you here.
          </p>
        </div>

        {/* ---------- Cards ---------- */}
        <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
          {actions.map((item, i) => (
            <li
              key={item.title}
              className={cn(shown ? "gi-in" : "opacity-0")}
              style={{ "--d": `${250 + i * 120}ms` }}
            >
              <ActionCard item={item} />
            </li>
          ))}
        </ul>

        {/* ---------- Fallback strip ---------- */}
        <div
          className={cn(
            "mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white px-6 py-5 sm:flex-row sm:items-center",
            shown ? "gi-in" : "opacity-0"
          )}
          style={{ "--d": "650ms" }}
        >
          <p className="text-sm text-slate-600 sm:text-base">
            <span className="font-semibold text-[#061956]">Not sure where to start?</span>{" "}
            Reach out and we'll point you in the right direction.
          </p>
          <Link
            href="/contact-us"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-[6px] transition-colors hover:text-[#5E8A00]"
          >
            Contact us
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function GetInvolvedStyles() {
  return (
    <style>{`
      .gi-gradient-text {
        background: linear-gradient(100deg, #7FB000 0%, #98CE2F 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .gi-grid {
        background-image:
          linear-gradient(rgba(6,25,86,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,25,86,0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: radial-gradient(ellipse at top, #000 20%, transparent 70%);
        mask-image: radial-gradient(ellipse at top, #000 20%, transparent 70%);
      }

      .gi-numeral {
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(6,25,86,0.07);
        transition: -webkit-text-stroke-color 0.5s ease;
      }
      .group:hover .gi-numeral { -webkit-text-stroke-color: rgba(255,255,255,0.12); }

      .gi-in {
        animation: giUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes giUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        .gi-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}