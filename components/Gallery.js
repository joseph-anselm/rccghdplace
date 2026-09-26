"use client";

// components/FeaturedGallery.js

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { client } from "@/sanityClient";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const DESKTOP_TILES = 5; // 1 feature + 4 supporting
const MOBILE_TILES = 8; // cards in the swipeable strip on phones

const LAYOUTS = {
  1: ["col-span-4 row-span-2"],
  2: ["col-span-2 row-span-2", "col-span-2 row-span-2"],
  3: ["col-span-2 row-span-2", "col-span-2", "col-span-2"],
  4: ["col-span-2 row-span-2", "col-span-2", "", ""],
  5: ["col-span-2 row-span-2", "", "", "", ""],
};

const FEATURED_QUERY = `*[_type == "imageGallery" && category == "featured"] | order(_createdAt desc){
  _id,
  title,
  images[]{
    caption,
    "url": asset->url,
    "lqip": asset->metadata.lqip
  }
}`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");

// Sanity CDN: crop to a sensible frame server-side, then object-cover handles the rest.
const thumb = (url, w = 900) => `${url}?w=${w}&q=75&auto=format&fit=max`;
const large = (url) => `${url}?w=2200&q=85&auto=format&fit=max`;

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
/*  Photo tile — the image is absolutely positioned inside a fixed     */
/*  frame, so it can never push the layout, whatever its size.         */
/* ------------------------------------------------------------------ */

