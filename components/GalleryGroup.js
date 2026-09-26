// "use client"
// import { useState, useEffect } from 'react';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
// import { client } from '@/sanityClient';


// const tabs = [
//   { name: 'All', category: '' },
//   { name: 'Featured Moments', category: 'featured' },
//   { name: 'Sunday Services', category: 'sunday' },
//   { name: 'Midweek', category: 'midweek' },
//   { name: 'Special Programs', category: 'special' },
// ];

// const fetchImages = async (category) => {
//   const query = `*[_type == "imageGallery" ${category ? `&& category == "${category}"` : ''}]{
//     _id,
//     title,
//     "imageUrl": image.asset->url
//   }`;
//   const images = await client.fetch(query);
//   return images;
// };

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [activeTab, setActiveTab] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [imagesPerPage] = useState(8);
//   const [lightboxIndex, setLightboxIndex] = useState(-1);

//   useEffect(() => {
//     const getImages = async () => {
//       const fetchedImages = await fetchImages(activeTab);
//       setImages(fetchedImages);
//     };
//     getImages();
//   }, [activeTab]);

//   useEffect(() => {
//     const indexOfLastImage = currentPage * imagesPerPage;
//     const indexOfFirstImage = indexOfLastImage - imagesPerPage;
//     setFilteredImages(images.slice(indexOfFirstImage, indexOfLastImage));
//   }, [images, currentPage, imagesPerPage]);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-center mb-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.name}
//             className={`mx-2 px-4 py-2 rounded ${activeTab === tab.category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => {
//               setActiveTab(tab.category);
//               setCurrentPage(1);
//             }}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {filteredImages.map((image, index) => (
//           <div key={image._id} className="relative">
//             <img
//               src={image.imageUrl}
//               alt={image.title}
//               className="object-cover w-full h-full cursor-pointer"
//               onClick={() => setLightboxIndex(index)}
//             />
//           </div>
//         ))}
//       </div>
//       {lightboxIndex >= 0 && (
//         <Lightbox
//           mainSrc={filteredImages[lightboxIndex].imageUrl}
//           nextSrc={filteredImages[(lightboxIndex + 1) % filteredImages.length].imageUrl}
//           prevSrc={filteredImages[(lightboxIndex + filteredImages.length - 1) % filteredImages.length].imageUrl}
//           onCloseRequest={() => setLightboxIndex(-1)}
//           onMovePrevRequest={() =>
//             setLightboxIndex((lightboxIndex + filteredImages.length - 1) % filteredImages.length)
//           }
//           onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
//         />
//       )}
//       <div className="flex justify-center mt-4">
//         {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map((number) => (
//           <button
//             key={number + 1}
//             className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => paginate(number + 1)}
//           >
//             {number + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;

// "use client"
// import { useState, useEffect } from 'react';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
// import { client } from '@/sanityClient';

// const tabs = [
//   { name: 'All', category: '' },
//   { name: 'Featured Moments', category: 'featured' },
//   { name: 'Sunday Services', category: 'sunday' },
//   { name: 'Midweek', category: 'midweek' },
//   { name: 'Special Programs', category: 'special' },
// ];

// const fetchImages = async (category) => {
//   const query = `*[_type == "imageGallery" ${category ? `&& category == "${category}"` : ''}]{
//     _id,
//     title,
//     images[]{
//       asset->{
//         url
//       },
//       caption
//     }
//   }`;
//   const galleries = await client.fetch(query);
//   const images = galleries.flatMap(gallery => gallery.images.map(image => ({
//     ...image,
//     title: gallery.title,
//     galleryId: gallery._id,
//   })));
//   return images;
// };

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [activeTab, setActiveTab] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [imagesPerPage] = useState(8);
//   const [lightboxIndex, setLightboxIndex] = useState(-1);

//   useEffect(() => {
//     const getImages = async () => {
//       const fetchedImages = await fetchImages(activeTab);
//       setImages(fetchedImages);
//     };
//     getImages();
//   }, [activeTab]);

