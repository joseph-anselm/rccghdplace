"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  HandRaisedIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

// Same routes as the Get Involved section on the homepage.
const connectLinks = [
  {
    name: "Get Counsel",
    href: "/counsel-request",
    cta: "Request Counsel",
    description:
      "Need guidance or prayer? Our pastors and counsellors are here to help you navigate life's challenges.",
    short: "Prayer & pastoral guidance",
    icon: HandRaisedIcon,
  },
  {
    name: "Testimonies & Feedback",
    href: "/testimony-feedback",
    cta: "Share Your Story",
    description:
      "Share your story or give feedback to help us grow together as a community of faith.",
    short: "Share your story with us",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Jobs & Opportunities",
    href: "/job-opportunities",
    cta: "See Openings",
    description:
      "Discover opportunities, from volunteering and well-paying jobs to career advancement and more.",
    short: "Volunteering, jobs & careers",
    icon: BriefcaseIcon,
  },
];

// `type: "connect"` marks where the Get Involved menu sits in the bar.
const navigation = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "Programs & Events", href: "/program-events" },
  { name: "Get Involved", type: "connect" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog & Updates", href: "/blog-updates" },
  { name: "Contact", href: "/contact-us" },
];

const LOGO_LIGHT = "/images/hdplogo.png"; // used over the dark hero
const LOGO_DARK = "/images/hdplogoinv.png"; // used on the white bar

const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/*                                                                     */
/*  transparentOnTop: true  → see-through over a dark hero, turns      */
/*                            solid white once the user scrolls.       */
/*                    false → always solid (use on pages without a     */
/*                            dark hero image at the top).             */
/* ------------------------------------------------------------------ */

