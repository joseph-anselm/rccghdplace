"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Friendly names for known routes (anything else is auto-formatted)  */
/* ------------------------------------------------------------------ */

const ROUTE_LABELS = {
  "who-we-are": "Who We Are",
  "program-events": "Programs & Events",
  gallery: "Gallery",
  "blog-updates": "Blog & Updates",
  "contact-us": "Contact",
  "counsel-request": "Get Counsel",
  "testimony-feedback": "Testimonies & Feedback",
  "job-opportunities": "Jobs & Opportunities",
  give: "Give",
};

const SITE_URL = "https://rccghdplace.org"; // used for Google breadcrumb data

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");

const formatSegment = (seg) => {
  if (ROUTE_LABELS[seg]) return ROUTE_LABELS[seg];
  let text = seg;
  try {
    text = decodeURIComponent(seg);
  } catch {}
  return text
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

function buildCrumbs(pathname) {
  const parts = (pathname || "").split("?")[0].split("/").filter(Boolean);
  return parts.map((part, i) => ({
    label: formatSegment(part),
    href: "/" + parts.slice(0, i + 1).join("/"),
  }));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SubHeader({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
  crumbs,
  align = "left",
}) {
  const pathname = usePathname();
  const trail = crumbs && crumbs.length ? crumbs : buildCrumbs(pathname);
  const parent = trail.length > 1 ? trail[trail.length - 2] : null;
  const label = eyebrow || trail[0]?.label;
  const centered = align === "center";

  // Structured data so Google can show the breadcrumb trail in search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Home", href: "/" }, ...trail].map((c, i, all) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href && i < all.length - 1 ? { item: SITE_URL + c.href } : {}),
    })),
  };

  return (
    <header className="relative isolate overflow-hidden bg-[#061956]">
      <SubHeaderStyles />

      {/* ---------- Background ---------- */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="sub-zoom absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          centered
            ? "bg-[#061956]/75"
            : "bg-gradient-to-r from-[#061956]/95 via-[#061956]/75 to-[#061956]/35"
        )}
      />
      {/* Darker band at the top keeps the transparent navbar readable */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      <div aria-hidden="true" className="sub-glow pointer-events-none absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#98CE2F]/25 blur-[120px]" />
      <div aria-hidden="true" className="sub-grid pointer-events-none absolute inset-0 -z-10" />

      {/* ---------- Content ---------- */}
      {/* Top padding clears the fixed navbar (h-20 / lg:h-24) */}
      <div
        className={cn(
          "mx-auto flex min-h-[340px] max-w-7xl flex-col justify-end px-5 pb-14 pt-32 sm:min-h-[400px] sm:px-8 sm:pb-16 lg:min-h-[440px] lg:pt-36",
          centered && "items-center text-center"
        )}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="sub-in" style={{ "--d": "0ms" }}>
          <ol
            className={cn(
              "flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-1 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm text-white/70 backdrop-blur-md",
              centered && "justify-center"
            )}
          >
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-medium text-white transition-colors hover:bg-[#98CE2F] hover:text-[#061956] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
              >
                <HomeIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Home
              </Link>
            </li>
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
                  <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-white/40" strokeWidth={2.4} aria-hidden="true" />
                  {last || !c.href ? (
                    <span
                      aria-current={last ? "page" : undefined}
                      className="max-w-[12rem] truncate font-semibold text-white sm:max-w-xs"
                      title={c.label}
                    >
                      {c.label}
                    </span>
                  ) : (
                    <Link
                      href={c.href}
                      className="max-w-[10rem] truncate rounded transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] sm:max-w-none"
                    >
                      {c.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Eyebrow */}
        {label && label !== title && (
          <p
            className="sub-in mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]"
            style={{ "--d": "100ms" }}
          >
            <span className="h-px w-6 bg-[#98CE2F]" aria-hidden="true" />
            {label}
          </p>
        )}

        {/* Title */}
        <h1
          className={cn(
            "sub-in max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl",
            label && label !== title ? "mt-3" : "mt-8"
          )}
          style={{ "--d": "180ms" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="sub-in mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
            style={{ "--d": "260ms" }}
          >
            {subtitle}
          </p>
        )}

        {/* Quick way back */}
        <div
          className={cn("sub-in mt-8 flex flex-wrap gap-3", centered && "justify-center")}
          style={{ "--d": "340ms" }}
        >
          {parent && parent.href && (
            <Link
              href={parent.href}
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
            >
              <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              Back to {parent.label}
            </Link>
          )}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-[#98CE2F] px-5 py-2.5 text-sm font-bold text-[#061956] shadow-[0_10px_30px_-10px_rgba(152,206,47,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9DD3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#061956]"
          >
            <HomeIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2.2} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Brand edge — same gradient line as HDP Vision and the footer */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#98CE2F] via-[#C8E86A] to-[#DAB24B]" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function SubHeaderStyles() {
  return (
    <style>{`
      .sub-zoom { animation: subZoom 2.4s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
      @keyframes subZoom {
        from { transform: scale(1.12); }
        to   { transform: scale(1); }
      }

      .sub-in {
        animation: subUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes subUp {
        from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
        to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
      }

      .sub-glow { animation: subGlow 7s ease-in-out infinite alternate; }
      @keyframes subGlow {
        from { opacity: 0.6; }
        to   { opacity: 1; }
      }

      .sub-grid {
        background-image:
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: linear-gradient(to top, #000, transparent 80%);
        mask-image: linear-gradient(to top, #000, transparent 80%);
      }

      @media (prefers-reduced-motion: reduce) {
        .sub-zoom, .sub-glow { animation: none; }
        .sub-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}