// "use client";

// import React, { useState, useEffect } from "react";
// import { client } from "@/sanityClient";
// import { Disclosure } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import Link from "next/link";


// const JobsPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 5;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const query = `*[_type == "jobListing"] | order(_createdAt desc) {
//           _id,
//           title,
//           description,
//           datePosted,
//           contactDetails,
//           location,
//           additionalDetails
//         }`;
//         const data = await client.fetch(query);
//         setJobs(data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   // Pagination logic
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <section className="bg-white py-8">
//       <div className="container max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-10">Job Opportunities</h2>
//         {currentJobs.length > 0 ? (
//           <div className="space-y-4">
//             {currentJobs.map((job) => (
//               <Disclosure key={job._id}>
//                 {({ open }) => (
//                   <>
//                     <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
//                       <span>{job.title}</span>
//                       <ChevronDownIcon
//                         className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`}
//                       />
//                     </Disclosure.Button>
//                     <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
//                       <p><strong>Date Posted:</strong> {new Date(job.datePosted).toLocaleDateString()}</p>
//                       <p><strong>Location:</strong> {job.location}</p>
//                       <p><strong>Contact Details:</strong> {job.contactDetails}</p>
//                       <p><strong>Description:</strong> {job.description}</p>
//                       {job.additionalDetails && (
//                         <p><strong>Additional Details:</strong> {job.additionalDetails}</p>
//                       )}
//                     </Disclosure.Panel>
//                   </>
//                 )}
//               </Disclosure>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No job opportunities found.</div>
//         )}
//         {/* Pagination */}
//         <div className="mt-8 flex justify-center">
//           <nav className="inline-flex">
//             {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => paginate(i + 1)}
//                 className={`px-4 py-2 mx-1 rounded-md ${
//                   currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobsPage;



"use client";

// components/JobsPage.js — Jobs & Opportunities

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShieldExclamationIcon,
  HandRaisedIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  LinkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { client } from "@/sanityClient";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const PAGE_SIZE = 8;
const NEW_DAYS = 7; // "New" badge for jobs posted within this many days

const JOBS_QUERY = `*[_type == "jobListing"] | order(coalesce(datePosted, _createdAt) desc){
  _id,
  title,
  description,
  "datePosted": coalesce(datePosted, _createdAt),
  contactDetails,
  location,
  additionalDetails
}`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const norm = (s = "") => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Fields may be plain text or Sanity rich text — flatten either to a string.
const toText = (v) => {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v))
    return v
      .map((b) => (b?.children || []).map((c) => c.text || "").join(""))
      .filter(Boolean)
      .join("\n\n");
  return String(v);
};

const formatDate = (iso) =>
  iso ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso)) : "";

const daysAgo = (iso) => Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
const postedLabel = (iso) => {
  if (!iso) return "";
  const d = daysAgo(iso);
  if (d <= 0) return "Posted today";
  if (d === 1) return "Posted yesterday";
  if (d < 30) return `Posted ${d} days ago`;
  return `Posted ${formatDate(iso)}`;
};

// Pull emails / phone numbers out of free-text contact details → one-tap actions
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_RE = /(?:\+?234|0)[\s-]?[789][01]\d[\s-]?\d{3}[\s-]?\d{4}/g;
const toIntl = (p) => {
  const d = p.replace(/\D/g, "");
  return d.startsWith("234") ? d : d.startsWith("0") ? `234${d.slice(1)}` : d;
};
function contactsFrom(text) {
  const t = toText(text);
  return {
    emails: [...new Set(t.match(EMAIL_RE) || [])],
    phones: [...new Set((t.match(PHONE_RE) || []).map((p) => p.trim()))],
  };
}

/* ------------------------------------------------------------------ */
/*  Job card                                                           */
/* ------------------------------------------------------------------ */

