// // components/Header.js

// import React, { useEffect, useState } from 'react';
// import SwiperCore from 'swiper/core';
// import { Navigation, Pagination, Autoplay, EffectFlip, EffectFade } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';
// import { client, urlFor } from '@/sanityClient';

// SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

// const Header = () => {
//   const [slidesData, setSlidesData] = useState([]);

//   useEffect(() => {
//     const fetchSlides = async () => {
//       const query = `*[_type == "headerSlide"]{
//         title,
//         subtitle,
//         "imgSrc": imgSrc.asset->url,
//         ctaOneText,
//         ctaOneLink,
//         ctaTwoText,
//         ctaTwoLink
//       }`;
//       const slides = await client.fetch(query);
//       setSlidesData(slides);
//     };
//     fetchSlides();
//   }, []);

//   return (
//     <Swiper
//       slidesPerView={1}
//       pagination={{ clickable: true }}
//       loop={true}
//       autoplay={{ delay: 3000, disableOnInteraction: false }}
//       className="relative h-screen"
//       initialSlide={0}
//       speed={3000}
//       modules={[EffectFade]}
//       effect="fade"
//     >
//       {slidesData.map((slide, index) => {
//         const words = slide.title.split(',');
//         const titleWithGreenText = (
//           <>
//             <span className="text-[#DAB24B]">{words[0]}</span>
//             {words.slice(1).join(',')}
//           </>
//         );

//         return (
//           <SwiperSlide
//             key={index}
//             style={{
//               backgroundImage: `url("${slide.imgSrc}")`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           >
//             <div className="absolute inset-0 bg-black opacity-40"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center text-white px-4">
//                 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
//                   {titleWithGreenText}
//                 </h1>
//                 <p className="text-lg mb-6">{slide.subtitle}</p>
//                 <div className="flex justify-center space-x-4">
//                   <a href={slide.ctaOneLink} className="bg-[#98CE2F] text-white px-4 py-2 rounded">
//                     {slide.ctaOneText}
//                   </a>
//                   <a href={slide.ctaTwoLink} className="bg-white text-[#98CE2F] px-4 py-2 rounded">
//                     {slide.ctaTwoText}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         );
//       })}
//     </Swiper>
//   );
// };

// export default Header;




"use client";

// components/Header.js

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { client } from "@/sanityClient";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const AUTOPLAY_DELAY = 6500; // ms each slide stays on screen
const TRANSITION_SPEED = 1200; // ms crossfade between slides

// Words scrolling along the bottom strip — edit freely.
const TICKER_WORDS = ["Worship", "Community", "Purpose", "Faith", "Family", "Growth", "Impact"];

// `eyebrow` is optional: add it to the headerSlide schema in Sanity for a
// small label above the title (e.g. "Sundays · 9AM"). Falls back if empty.
const SLIDES_QUERY = `*[_type == "headerSlide"]{
  _id,
  eyebrow,
  title,
  subtitle,
  "imgSrc": imgSrc.asset->url,
  ctaOneText,
  ctaOneLink,
  ctaTwoText,
  ctaTwoLink
}`;

const DEFAULT_EYEBROW = "Welcome to His Dwelling Place";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...classes) => classes.filter(Boolean).join(" ");

// Sanity CDN image params: right-sized, modern format, good quality.
const optimise = (url) => (url ? `${url}?w=2400&q=80&auto=format&fit=max` : "");

const pad = (n) => String(n).padStart(2, "0");

// Text before the first comma gets the gradient highlight (same rule as before —
// the comma itself is a marker and is not displayed).
function Title({ text = "" }) {
  const [first, ...rest] = text.split(",");
  if (!rest.length) return text;
  return (
    <>
      <span className="hero-gradient-text">{first.trim()}</span>
      <br className="hidden sm:block" /> {rest.join(",").trim()}
    </>
  );
}