//   useEffect(() => {
//     const indexOfLastImage = currentPage * imagesPerPage;
//     const indexOfFirstImage = indexOfLastImage - imagesPerPage;
//     setFilteredImages(images.slice(indexOfFirstImage, indexOfLastImage));
//   }, [images, currentPage, imagesPerPage]);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container px-4 py-8 max-w-7xl mx-auto">
//       <div className="flex justify-center mb-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.name}
//             className={`mx-2 px-4 py-2 rounded ${activeTab === tab.category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => {
//               setActiveTab(tab.category);
//               setCurrentPage(1);
//             }}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>
//       <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
//         {filteredImages.map((image, index) => (
//           <div key={image.galleryId + index} className="relative">
//             <img
//               src={image.asset.url}
//               alt={image.caption || image.title}
//               className="object-cover w-full h-full cursor-pointer"
//               onClick={() => setLightboxIndex(index)}
//             />
//           </div>
//         ))}
//       </div>
//       {lightboxIndex >= 0 && (
//         <Lightbox
//           mainSrc={filteredImages[lightboxIndex].asset.url}
//           nextSrc={filteredImages[(lightboxIndex + 1) % filteredImages.length].asset.url}
//           prevSrc={filteredImages[(lightboxIndex + filteredImages.length - 1) % filteredImages.length].asset.url}
//           onCloseRequest={() => setLightboxIndex(-1)}
//           onMovePrevRequest={() =>
//             setLightboxIndex((lightboxIndex + filteredImages.length - 1) % filteredImages.length)
//           }
//           onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
//         />
//       )}
//       <div className="flex justify-center mt-4">
//         {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map((number) => (
//           <button
//             key={number + 1}
//             className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => paginate(number + 1)}
//           >
//             {number + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;


// "use client";
// import { useState, useEffect } from "react";
// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";
// import { client } from "@/sanityClient";

// const tabs = [
//   { name: "All", category: "" },
//   { name: "Featured Moments", category: "featured" },
//   { name: "Sunday Services", category: "sunday" },
//   { name: "Midweek", category: "midweek" },
//   { name: "Special Programs", category: "special" },
// ];

// const fetchImages = async (category) => {
//   const query = `*[_type == "imageGallery" ${
//     category ? `&& category == "${category}"` : ""
//   }]{
//     _id,
//     title,
//     images[]{
//       asset->{
//         url
//       },
//       caption
//     }
//   }`;
//   const galleries = await client.fetch(query);
//   const images = galleries.flatMap((gallery) =>
//     gallery.images.map((image) => ({
//       ...image,
//       title: gallery.title,
//       galleryId: gallery._id,
//     }))
//   );
//   return images;
// };

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [activeTab, setActiveTab] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [imagesPerPage] = useState(18);
//   const [lightboxIndex, setLightboxIndex] = useState(-1);

//   useEffect(() => {
//     const getImages = async () => {
//       const fetchedImages = await fetchImages(activeTab);
//       setImages(fetchedImages);
//     };
//     getImages();
//   }, [activeTab]);

//   useEffect(() => {
//     const indexOfLastImage = currentPage * imagesPerPage;
//     const indexOfFirstImage = indexOfLastImage - imagesPerPage;
//     setFilteredImages(images.slice(indexOfFirstImage, indexOfLastImage));
//   }, [images, currentPage, imagesPerPage]);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container px-4 py-8 max-w-7xl mx-auto">
//       <div className="flex flex-wrap justify-center mb-4 space-x-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab.name}
//             className={`mx-2 mb-2 px-4 py-2 rounded ${
//               activeTab === tab.category ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => {
//               setActiveTab(tab.category);
//               setCurrentPage(1);
//             }}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
//         {filteredImages.map((image, index) => (
//           <div key={image.galleryId + index} className="relative">
//             <img
//               src={image.asset.url}
//               alt={image.caption || image.title}
//               className="object-cover w-full h-full cursor-pointer"
//               onClick={() => setLightboxIndex(index)}
//             />
//           </div>
//         ))}
//       </div>
//       {lightboxIndex >= 0 && (
//         <Lightbox
//           mainSrc={filteredImages[lightboxIndex].asset.url}
//           nextSrc={
//             filteredImages[(lightboxIndex + 1) % filteredImages.length].asset
//               .url
//           }
//           prevSrc={
//             filteredImages[
//               (lightboxIndex + filteredImages.length - 1) % filteredImages.length
//             ].asset.url
//           }
//           onCloseRequest={() => setLightboxIndex(-1)}
//           onMovePrevRequest={() =>
//             setLightboxIndex(
//               (lightboxIndex + filteredImages.length - 1) %
//                 filteredImages.length
//             )
//           }
//           onMoveNextRequest={() =>
//             setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
//           }
//         />
//       )}
//       <div className="flex justify-center mt-4 space-x-1">
//         {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map(
//           (number) => (
//             <button
//               key={number + 1}
//               className={`mx-1 px-3 py-1 rounded ${
//                 currentPage === number + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200"
//               }`}
//               onClick={() => paginate(number + 1)}
//             >
//               {number + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;



