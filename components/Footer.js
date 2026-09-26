// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { AiOutlineMail } from 'react-icons/ai';
// import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube, FaSpotify } from 'react-icons/fa';
// import { fetchLatestBlogs } from '@/sanityClient';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';

// const Footer = () => {
//   const [email, setEmail] = useState('');
//   const [latestBlogs, setLatestBlogs] = useState([]);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const getLatestBlogs = async () => {
//       const blogs = await fetchLatestBlogs();
//       setLatestBlogs(blogs);
//     };
//     getLatestBlogs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();


// //  Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     setError('');

//     try {
//       const response = await fetch('/api/subscribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to subscribe');
//       }

//       setIsSubscribed(true);
//       setIsLightboxOpen(true);
//       setEmail('');
//     } catch (error) {
//       console.error('Error submitting email:', error);
//       setError('Error submitting email. Please try again.');
//     }
//   };


//   return (
//     <footer className="bg-gray-600 text-white">
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="flex flex-wrap -mx-4">
//           <div className="w-full md:w-1/4 px-4">
//             <div className="mb-4 flex flex-col items-start">
//               <Link href="/" legacyBehavior>
//                 <a className="mb-4">
//                   <Image
//                     src="/images/hdplogo.png"
//                     alt="Logo"
//                     width={100}
//                     height={100}
//                     className="w-auto h-20"
//                   />
//                 </a>
//               </Link>
//             </div>
//             <p className="text-sm text-gray-200">
//               RCCG HDPlace is a lively youth church in Ijebu Ode, Ogun State, Nigeria. It focuses on dynamic worship, Bible studies, and youth programs, aiming to inspire and empower believers in their faith and community.
//             </p>
//             <div className="flex space-x-4 mt-4">
//               <a href="https://www.facebook.com/rccghdplace" target="_blank" className="text-gray-200 hover:text-gray-500">
//                 <FaFacebook size={20} />
//               </a>
//               <a href="https://x.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaTwitter size={20} />
//               </a>
//               <a href="https://www.instagram.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaInstagram size={20} />
//               </a>
//               <a href="https://youtube.com/@rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaYoutube size={20} />
//               </a>
//               <a href="https://open.spotify.com/show/7BsRmm2DPUdl1TbGwpmYEF?si=NzwPCk26Q8ShVGrG1uzIHg" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaSpotify size={20} />
//               </a>
//             </div>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Blogs</h2>
//             <ul className="list-none space-y-1">
//               {latestBlogs.map((blog) => (
//                 <li key={blog._id} className="list-disc capitalize">
//                   <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
//                     <a className="text-gray-200 hover:text-gray-500 block truncate">
//                       {blog.title}
//                     </a>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Contact</h2>
//             <p className="mb-2 flex items-center text-gray-200">
//               <FaMapMarkerAlt className="inline mr-2" />
//               RCCG His Dwelling Place, Ijebu Ode, Nigeria.
//             </p>
//             <p className="mb-2 flex items-center text-gray-200">
//               <FaPhoneAlt className="inline mr-2" />
//               (+234) 813-9462728
//             </p>
//             <p className=" mb-2 flex items-center text-gray-200">
//               <FaPhoneAlt className="inline mr-2" />
//               (+234) 706-4700115
//             </p>
//             <p className="mb-2 flex items-center text-gray-200">
//               <AiOutlineMail className="inline mr-2" />
//               <span className="text-gray-200">info@rccghdplace.org</span>
//             </p>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Subscribe - We don&apos;t spam</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   name="emailsubs"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full px-3 py-2 placeholder-gray-400 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-[#9ACD35] hover:bg-[#8db440] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-800 text-white text-center py-2 mt-4">
//         Copyright © 2024 RCCG - His Dwelling Place. All rights reserved.
//       </div>
//       {isLightboxOpen && (
//         <Lightbox
//           mainSrc=""
//           onCloseRequest={() => setIsLightboxOpen(false)}
//           toolbarButtons={[
//             <button
//               key="confirmation"
//               onClick={() => setIsLightboxOpen(false)}
//               className="text-white bg-green-500 px-4 py-2 rounded-md text-center"
//             >
//               Thank you for subscribing to RCCG His Dwelling Place newsletter
//             </button>,
//           ]}
//         />
//       )}
//     </footer>
//   );
// };