function PhotoTile({ img, onOpen, eager, feature, moreCount }) {
  const frame =
    "group absolute inset-0 overflow-hidden rounded-2xl bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061956]";

  const picture = (
    <img
      src={thumb(img.src, feature ? 1400 : 800)}
      alt={img.caption || "Church moment"}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      style={img.lqip ? { backgroundImage: `url(${img.lqip})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
    />
  );

  // "+N more" tile → full gallery page
  if (moreCount > 0) {
    return (
      <Link href="/gallery" className={frame} aria-label={`View ${moreCount} more photos in the gallery`}>
        {picture}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#061956]/75 text-white backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-[#061956]/60">
          <PhotoIcon className="h-6 w-6 text-[#98CE2F]" strokeWidth={1.8} aria-hidden="true" />
          <span className="text-3xl font-extrabold tracking-tight">+{moreCount}</span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70">
            More photos
          </span>
        </span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className={frame}
      aria-label={`Open photo${img.caption ? `: ${img.caption}` : ""}`}
    >
      {picture}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#061956]/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span
        aria-hidden="true"
        className="absolute right-3 top-3 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
      >
        <ArrowsPointingOutIcon className="h-4 w-4" strokeWidth={2} />
      </span>
      {img.caption && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left font-semibold leading-snug text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
            feature ? "text-base sm:p-6" : "text-sm"
          )}
        >
          <span className="line-clamp-2">{img.caption}</span>
        </span>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FeaturedGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [ref, shown] = useReveal();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const galleries = await client.fetch(FEATURED_QUERY);
        const flat = (galleries || []).flatMap((g) =>
          (g.images || [])
            .filter((img) => img?.url)
            .map((img) => ({
              src: img.url,
              lqip: img.lqip,
              caption: img.caption || g.title || "",
            }))
        );
        if (!cancelled) setImages(flat);
      } catch (err) {
        console.error("Failed to load featured images:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && images.length === 0) return null;

  const desktop = images.slice(0, DESKTOP_TILES);
  const desktopMore = images.length - DESKTOP_TILES;
  const layout = LAYOUTS[desktop.length] || LAYOUTS[5];

  const mobile = images.slice(0, MOBILE_TILES);
  const mobileMore = images.length - MOBILE_TILES;

  return (
    <section
      id="featured-moments"
      aria-labelledby="featured-moments-title"
      className="relative overflow-hidden bg-[#061956] py-24 sm:py-32"
    >
      <GalleryStyles />

      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#98CE2F]/15 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#DAB24B]/10 blur-[140px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* ---------- Heading row ---------- */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md",
                shown ? "gal-in" : "opacity-0"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
              Gallery
            </span>
            <h2
              id="featured-moments-title"
              className={cn(
                "mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl",
                shown ? "gal-in" : "opacity-0"
              )}
              style={{ "--d": "100ms" }}
            >
              Featured <span className="gal-gradient-text">moments.</span>
            </h2>
            <p
              className={cn(
                "mt-4 max-w-md text-base leading-relaxed text-white/60",
                shown ? "gal-in" : "opacity-0"
              )}
              style={{ "--d": "200ms" }}
            >
              Worship, fellowship and life together — captured.
            </p>
          </div>

          <Link
            href="/gallery"
            className={cn(
              "group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#98CE2F] hover:bg-[#98CE2F] hover:text-[#061956] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]",
              shown ? "gal-in" : "opacity-0"
            )}
            style={{ "--d": "250ms" }}
          >
            View full gallery
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* ---------- Desktop / tablet: fixed-frame editorial grid ---------- */}
        <ul
          className={cn(
            "mt-12 hidden h-[460px] grid-cols-4 grid-rows-2 gap-3 md:grid lg:h-[560px]",
            shown ? "gal-in" : "opacity-0"
          )}
          style={{ "--d": "300ms" }}
        >
          {loading
            ? LAYOUTS[5].map((span, i) => (
                <li key={i} className={cn("relative min-h-0 animate-pulse rounded-2xl bg-white/[0.06]", span)} />
              ))
            : desktop.map((img, i) => (
                <li key={`${img.src}-${i}`} className={cn("relative min-h-0 min-w-0", layout[i])}>
                  <PhotoTile
                    img={img}
                    feature={i === 0}
                    eager={i === 0}
                    onOpen={() => setLightboxIndex(i)}
                    moreCount={i === desktop.length - 1 ? desktopMore : 0}
                  />
                </li>
              ))}
        </ul>

        {/* ---------- Mobile: swipeable strip of uniform cards ---------- */}
        <ul
          className={cn(
            "gal-scroll -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 md:hidden",
            shown ? "gal-in" : "opacity-0"
          )}
          style={{ "--d": "300ms" }}
        >
          {loading
            ? [0, 1, 2].map((i) => (
                <li key={i} className="relative aspect-[4/5] w-[78%] shrink-0 animate-pulse rounded-2xl bg-white/[0.06] sm:w-[46%]" />
              ))
            : mobile.map((img, i) => (
                <li key={`${img.src}-m-${i}`} className="relative aspect-[4/5] w-[78%] shrink-0 snap-start sm:w-[46%]">
                  <PhotoTile
                    img={img}
                    eager={i < 2}
                    onOpen={() => setLightboxIndex(i)}
                    moreCount={i === mobile.length - 1 ? mobileMore : 0}
                  />
                </li>
              ))}
        </ul>
        {!loading && mobile.length > 1 && (
          <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/40 md:hidden">
            Swipe to see more
          </p>
        )}
      </div>

      {/* ---------- Lightbox: every featured photo ---------- */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={Math.max(lightboxIndex, 0)}
        close={() => setLightboxIndex(-1)}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        slides={images.map((img) => ({ src: large(img.src), alt: img.caption }))}
        styles={{ container: { backgroundColor: "rgba(4, 14, 52, 0.96)" } }}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function GalleryStyles() {
  return (
    <style>{`
      .gal-gradient-text {
        background: linear-gradient(100deg, #98CE2F 0%, #C8E86A 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .gal-in {
        animation: galUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes galUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Hide the scrollbar on the mobile strip, keep it scrollable */
      .gal-scroll { scrollbar-width: none; -webkit-overflow-scrolling: touch; }
      .gal-scroll::-webkit-scrollbar { display: none; }

      @media (prefers-reduced-motion: reduce) {
        .gal-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}