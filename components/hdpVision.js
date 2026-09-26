

// import React from 'react';

// const HDPVision = () => {
//   return (
//     <div className="bg-cover max-w-7xl mx-auto bg-center my-10" style={{ backgroundImage: `url('/images/rccghdp-banner4.jpg')` }}>
//       <div className="container mx-auto py-16 bg-black bg-opacity-50">
//         <section className="max-h-96 overflow-hidden">
//           <div className=" h-full flex flex-col justify-center text-white text-center">
//             <h2 className="text-3xl lg:text-4xl font-bold mb-4">HDP Vision</h2>
//             <p className="text-lg lg:text-xl">To raise kingdom role models that will dominate all spheres of Influence.</p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HDPVision;

"use client";

// components/HDPVision.js

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const BG_IMAGE = "/images/rccghdp-banner4.jpg";

// Spheres of influence shown as chips under the statement — edit freely,
// or set to [] to hide the row.
const SPHERES = [
  "Family",
  "Faith",
  "Business",
  "Government",
  "Education",
  "Media",
  "Arts & Culture",
  "Health",
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
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/*                                                                     */
/*  Placed directly after <Creed />: shares its #F6F8FB background and */
/*  max-w-7xl container, so the two read as one continuous section.   */
/* ------------------------------------------------------------------ */

export default function HDPVision() {
  const [ref, shown] = useReveal();

  return (
    <section
      id="hdp-vision"
      aria-labelledby="hdp-vision-title"
      className="relative bg-[#F6F8FB] pb-24 sm:pb-32"
    >
      <VisionStyles />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={cn(
            "group relative isolate overflow-hidden rounded-3xl bg-[#061956] shadow-[0_40px_80px_-40px_rgba(6,25,86,0.6)]",
            shown ? "vision-in" : "opacity-0"
          )}
        >
          {/* Background photo */}
          <div className={cn("absolute inset-0 -z-10", shown && "vision-zoom")}>
            <Image
              src={BG_IMAGE}
              alt=""
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
            />
          </div>

          {/* Overlays — match the hero's navy treatment */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061956]/95 via-[#061956]/75 to-[#061956]/40" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div aria-hidden="true" className="vision-glow pointer-events-none absolute -left-24 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-[#98CE2F]/25 blur-[120px]" />

          {/* Oversized watermark */}
          <span
            aria-hidden="true"
            className="vision-watermark pointer-events-none absolute -bottom-6 right-4 select-none text-[7rem] font-black leading-none tracking-tighter sm:-bottom-10 sm:text-[11rem] lg:text-[14rem]"
          >
            HDP
          </span>

          {/* Content */}
          <div className="relative px-7 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-28">
            <div className="max-w-4xl">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md",
                  shown ? "vision-up" : "opacity-0"
                )}
                style={{ "--d": "200ms" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
                HDP Vision
              </span>

              <h2
                id="hdp-vision-title"
                className={cn(
                  "mt-7 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl",
                  shown ? "vision-up" : "opacity-0"
                )}
                style={{ "--d": "350ms" }}
              >
                To raise{" "}
                <span className="vision-gradient-text">kingdom role models</span>{" "}
                that will dominate all spheres of influence.
              </h2>

              {SPHERES.length > 0 && (
                <ul
                  aria-label="Spheres of influence"
                  className="mt-10 flex flex-wrap gap-2 sm:gap-2.5"
                >
                  {SPHERES.map((s, i) => (
                    <li
                      key={s}
                      className={cn(shown ? "vision-up" : "opacity-0")}
                      style={{ "--d": `${600 + i * 60}ms` }}
                    >
                      <span className="inline-block rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-[#98CE2F] hover:bg-[#98CE2F] hover:text-[#061956] sm:text-sm">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Gradient edge at the bottom — echoes the Creed card hover bar */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#98CE2F] via-[#C8E86A] to-[#DAB24B]"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function VisionStyles() {
  return (
    <style>{`
      .vision-gradient-text {
        background: linear-gradient(100deg, #98CE2F 0%, #C8E86A 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .vision-watermark {
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(255,255,255,0.08);
      }

      .vision-in {
        animation: visionCard 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
      }
      @keyframes visionCard {
        from { opacity: 0; transform: translateY(40px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      .vision-up {
        animation: visionUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes visionUp {
        from { opacity: 0; transform: translateY(24px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
      }

      .vision-zoom { animation: visionZoom 2.4s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
      @keyframes visionZoom {
        from { transform: scale(1.15); }
        to   { transform: scale(1); }
      }

      .vision-glow { animation: visionGlow 7s ease-in-out infinite alternate; }
      @keyframes visionGlow {
        from { opacity: 0.6; }
        to   { opacity: 1; }
      }

      @media (prefers-reduced-motion: reduce) {
        .vision-in, .vision-up, .vision-zoom { animation-duration: 0.01ms; }
        .vision-glow { animation: none; }
      }
    `}</style>
  );
}