"use client";

// components/ImageGallery.js — full gallery page

import { useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { ArrowsPointingOutIcon, PhotoIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { client } from "@/sanityClient";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { name: "All", category: "" },
  { name: "Featured", category: "featured" },
  { name: "Sunday Services", category: "sunday" },
  { name: "Midweek", category: "midweek" },
  { name: "Special Programmes", category: "special" },
];

const PAGE_SIZE = 24; // photos revealed per "Load more"

// One fetch for everything → instant filtering and live counts per category.
const GALLERY_QUERY = `*[_type == "imageGallery"] | order(_createdAt desc){
  _id,
  title,
  category,
  images[]{
    _key,
    caption,
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "w": asset->metadata.dimensions.width,
    "h": asset->metadata.dimensions.height
  }
}`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const thumb = (url) => `${url}?w=800&q=75&auto=format&fit=max`;
const large = (url) => `${url}?w=2400&q=85&auto=format&fit=max`;

// Keep the chosen category in the address bar so a filtered view can be shared.
const readCategory = () => {
  if (typeof window === "undefined") return "";
  const c = new URLSearchParams(window.location.search).get("category") || "";
  return CATEGORIES.some((t) => t.category === c) ? c : "";
};
const writeCategory = (c) => {
  const url = new URL(window.location.href);
  c ? url.searchParams.set("category", c) : url.searchParams.delete("category");
  window.history.replaceState(null, "", url);
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ImageGallery() {
  const [photos, setPhotos] = useState([]);
  const [state, setState] = useState("loading"); // loading | ready | error
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const gridTopRef = useRef(null);

  const load = async () => {
    setState("loading");
    try {
      const galleries = await client.fetch(GALLERY_QUERY);
      const flat = (galleries || []).flatMap((g) =>
        (g.images || [])
          .filter((img) => img?.url)
          .map((img, i) => ({
            id: img._key || `${g._id}-${i}`,
            src: img.url,
            lqip: img.lqip,
            w: img.w || 4,
            h: img.h || 3,
            caption: img.caption || "",
            album: g.title || "",
            category: g.category || "",
          }))
      );
      setPhotos(flat);
      setState("ready");
    } catch (err) {
      console.error("Failed to load gallery:", err);
      setState("error");
    }
  };

  useEffect(() => {
    setActive(readCategory());
    load();
  }, []);

  const counts = useMemo(() => {
    const c = { "": photos.length };
    for (const p of photos) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [photos]);

  const filtered = useMemo(
    () => (active ? photos.filter((p) => p.category === active) : photos),
    [photos, active]
  );
  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const selectCategory = (c) => {
    if (c === active) return;
    setActive(c);
    setVisible(PAGE_SIZE);
    writeCategory(c);
    // Bring the grid back into view if the visitor had scrolled far down
    const top = gridTopRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const slides = useMemo(
    () =>
      filtered.map((p) => ({
        src: large(p.src),
        alt: p.caption || p.album,
        width: p.w,
        height: p.h,
        title: p.album || undefined,
        description: p.caption && p.caption !== p.album ? p.caption : undefined,
      })),
    [filtered]
  );

  return (
    <section aria-label="Photo gallery" className="bg-white py-16 sm:py-20">
      <GalleryStyles />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ---------- Filter bar (sticks under the navbar) ---------- */}
        <div ref={gridTopRef} className="scroll-mt-24" />
        <div className="sticky top-16 z-30 -mx-5 border-b border-slate-200/80 bg-white/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="tablist"
              aria-label="Filter photos by category"
              className="gal2-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:pb-0"
            >
              {CATEGORIES.map((t) => {
                const selected = t.category === active;
                const count = counts[t.category] || 0;
                return (
                  <button
                    key={t.name}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectCategory(t.category)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2",
                      selected
                        ? "border-[#061956] bg-[#061956] text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#061956]/30 hover:text-[#061956]"
                    )}
                  >
                    {t.name}
                    {state === "ready" && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs tabular-nums",
                          selected ? "bg-[#98CE2F] text-[#061956]" : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {state === "ready" && filtered.length > 0 && (
              <p className="shrink-0 text-sm text-slate-500" aria-live="polite">
                Showing <span className="font-semibold text-[#061956]">{shown.length}</span> of{" "}
                {filtered.length} photos
              </p>
            )}
          </div>
        </div>

        {/* ---------- Loading ---------- */}
        {state === "loading" && (
          <div className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4 lg:gap-4">
            {[260, 180, 320, 220, 280, 200, 340, 240, 190, 300, 230, 270].map((h, i) => (
              <div
                key={i}
                className="mb-3 animate-pulse rounded-2xl bg-slate-100 lg:mb-4"
                style={{ height: h }}
              />
            ))}
          </div>
        )}

        {/* ---------- Error ---------- */}
        {state === "error" && (
          <div className="mx-auto mt-16 max-w-md text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-slate-300" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-[#061956]">We couldn't load the gallery.</p>
            <p className="mt-1 text-slate-500">Please check your connection and try again.</p>
            <button
              type="button"
              onClick={load}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#061956] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2472]"
            >
              <ArrowPathIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {/* ---------- Empty category ---------- */}
        {state === "ready" && filtered.length === 0 && (
          <div className="mx-auto mt-16 max-w-md rounded-3xl border border-dashed border-slate-300 px-6 py-14 text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-slate-300" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-[#061956]">No photos here yet</p>
            <p className="mt-1 text-slate-500">Check back soon, or browse all our moments.</p>
            {active && (
              <button
                type="button"
                onClick={() => selectCategory("")}
                className="mt-6 rounded-full border border-[#061956]/20 px-6 py-3 text-sm font-semibold text-[#061956] hover:bg-slate-50"
              >
                View all photos
              </button>
            )}
          </div>
        )}

        {/* ---------- Masonry grid ---------- */}
        {state === "ready" && filtered.length > 0 && (
          <>
            {/* key restarts the fade when the category changes */}
            <ul key={active || "all"} className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4 lg:gap-4">
              {shown.map((p, i) => (
                <li
                  key={p.id}
                  className="gal2-in mb-3 break-inside-avoid lg:mb-4"
                  style={{ "--d": `${Math.min(i % PAGE_SIZE, 12) * 40}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Open photo${p.caption ? `: ${p.caption}` : p.album ? ` from ${p.album}` : ""}`}
                    className="group relative block w-full overflow-hidden rounded-2xl bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2"
                    // Space is reserved from the real photo shape, so nothing jumps while loading
                    style={{ aspectRatio: `${p.w} / ${p.h}` }}
                  >
                    <img
                      src={thumb(p.src)}
                      alt={p.caption || p.album || "Church moment"}
                      loading={i < 8 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      style={p.lqip ? { backgroundImage: `url(${p.lqip})`, backgroundSize: "cover" } : undefined}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#061956]/85 via-[#061956]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                    >
                      <ArrowsPointingOutIcon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    {(p.caption || p.album) && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                      >
                        {p.album && (
                          <span className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#98CE2F]">
                            {p.album}
                          </span>
                        )}
                        {p.caption && p.caption !== p.album && (
                          <span className="mt-0.5 line-clamp-2 block text-sm font-semibold leading-snug text-white">
                            {p.caption}
                          </span>
                        )}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Load more */}
            {remaining > 0 && (
              <div className="mt-12 flex flex-col items-center gap-3">
                <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#98CE2F] to-[#DAB24B] transition-[width] duration-500"
                    style={{ width: `${(shown.length / filtered.length) * 100}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-full bg-[#061956] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0a2472] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2"
                >
                  Load {Math.min(PAGE_SIZE, remaining)} more photos
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ---------- Lightbox: browses every photo in the current category ---------- */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={Math.max(lightboxIndex, 0)}
        close={() => setLightboxIndex(-1)}
        on={{
          view: ({ index }) => {
            setLightboxIndex(index);
            // Reveal more tiles behind the lightbox as the visitor browses past them
            if (index >= visible - 1) setVisible((v) => Math.max(v, index + PAGE_SIZE));
          },
        }}
        slides={slides}
        plugins={[Zoom, Counter, Captions]}
        zoom={{ maxZoomPixelRatio: 2.5, scrollToZoom: true }}
        captions={{ descriptionTextAlign: "center", descriptionMaxLines: 3 }}
        counter={{ container: { style: { top: 0, bottom: "unset" } } }}
        carousel={{ finite: false, preload: 2 }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        styles={{ container: { backgroundColor: "rgba(4, 14, 52, 0.97)" } }}
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
      .gal2-scroll { scrollbar-width: none; }
      .gal2-scroll::-webkit-scrollbar { display: none; }

      .gal2-in {
        animation: gal2Up 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes gal2Up {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        .gal2-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}