// export default Footer;


"use client";

// components/Footer.js

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";
import { fetchLatestBlogs } from "@/sanityClient";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const LOGO = "/images/hdplogo.png"; // light logo for the navy background

const ABOUT =
  "A lively youth church in Ijebu Ode, Ogun State, focused on dynamic worship, Bible study and youth programmes that inspire and empower believers in their faith and community.";

const ADDRESS = "RCCG His Dwelling Place, Ijebu Ode, Ogun State, Nigeria";
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const PHONES = [
  { display: "+234 813 946 2728", tel: "+2348139462728" },
  { display: "+234 706 470 0115", tel: "+2347064700115" },
];
const EMAIL = "info@rccghdplace.org";

// Keep in sync with components/ChurchServices.js
const SERVICE_TIMES = [
  { day: "Sunday", time: "8:00 AM & 10:00 AM" },
  { day: "Wednesday", time: "5:30 PM – 7:00 PM" },
];

const EXPLORE = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "Programs & Events", href: "/program-events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog & Updates", href: "/blog-updates" },
  { name: "Contact", href: "/contact-us" },
];

const GET_INVOLVED = [
  { name: "Get Counsel", href: "/counsel-request" },
  { name: "Testimonies & Feedback", href: "/testimony-feedback" },
  { name: "Jobs & Opportunities", href: "/job-opportunities" },
  { name: "Give Online", href: "/give" },
];

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/rccghdplace", icon: FaFacebookF },
  { name: "X (Twitter)", href: "https://x.com/rccghdplace", icon: XIcon },
  { name: "Instagram", href: "https://www.instagram.com/rccghdplace", icon: FaInstagram },
  { name: "YouTube", href: "https://youtube.com/@rccghdplace", icon: FaYoutube },
  {
    name: "Spotify podcast",
    href: "https://open.spotify.com/show/7BsRmm2DPUdl1TbGwpmYEF",
    icon: FaSpotify,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ColumnTitle({ children }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]">{children}</h2>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded text-[0.95rem] text-white/70 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
    >
      <span
        aria-hidden="true"
        className="h-px w-0 bg-[#98CE2F] transition-all duration-300 group-hover:w-3"
      />
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Newsletter form                                                    */
/*  status: idle | loading | success | error — shown inline, no popup  */
/* ------------------------------------------------------------------ */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error("Failed to subscribe");
      setStatus("success");
      setMessage("You're in! Watch your inbox for updates from HDP.");
      setEmail("");
    } catch (err) {
      console.error("Error submitting email:", err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-10 backdrop-blur-sm sm:px-10 lg:px-14 lg:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#98CE2F]/20 blur-[100px]" />

      <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]">
            Stay in the loop
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Never miss a moment.
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-white/60">
            Events, teachings and church news — straight to your inbox. No spam, ever.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="w-full">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <div
            className={cn(
              "flex flex-col gap-2 rounded-2xl border bg-white/[0.06] p-2 transition-colors sm:flex-row sm:rounded-full",
              status === "error"
                ? "border-red-400/60"
                : "border-white/15 focus-within:border-[#98CE2F]"
            )}
          >
            <input
              id="footer-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle" && status !== "loading") setStatus("idle");
              }}
              placeholder="Enter your email address"
              aria-invalid={status === "error"}
              aria-describedby="footer-email-status"
              disabled={status === "loading"}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#98CE2F] px-6 py-3 text-sm font-bold text-[#061956] transition-all duration-300 hover:bg-[#A9DD3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-80 sm:rounded-full"
            >
              {status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#061956]/30 border-t-[#061956]" />
                  Subscribing…
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2.4}
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </div>

          <p
            id="footer-email-status"
            role="status"
            aria-live="polite"
            className={cn(
              "mt-3 flex min-h-[1.5rem] items-center gap-2 px-2 text-sm",
              status === "success" && "text-[#98CE2F]",
              status === "error" && "text-red-300"
            )}
          >
            {status === "success" && <CheckCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />}
            {status === "error" && <ExclamationCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />}
            {message}
          </p>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const [blogs, setBlogs] = useState([]);
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchLatestBlogs();
        if (!cancelled) {
          setBlogs((Array.isArray(data) ? data : []).filter((b) => b?.slug?.current).slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load footer blogs:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#061956] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#98CE2F]/10 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-[#DAB24B]/10 blur-[140px]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#98CE2F] via-[#C8E86A] to-[#DAB24B]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 sm:px-8 sm:pt-24">
        {/* ---------- Newsletter ---------- */}
        <Newsletter />

        {/* ---------- Main columns ---------- */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label="RCCG His Dwelling Place — Home"
              className="inline-block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
            >
              <Image src={LOGO} alt="RCCG His Dwelling Place" width={200} height={60} className="h-14 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">{ABOUT}</p>

            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Follow us">
              {SOCIALS.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} (opens in a new tab)`}
                    title={name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#98CE2F] hover:bg-[#98CE2F] hover:text-[#061956] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="lg:col-span-2">
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <nav aria-label="Get involved" className="lg:col-span-2">
            <ColumnTitle>Get Involved</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {GET_INVOLVED.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit us */}
          <div className="sm:col-span-2 lg:col-span-4">
            <ColumnTitle>Visit Us</ColumnTitle>
            <address className="mt-5 space-y-4 not-italic">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 rounded text-[0.95rem] text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
              >
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#98CE2F]" aria-hidden="true" />
                <span>
                  {ADDRESS}
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#98CE2F]">
                    Get directions
                    <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                </span>
              </a>

              <div className="flex gap-3 text-[0.95rem]">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#98CE2F]" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  {PHONES.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="w-fit rounded text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href={`mailto:${EMAIL}`}
                className="flex w-fit gap-3 rounded text-[0.95rem] text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
              >
                <EnvelopeIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#98CE2F]" aria-hidden="true" />
                {EMAIL}
              </a>
            </address>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                <ClockIcon className="h-4 w-4 text-[#98CE2F]" aria-hidden="true" />
                Service times
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                {SERVICE_TIMES.map((s) => (
                  <div key={s.day} className="flex justify-between gap-4">
                    <dt className="text-white/60">{s.day}</dt>
                    <dd className="font-semibold tabular-nums text-white">{s.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* ---------- Latest posts strip ---------- */}
        {blogs.length > 0 && (
          <div className="border-t border-white/10 py-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              <p className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]">
                Latest posts
              </p>
              <ul className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {blogs.map((b) => (
                  <li key={b._id} className="min-w-0">
                    <Link
                      href={`/blog-updates/${b.slug.current}`}
                      title={b.title}
                      className="group flex items-center gap-2 rounded text-sm text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
                    >
                      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-[#98CE2F]" strokeWidth={2.4} aria-hidden="true" />
                      <span className="truncate">{b.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} RCCG His Dwelling Place. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with
            <HeartIcon className="h-4 w-4 text-[#98CE2F]" strokeWidth={2} aria-label="love" />
            in Ijebu Ode
          </p>
        </div>
      </div>

      {/* ---------- Back to top ---------- */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={cn(
          "fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#98CE2F] text-[#061956] shadow-[0_10px_30px_-10px_rgba(6,25,86,0.6)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#A9DD3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#061956] sm:bottom-8 sm:right-8",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <ArrowUpIcon className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
      </button>
    </footer>
  );
}