function JobCard({ job, open, onToggle }) {
  const [copied, setCopied] = useState(false);
  const description = toText(job.description);
  const extra = toText(job.additionalDetails);
  const contactText = toText(job.contactDetails);
  const { emails, phones } = useMemo(() => contactsFrom(job.contactDetails), [job.contactDetails]);
  const isNew = job.datePosted && daysAgo(job.datePosted) < NEW_DAYS;
  const panelId = `job-panel-${job._id}`;

  const shareLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#job-${job._id}`;
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: job.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <article
      id={`job-${job._id}`}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-3xl border bg-white transition-all duration-300",
        open ? "border-[#061956] shadow-[0_24px_50px_-30px_rgba(6,25,86,0.5)]" : "border-slate-200/80 hover:border-slate-300"
      )}
    >
      {/* Summary row */}
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#98CE2F] sm:items-center sm:p-6"
        >
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300",
              open ? "bg-[#98CE2F] text-[#061956]" : "bg-[#061956]/[0.06] text-[#061956]"
            )}
          >
            <BriefcaseIcon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-bold leading-snug text-[#061956] sm:text-xl">{job.title}</span>
              {isNew && (
                <span className="rounded-full bg-[#98CE2F] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#061956]">
                  New
                </span>
              )}
            </span>
            <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              {job.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {job.location}
                </span>
              )}
              {job.datePosted && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDaysIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  <time dateTime={job.datePosted} title={formatDate(job.datePosted)}>
                    {postedLabel(job.datePosted)}
                  </time>
                </span>
              )}
            </span>
            {!open && description && (
              <span className="mt-2 line-clamp-1 hidden text-sm text-slate-500 sm:block">{description}</span>
            )}
          </span>
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
              open ? "rotate-180 border-[#061956] bg-[#061956] text-white" : "border-slate-200 text-slate-500"
            )}
            aria-hidden="true"
          >
            <ChevronDownIcon className="h-5 w-5" strokeWidth={2.2} />
          </span>
        </button>
      </h3>

      {/* Details */}
      <div
        id={panelId}
        role="region"
        aria-label={`${job.title} details`}
        className={cn("grid transition-all duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
      >
        <div className="min-h-0">
          <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6 sm:pl-[5.5rem]">
            {description && (
              <section>
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">About the role</h4>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">{description}</p>
              </section>
            )}

            {extra && (
              <section className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Additional details</h4>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">{extra}</p>
              </section>
            )}

            {contactText && (
              <section className="mt-6 rounded-2xl bg-[#F6F8FB] p-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">How to apply</h4>
                <p className="mt-2 whitespace-pre-line break-words text-[#061956]">{contactText}</p>

                {(emails.length > 0 || phones.length > 0) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {emails.map((e) => (
                      <a
                        key={e}
                        href={`mailto:${e}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#061956] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0a2472]"
                      >
                        <EnvelopeIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                        Apply by email
                      </a>
                    ))}
                    {phones.map((p) => (
                      <span key={p} className="contents">
                        <a
                          href={`https://wa.me/${toIntl(p)}?text=${encodeURIComponent(`Hello, I'm interested in the "${job.title}" opportunity I saw on the HDP website.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fb857]"
                        >
                          <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                          WhatsApp
                        </a>
                        <a
                          href={`tel:+${toIntl(p)}`}
                          className="inline-flex items-center gap-2 rounded-full border border-[#061956]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#061956] transition-colors hover:border-[#061956]"
                        >
                          <PhoneIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                          Call
                        </a>
                      </span>
                    ))}
                  </div>
                )}
              </section>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={shareLink}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#061956]"
              >
                {copied ? <CheckIcon className="h-4 w-4" strokeWidth={2.4} /> : <LinkIcon className="h-4 w-4" strokeWidth={2} />}
                {copied ? "Link copied" : "Share this job"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [state, setState] = useState("loading"); // loading | ready | error
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [openId, setOpenId] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const searchRef = useRef(null);

  const load = async () => {
    setState("loading");
    try {
      const data = await client.fetch(JOBS_QUERY);
      const list = (data || []).filter((j) => j?.title);
      setJobs(list);
      setState("ready");

      // Open a job straight away when arriving from a shared link (#job-<id>)
      const hash = window.location.hash.replace("#job-", "");
      if (hash && list.some((j) => j._id === hash)) {
        setOpenId(hash);
        const idx = list.findIndex((j) => j._id === hash);
        if (idx >= PAGE_SIZE) setVisible(idx + 1);
        setTimeout(() => document.getElementById(`job-${hash}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setState("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const locations = useMemo(() => {
    const counts = {};
    jobs.forEach((j) => {
      const l = (j.location || "").trim();
      if (l) counts[l] = (counts[l] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([l]) => l);
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return jobs.filter((j) => {
      if (location && (j.location || "").trim() !== location) return false;
      if (!q) return true;
      return norm(`${j.title} ${toText(j.description)} ${j.location || ""} ${toText(j.additionalDetails)}`).includes(q);
    });
  }, [jobs, query, location]);

  const shown = filtered.slice(0, visible);
  const filtering = Boolean(query.trim() || location);

  const clearAll = () => {
    setQuery("");
    setLocation("");
    setVisible(PAGE_SIZE);
  };

  return (
    <section aria-label="Job opportunities" className="bg-[#F6F8FB] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* ---------- Listings ---------- */}
        <div className="lg:col-span-8">
          {/* Search + filters */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <label htmlFor="job-search" className="sr-only">Search opportunities</label>
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" strokeWidth={2} aria-hidden="true" />
              <input
                ref={searchRef}
                id="job-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(PAGE_SIZE);
                }}
                placeholder="Search by role, skill or keyword…"
                autoComplete="off"
                className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-base text-[#061956] placeholder:text-slate-400 transition-colors focus:border-[#98CE2F] focus:outline-none focus:ring-4 focus:ring-[#98CE2F]/15 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    searchRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-[#061956]"
                >
                  <XMarkIcon className="h-4 w-4" strokeWidth={2.4} />
                </button>
              )}
            </div>

            {locations.length > 1 && (
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]" role="group" aria-label="Filter by location">
                {["", ...locations].map((l) => (
                  <button
                    key={l || "all"}
                    type="button"
                    aria-pressed={location === l}
                    onClick={() => {
                      setLocation(l);
                      setVisible(PAGE_SIZE);
                    }}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                      location === l ? "border-[#061956] bg-[#061956] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-[#061956]/30 hover:text-[#061956]"
                    )}
                  >
                    {l && <MapPinIcon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />}
                    {l || "All locations"}
                  </button>
                ))}
              </div>
            )}

            {state === "ready" && jobs.length > 0 && (
              <p className="text-sm text-slate-500" aria-live="polite">
                <span className="font-semibold text-[#061956]">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "opportunity" : "opportunities"}
                {filtering && (
                  <>
                    {" "}·{" "}
                    <button type="button" onClick={clearAll} className="font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-4">
                      Clear filters
                    </button>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Loading */}
          {state === "loading" && (
            <div className="mt-6 space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex animate-pulse items-center gap-4 rounded-3xl bg-white p-6">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-1/2 rounded bg-slate-100" />
                    <div className="h-3 w-1/3 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {state === "error" && (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <p className="font-semibold text-[#061956]">We couldn't load opportunities right now.</p>
              <button type="button" onClick={load} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#061956] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2472]">
                <ArrowPathIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                Try again
              </button>
            </div>
          )}

          {/* Empty */}
          {state === "ready" && filtered.length === 0 && (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <BriefcaseIcon className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-4 text-lg font-semibold text-[#061956]">
                {filtering ? "No opportunities match your search" : "No open opportunities right now"}
              </p>
              <p className="mt-1 text-slate-500">
                {filtering ? "Try a different keyword or location." : "New roles are shared here regularly — check back soon."}
              </p>
              {filtering && (
                <button type="button" onClick={clearAll} className="mt-6 rounded-full border border-[#061956]/20 px-6 py-3 text-sm font-semibold text-[#061956] hover:bg-slate-50">
                  View all opportunities
                </button>
              )}
            </div>
          )}

          {/* List */}
          {state === "ready" && shown.length > 0 && (
            <>
              <ul className="mt-6 space-y-3">
                {shown.map((job) => (
                  <li key={job._id}>
                    <JobCard job={job} open={openId === job._id} onToggle={() => setOpenId((id) => (id === job._id ? null : job._id))} />
                  </li>
                ))}
              </ul>
              {filtered.length > shown.length && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-full bg-[#061956] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0a2472]"
                  >
                    Load more opportunities
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Volunteer */}
            <div className="relative overflow-hidden rounded-3xl bg-[#061956] p-7 text-white">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#98CE2F]/25 blur-[80px]" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#98CE2F] text-[#061956]">
                <HandRaisedIcon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h2 className="relative mt-5 text-2xl font-extrabold tracking-tight">Want to serve?</h2>
              <p className="relative mt-2 text-sm leading-relaxed text-white/70">
                Volunteer in one of our departments — music, media, children, hospitality and more.
              </p>
              <Link
                href="/who-we-are#departments"
                className="group relative mt-6 inline-flex items-center gap-2 rounded-full bg-[#98CE2F] px-5 py-3 text-sm font-bold text-[#061956] transition-colors hover:bg-[#A9DD3F]"
              >
                Explore departments
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </div>

            {/* Share an opportunity */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7">
              <h2 className="text-lg font-bold text-[#061956]">Hiring? Share an opportunity</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Members and partners can send openings to the church team to be shared here.
              </p>
              <Link
                href={`/contact-us?subject=${encodeURIComponent("Sharing a job opportunity")}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-[6px] hover:text-[#5E8A00]"
              >
                Submit an opening
                <ArrowRightIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>

            {/* Safety */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7">
              <ShieldExclamationIcon className="h-7 w-7 text-amber-600" strokeWidth={1.6} aria-hidden="true" />
              <h2 className="mt-3 font-bold text-[#061956]">Stay safe</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Genuine employers never ask for money to apply or secure a job. If anyone requests a fee, please report it to the church office.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}