// Internal links use Next.js client navigation; external links open normally.
function CtaLink({ href, className, children }) {
  if (!href) return null;
  const internal = href.startsWith("/") || href.startsWith("#");
  return internal ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Header / Hero                                                      */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await client.fetch(SLIDES_QUERY);
        if (!cancelled) setSlides(Array.isArray(data) ? data.filter((s) => s?.imgSrc) : []);
      } catch (err) {
        console.error("Failed to load header slides:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const count = slides.length;
  const multiple = count > 1;

  const goTo = (i) => swiperRef.current?.slideToLoop(i);
  const prev = () => swiperRef.current?.slidePrev();
  const next = () => swiperRef.current?.slideNext();

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#061956]"
    >
      <HeroStyles />

      {/* ---------- Loading skeleton ---------- */}
      {loading && (
        <div className="absolute inset-0 flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#061956] via-[#0a2472] to-[#061956]" />
          <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl animate-pulse space-y-5">
              <div className="h-8 w-56 rounded-full bg-white/10" />
              <div className="h-14 w-full rounded-2xl bg-white/10" />
              <div className="h-14 w-3/4 rounded-2xl bg-white/10" />
              <div className="h-5 w-2/3 rounded-full bg-white/10" />
              <div className="flex gap-3 pt-2">
                <div className="h-12 w-40 rounded-full bg-white/10" />
                <div className="h-12 w-40 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Slides ---------- */}
      {!loading && count > 0 && (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop={multiple}
          speed={TRANSITION_SPEED}
          autoplay={multiple ? { delay: AUTOPLAY_DELAY, disableOnInteraction: false } : false}
          allowTouchMove={multiple}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="h-full w-full"
        >
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <SwiperSlide
                key={slide._id || i}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                className={cn("relative h-full w-full overflow-hidden", isActive && "is-active")}
              >
                {/* Background image with slow zoom */}
                <div
                  aria-hidden="true"
                  className="hero-bg absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${optimise(slide.imgSrc)}")` }}
                />

                {/* Layered overlays for depth + text legibility */}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#061956]/90 via-[#061956]/55 to-[#061956]/10" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                <div aria-hidden="true" className="hero-glow pointer-events-none absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#98CE2F]/25 blur-[120px]" />

                {/* Content */}
                <div className="relative z-10 flex h-full items-center">
                  <div className="mx-auto w-full max-w-7xl px-5 pb-40 pt-28 sm:px-8 sm:pb-44">
                    <div className="max-w-3xl">
                      {/* Eyebrow badge */}
                      <div
                        className={cn(isActive ? "hero-in" : "opacity-0")}
                        style={{ "--d": "100ms" }}
                      >
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:text-[0.8rem]">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#98CE2F] opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#98CE2F]" />
                          </span>
                          {slide.eyebrow || DEFAULT_EYEBROW}
                        </span>
                      </div>

                      {/* Title — first slide gets the page's h1 */}
                      {(() => {
                        const Tag = i === 0 ? "h1" : "h2";
                        return (
                          <Tag
                            className={cn(
                              "mt-6 text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]",
                              isActive ? "hero-in" : "opacity-0"
                            )}
                            style={{ "--d": "250ms" }}
                          >
                            <Title text={slide.title} />
                          </Tag>
                        );
                      })()}

                      {/* Subtitle */}
                      {slide.subtitle && (
                        <p
                          className={cn(
                            "mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl",
                            isActive ? "hero-in" : "opacity-0"
                          )}
                          style={{ "--d": "420ms" }}
                        >
                          {slide.subtitle}
                        </p>
                      )}

                      {/* CTAs */}
                      <div
                        className={cn(
                          "mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
                          isActive ? "hero-in" : "opacity-0"
                        )}
                        style={{ "--d": "580ms" }}
                      >
                        {slide.ctaOneText && (
                          <CtaLink
                            href={slide.ctaOneLink}
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#98CE2F] px-7 py-3.5 text-base font-bold text-[#061956] shadow-[0_10px_30px_-10px_rgba(152,206,47,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9DD3F] hover:shadow-[0_16px_40px_-12px_rgba(152,206,47,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#061956]"
                          >
                            {slide.ctaOneText}
                            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
                          </CtaLink>
                        )}
                        {slide.ctaTwoText && (
                          <CtaLink
                            href={slide.ctaTwoLink}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            {slide.ctaTwoText}
                          </CtaLink>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {/* ---------- Empty state (no slides in Sanity) ---------- */}
      {!loading && count === 0 && (
        <div className="absolute inset-0 flex items-center bg-gradient-to-br from-[#061956] via-[#0a2472] to-[#061956]">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
              <span className="hero-gradient-text">Welcome home.</span>
              <br /> His Dwelling Place
            </h1>
          </div>
        </div>
      )}

      {/* ---------- Controls: counter, progress, arrows ---------- */}
      {!loading && multiple && (
        <div className="absolute inset-x-0 bottom-16 z-20 sm:bottom-20">
          <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 sm:px-8">
            <div className="flex w-full max-w-md items-center gap-4">
              <span className="font-mono text-sm tabular-nums text-white">
                <span className="text-lg font-bold">{pad(active + 1)}</span>
                <span className="text-white/50"> / {pad(count)}</span>
              </span>
              <div className="flex flex-1 gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s._id || i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === active ? "true" : undefined}
                    className="group relative h-6 flex-1 focus:outline-none"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/40 group-focus-visible:ring-2 group-focus-visible:ring-[#98CE2F]">
                      <span
                        key={i === active ? `on-${active}` : `off-${i}`}
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-full bg-[#98CE2F]",
                          i === active ? "hero-progress" : i < active ? "w-full" : "w-0"
                        )}
                        style={{ "--dur": `${AUTOPLAY_DELAY + TRANSITION_SPEED}ms` }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#98CE2F] hover:bg-[#98CE2F] hover:text-[#061956] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
              >
                <ChevronLeftIcon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#98CE2F] hover:bg-[#98CE2F] hover:text-[#061956] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
              >
                <ChevronRightIcon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Ticker strip ---------- */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-white/10 bg-[#98CE2F] py-3"
      >
        <div className="hero-marquee flex w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {[...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-6 pr-6 text-sm font-extrabold uppercase tracking-[0.25em] text-[#061956] sm:text-base"
                >
                  {word}
                  <SparklesIcon className="h-4 w-4 opacity-70" strokeWidth={2} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped animations (no Tailwind config changes needed)              */
/* ------------------------------------------------------------------ */

function HeroStyles() {
  return (
    <style>{`
      .hero-gradient-text {
        background: linear-gradient(100deg, #98CE2F 0%, #C8E86A 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      /* Slow zoom on the active slide's image */
      .hero-bg { transform: scale(1.12); will-change: transform; }
      .is-active .hero-bg { animation: heroKenBurns 9s ease-out forwards; }
      @keyframes heroKenBurns {
        from { transform: scale(1.12); }
        to   { transform: scale(1); }
      }

      /* Staggered text reveal */
      .hero-in {
        animation: heroUp 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes heroUp {
        from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
      }

      /* Soft breathing glow */
      .hero-glow { animation: heroGlow 7s ease-in-out infinite alternate; }
      @keyframes heroGlow {
        from { opacity: 0.6; transform: translate(0, 0) scale(1); }
        to   { opacity: 1;   transform: translate(40px, -20px) scale(1.1); }
      }

      /* Progress bar synced to autoplay */
      .hero-progress { animation: heroProgress var(--dur, 7000ms) linear forwards; }
      @keyframes heroProgress {
        from { width: 0%; }
        to   { width: 100%; }
      }

      /* Infinite ticker */
      .hero-marquee { animation: heroMarquee 40s linear infinite; }
      @keyframes heroMarquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .is-active .hero-bg,
        .hero-glow,
        .hero-marquee { animation: none; }
        .hero-bg { transform: none; }
        .hero-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}