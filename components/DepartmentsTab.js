"use client";

// components/DepartmentsTabs.js — Church departments (Who We Are page)

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MusicalNoteIcon,
  CameraIcon,
  BanknotesIcon,
  SpeakerWaveIcon,
  TruckIcon,
  FaceSmileIcon,
  AcademicCapIcon,
  FireIcon,
  HeartIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/*  `units` shows as chips. Add/remove departments freely — the tabs,  */
/*  numbering and mobile accordion all update automatically.           */
/* ------------------------------------------------------------------ */

const departments = [
  {
    name: "Music",
    head: "Precious Timekoru",
    icon: MusicalNoteIcon,
    description:
      "By the agency of the Holy Spirit, we create an atmosphere of true worship, lead and teach congregations new and seasoned songs, and select songs that align with the sermon themes.",
  },
  {
    name: "Media",
    head: "Eluyode Victor A.",
    icon: CameraIcon,
    description:
      "We project the church across the media space through three main units.",
    units: ["Photography & Graphics Design", "Content Creation", "Videography"],
  },
  {
    name: "Finance & Internal Control",
    head: "Pastor Wale Adeneye",
    icon: BanknotesIcon,
    description: "The department is made up of four units that keep the church running smoothly and welcomingly.",
    units: ["Finance", "Ushering", "Greeters", "Protocols"],
  },
  {
    name: "Sounds & Technical",
    head: "Adams Moses",
    icon: SpeakerWaveIcon,
    description:
      "We are responsible for sound management, sound equipment purchases and other related technical assignments.",
  },
  {
    name: "Transport & Logistics",
    head: "Godbless Emmanuel",
    icon: TruckIcon,
    description:
      "We transport members from different locations to church and make sure everyone arrives on time for services.",
  },
  {
    name: "Children Affairs",
    head: "Otame Kehinde",
    icon: FaceSmileIcon,
    description: "Raising God-fearing children who will dominate in all spheres of influence.",
  },
  {
    name: "Training",
    head: "Deacon Sadiq Isaiah",
    icon: AcademicCapIcon,
    description:
      "Our primary assignment is ministering the Word to individuals, nurturing them from the grassroots to every level of discipleship and maturity, and developing a deliberate strategy to strengthen the spiritual quality of our members.",
  },
  {
    name: "Establishment",
    head: "Mayowa Osibeluwo",
    icon: FireIcon,
    description:
      "The prayer hub raises incense and intercessory cries for the prosperity and advancement of the church. The follow-up unit contacts first-time worshippers and converts during services and evangelism.",
    units: ["Prayer Hub", "Follow-up"],
  },
  {
    name: "Welfare & Hospitality",
    head: "Pastor (Mrs.) Sade Doh",
    icon: HeartIcon,
    description: "We look after the general welfare of first-timers, members and workers in the church.",
  },
];

const JOIN_HREF = (name) => `/contact-us?subject=${encodeURIComponent(`Joining the ${name} Department`)}`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const pad = (n) => String(n).padStart(2, "0");
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* ------------------------------------------------------------------ */
/*  Detail content (shared by the desktop panel and mobile accordion)  */
/* ------------------------------------------------------------------ */