export default function Navbar({ transparentOnTop = true }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [connectOpen, setConnectOpen] = useState(false); // desktop mega menu
  const closeTimer = useRef(null);
  const connectRef = useRef(null);

  /* ---------- effects ---------- */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setOpen(false);
    setConnectOpen(false);
  }, [pathname]);

  // Mobile: lock scroll + Escape to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Desktop mega menu: Escape + click outside to close
  useEffect(() => {
    if (!connectOpen) return;
    const onKey = (e) => e.key === "Escape" && setConnectOpen(false);
    const onClick = (e) => {
      if (connectRef.current && !connectRef.current.contains(e.target)) {
        setConnectOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [connectOpen]);

  // Resize to desktop → close mobile menu; resize to mobile → close mega menu
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => (e.matches ? setOpen(false) : setConnectOpen(false));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /* ---------- helpers ---------- */

  // Hover intent: open instantly, close after a short delay so the
  // pointer can travel from the trigger into the panel.
  const openConnect = () => {
    clearTimeout(closeTimer.current);
    setConnectOpen(true);
  };
  const scheduleCloseConnect = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setConnectOpen(false), 150);
  };

  const solid = !transparentOnTop || scrolled || open || connectOpen;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);
  const connectActive = connectLinks.some((l) => isActive(l.href));

  const linkClasses = (active) =>
    cn(
      "group relative flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.9rem] font-medium tracking-wide transition-colors duration-200 xl:px-3",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]",
      solid
        ? active
          ? "text-[#061956]"
          : "text-slate-600 hover:text-[#061956]"
        : active
          ? "text-white"
          : "text-white/80 hover:text-white"
    );

  const Underline = ({ show }) => (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-[#98CE2F] xl:inset-x-3",
        "transition-transform duration-300 ease-out",
        show ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      )}
    />
  );

  /* ---------- render ---------- */

  return (
    <>
      <header
        ref={connectRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
          solid
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(6,25,86,0.06),0_10px_30px_-15px_rgba(6,25,86,0.35)]"
            : "bg-gradient-to-b from-black/50 via-black/20 to-transparent"
        )}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
            "transition-[height] duration-300 ease-out",
            solid ? "h-16 lg:h-20" : "h-20 lg:h-24"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="RCCG His Dwelling Place — Home"
            className="flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2"
          >
            <Image
              src={solid ? LOGO_DARK : LOGO_LIGHT}
              alt="RCCG His Dwelling Place"
              width={180}
              height={54}
              priority
              className={cn(
                "w-auto transition-all duration-300",
                solid ? "h-9 lg:h-11" : "h-10 lg:h-12"
              )}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => {
              if (item.type === "connect") {
                const highlighted = connectActive || connectOpen;
                return (
                  <li
                    key={item.name}
                    onMouseEnter={openConnect}
                    onMouseLeave={scheduleCloseConnect}
                  >
                    <button
                      type="button"
                      onClick={() => setConnectOpen((v) => !v)}
                      aria-expanded={connectOpen}
                      aria-controls="connect-menu"
                      className={linkClasses(highlighted)}
                    >
                      {item.name}
                      <ChevronDownIcon
                        aria-hidden="true"
                        strokeWidth={2.2}
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          connectOpen && "rotate-180"
                        )}
                      />
                      <Underline show={highlighted} />
                    </button>
                  </li>
                );
              }

              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={linkClasses(active)}
                  >
                    {item.name}
                    <Underline show={active} />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/give"
              className={cn(
                "hidden items-center gap-2 rounded-full bg-[#98CE2F] px-5 py-2.5 text-sm font-semibold text-[#061956] sm:inline-flex",
                "shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-[#8BC020] hover:shadow-md",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2"
              )}
            >
              <HeartIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              Give
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]",
                solid
                  ? "text-[#061956] hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              )}
            >
              {open ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* ========== Desktop mega menu: Get Involved ========== */}
        <div
          id="connect-menu"
          onMouseEnter={openConnect}
          onMouseLeave={scheduleCloseConnect}
          className={cn(
            "absolute inset-x-0 top-full hidden lg:block",
            "transition-all duration-300 ease-out",
            connectOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          )}
        >
          <div className="border-t border-slate-100 bg-white shadow-[0_24px_48px_-24px_rgba(6,25,86,0.35)]">
            <div className="mx-auto max-w-7xl px-8 py-8">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7FB000]">
                    Get Involved
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#061956]">
                    We&apos;re here for you — how can we help?
                  </h2>
                </div>
                <Link
                  href="/contact-us"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-[#061956]"
                >
                  Something else? Contact us
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <ul className="grid grid-cols-3 gap-5">
                {connectLinks.map((item, i) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <li
                      key={item.name}
                      style={{ transitionDelay: connectOpen ? `${i * 50}ms` : "0ms" }}
                      className={cn(
                        "transition-all duration-300 ease-out",
                        connectOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      )}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300",
                          "hover:-translate-y-1 hover:border-[#98CE2F]/60 hover:bg-white hover:shadow-[0_18px_40px_-20px_rgba(6,25,86,0.35)]",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]",
                          active
                            ? "border-[#98CE2F]/60 bg-[#98CE2F]/5"
                            : "border-slate-100 bg-slate-50/70"
                        )}
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#98CE2F]/15 text-[#5E8A00] transition-colors duration-300 group-hover:bg-[#98CE2F] group-hover:text-white">
                          <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="mt-4 text-base font-bold text-[#061956]">
                          {item.name}
                        </span>
                        <span className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
                          {item.description}
                        </span>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5E8A00] group-hover:text-[#061956]">
                          {item.cta}
                          <ArrowRightIcon
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* ========== Mobile menu panel ========== */}
        <div
          id="mobile-menu"
          className={cn(
            "overflow-y-auto overscroll-contain border-t border-slate-100 bg-white lg:hidden",
            "transition-all duration-300 ease-out",
            open
              ? "visible max-h-[calc(100dvh-4rem)] opacity-100"
              : "invisible max-h-0 opacity-0"
          )}
        >
          {/* Quick actions — first thing users see */}
          <div className="px-4 pt-4 sm:px-6">
            <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7FB000]">
              Get Involved
            </p>
            <ul className="mt-2 grid grid-cols-3 gap-2">
              {connectLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-full flex-col items-center gap-2 rounded-2xl border px-2 py-3.5 text-center transition-colors",
                        active
                          ? "border-[#98CE2F]/60 bg-[#98CE2F]/10"
                          : "border-slate-100 bg-slate-50 active:bg-[#98CE2F]/10"
                      )}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#98CE2F]/15 text-[#5E8A00]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="text-[0.8rem] font-semibold leading-tight text-[#061956]">
                        {item.name}
                      </span>
                      <span className="hidden text-xs leading-snug text-slate-500 sm:block">
                        {item.short}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Main links */}
          <ul className="space-y-1 px-4 pb-4 pt-4 sm:px-6">
            {navigation
              .filter((item) => item.type !== "connect")
              .map((item, i) => {
                const active = isActive(item.href);
                return (
                  <li
                    key={item.name}
                    style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
                    className={cn(
                      "transition-all duration-300 ease-out",
                      open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                    )}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        active
                          ? "bg-[#98CE2F]/15 text-[#061956]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#061956]"
                      )}
                    >
                      {item.name}
                      {active && (
                        <span className="h-2 w-2 rounded-full bg-[#98CE2F]" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>

          <div className="border-t border-slate-100 px-4 py-4 sm:px-6">
            <Link
              href="/give"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#061956] px-5 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#0a2472]"
            >
              <HeartIcon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              Give Online
            </Link>
          </div>
        </div>
      </header>

      {/* Backdrop — dims the page behind the mobile menu or the mega menu */}
      <div
        aria-hidden="true"
        onClick={() => {
          setOpen(false);
          setConnectOpen(false);
        }}
        className={cn(
          "fixed inset-0 z-40 bg-[#061956]/40 backdrop-blur-[2px] transition-opacity duration-300",
          open || connectOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
    </>
  );
}