function DepartmentDetail({ dept, compact }) {
  return (
    <>
      <p className={cn("leading-relaxed", compact ? "text-base text-slate-600" : "text-lg text-white/75")}>
        {dept.description}
      </p>

      {dept.units?.length > 0 && (
        <div className="mt-6">
          <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", compact ? "text-slate-400" : "text-white/50")}>
            Units
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dept.units.map((u) => (
              <li
                key={u}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-semibold",
                  compact ? "bg-[#98CE2F]/15 text-[#061956]" : "border border-white/15 bg-white/10 text-white"
                )}
              >
                {u}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className={cn(
          "mt-8 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between",
          compact ? "border-slate-200" : "border-white/10"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
              compact ? "bg-[#061956] text-[#98CE2F]" : "bg-[#98CE2F] text-[#061956]"
            )}
          >
            <UserIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </span>
          <div>
            <p className={cn("text-xs", compact ? "text-slate-400" : "text-white/50")}>Head of department</p>
            <p className={cn("font-bold", compact ? "text-[#061956]" : "text-white")}>{dept.head}</p>
          </div>
        </div>

        <Link
          href={JOIN_HREF(dept.name)}
          className={cn(
            "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2",
            compact
              ? "bg-[#061956] text-white hover:bg-[#0a2472]"
              : "bg-[#98CE2F] text-[#061956] hover:bg-[#A9DD3F] focus-visible:ring-offset-[#061956]"
          )}
        >
          Join this department
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DepartmentsTabs() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState(0); // -1 = all closed
  const tabRefs = useRef([]);
  const [ref, shown] = useReveal();

  const dept = departments[active];
  const Icon = dept.icon;

  // Arrow keys / Home / End move between tabs (standard tab pattern)
  const onKeyDown = (e) => {
    const last = departments.length - 1;
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section
      id="departments"
      aria-labelledby="departments-title"
      className="relative overflow-hidden bg-[#F6F8FB] py-24 sm:py-32"
    >
      <DeptStyles />
      <div aria-hidden="true" className="dept-grid pointer-events-none absolute inset-0" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* ---------- Heading ---------- */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-[#061956]/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#061956] shadow-sm",
                shown ? "dept-in" : "opacity-0"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
              Our departments
            </span>
            <h2
              id="departments-title"
              className={cn(
                "mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl lg:text-6xl",
                shown ? "dept-in" : "opacity-0"
              )}
              style={{ "--d": "100ms" }}
            >
              Find your <span className="dept-gradient-text">place to serve.</span>
            </h2>
          </div>
          <p
            className={cn(
              "max-w-md text-base leading-relaxed text-slate-500 sm:text-lg lg:col-span-5 lg:justify-self-end",
              shown ? "dept-in" : "opacity-0"
            )}
            style={{ "--d": "200ms" }}
          >
            {departments.length} departments, one family. Explore where your gifts fit and
            join a team that&apos;s building something that lasts.
          </p>
        </div>

        {/* ---------- Desktop: vertical tabs + detail panel ---------- */}
        <div
          className={cn("mt-14 hidden gap-6 lg:grid lg:grid-cols-12", shown ? "dept-in" : "opacity-0")}
          style={{ "--d": "300ms" }}
        >
          <div
            role="tablist"
            aria-label="Church departments"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex flex-col gap-1.5 lg:col-span-5"
          >
            {departments.map((d, i) => {
              const selected = i === active;
              const TabIcon = d.icon;
              return (
                <button
                  key={d.name}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`dept-tab-${slug(d.name)}`}
                  aria-selected={selected}
                  aria-controls="dept-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F8FB]",
                    selected
                      ? "border-[#061956] bg-white shadow-[0_18px_40px_-24px_rgba(6,25,86,0.5)]"
                      : "border-transparent hover:border-slate-200 hover:bg-white/70"
                  )}
                >
                  <span
                    className={cn(
                      "w-6 shrink-0 font-mono text-xs tabular-nums transition-colors",
                      selected ? "text-[#7FB000]" : "text-slate-400"
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                      selected
                        ? "bg-[#98CE2F] text-[#061956]"
                        : "bg-slate-200/60 text-slate-500 group-hover:bg-[#98CE2F]/15 group-hover:text-[#5E8A00]"
                    )}
                  >
                    <TabIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className={cn("flex-1 font-semibold transition-colors", selected ? "text-[#061956]" : "text-slate-600 group-hover:text-[#061956]")}>
                    {d.name}
                  </span>
                  <ArrowRightIcon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      selected ? "translate-x-0 text-[#061956] opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    )}
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div
              id="dept-panel"
              role="tabpanel"
              aria-labelledby={`dept-tab-${slug(dept.name)}`}
              tabIndex={0}
              className="sticky top-32 overflow-hidden rounded-3xl bg-[#061956] p-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#98CE2F]/25 blur-[100px]" />
              <Icon
                aria-hidden="true"
                strokeWidth={0.6}
                className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 text-white/[0.05]"
              />

              {/* key forces the fade-in to replay on each switch */}
              <div key={dept.name} className="dept-swap relative">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#98CE2F] text-[#061956]">
                    <Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm tabular-nums text-white/40">
                    {pad(active + 1)} / {pad(departments.length)}
                  </span>
                </div>
                <h3 className="mt-7 text-3xl font-extrabold tracking-tight text-white xl:text-4xl">
                  {dept.name} <span className="text-white/40">Department</span>
                </h3>
                <div className="mt-4">
                  <DepartmentDetail dept={dept} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Mobile & tablet: accordion ---------- */}
        <ul
          className={cn("mt-12 space-y-3 lg:hidden", shown ? "dept-in" : "opacity-0")}
          style={{ "--d": "300ms" }}
        >
          {departments.map((d, i) => {
            const open = openMobile === i;
            const ItemIcon = d.icon;
            const id = slug(d.name);
            return (
              <li
                key={d.name}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                  open ? "border-[#061956] shadow-[0_18px_40px_-24px_rgba(6,25,86,0.5)]" : "border-slate-200/80"
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`dept-m-${id}`}
                    id={`dept-m-btn-${id}`}
                    onClick={() => setOpenMobile(open ? -1 : i)}
                    className="flex w-full items-center gap-4 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#98CE2F]"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                        open ? "bg-[#98CE2F] text-[#061956]" : "bg-slate-100 text-slate-500"
                      )}
                    >
                      <ItemIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-bold text-[#061956]">{d.name}</span>
                      <span className="block text-xs text-slate-500">{d.head}</span>
                    </span>
                    <ChevronDownIcon
                      className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300", open && "rotate-180 text-[#061956]")}
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`dept-m-${id}`}
                  role="region"
                  aria-labelledby={`dept-m-btn-${id}`}
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="min-h-0">
                    <div className="px-5 pb-6 pt-1">
                      <DepartmentDetail dept={d} compact />
                    </div>
                  </div>
                </div>
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

function DeptStyles() {
  return (
    <style>{`
      .dept-gradient-text {
        background: linear-gradient(100deg, #7FB000 0%, #98CE2F 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .dept-grid {
        background-image:
          linear-gradient(rgba(6,25,86,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,25,86,0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: radial-gradient(ellipse at top, #000 20%, transparent 70%);
        mask-image: radial-gradient(ellipse at top, #000 20%, transparent 70%);
      }

      .dept-in {
        animation: deptUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes deptUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .dept-swap { animation: deptSwap 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
      @keyframes deptSwap {
        from { opacity: 0; transform: translateX(16px); }
        to   { opacity: 1; transform: translateX(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        .dept-in, .dept-swap { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}