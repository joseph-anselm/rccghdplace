// import React from 'react';
// import Link from 'next/link';

// const FeaturedBlogCard = () => {
//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container max-w-7xl mx-auto px-4">
//       <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
//             <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Featured </span>
//             <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Blogs</span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {[...Array(4)].map((_, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md p-4">
//               <img
//                 src={`https://source.unsplash.com/800x600/?blog,${index}`}
//                 alt={`Blog ${index}`}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-bold mb-2">Blog Title</h3>
//                 <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                 <Link href="/blog" legacyBehavior>
//                   <a className="text-[#9CCF30] hover:underline">Read More...</a>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className='text-right mt-5'>
//         <Link href="/blog" legacyBehavior>
//                   <a className="text-[#9CCF30] hover:underline">View More&gt;&gt;&gt;</a>
//                 </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedBlogCard;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { client } from "@/sanityClient";

// const FeaturedBlogCard = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const query = `*[_type == "blog"] | order(publishedAt desc) [0...4] {
//         _id,
//         title,
//         slug,
//         excerpt,
//         mainImage{
//           asset->{
//             url
//           }
//         }
//       }`;
//       const data = await client.fetch(query);
//       setBlogs(data);
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
//           <span
//             className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text"
//             style={{
//               textStroke: "1px rgba(0,0,0,0.5)",
//               WebkitTextStroke: "1px rgba(0,0,0,0.5)",
//             }}
//           >
//             Featured{" "}
//           </span>
//           <span
//             className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text"
//             style={{
//               textStroke: "1px rgba(0,0,0,0.5)",
//               WebkitTextStroke: "1px rgba(0,0,0,0.5)",
//             }}
//           >
//             Blogs
//           </span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {blogs.map((blog) => (
//             <div key={blog._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
//               <img
//                 src={blog.mainImage.asset.url}
//                 alt={blog.title}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <div className="p-4 flex flex-col flex-grow">
//                 <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
//                 <p className="text-gray-600 mb-4 flex-grow">{blog.excerpt}</p>
//                 <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
//                   <a className="text-[#9CCF30] hover:underline mt-auto">Read More...</a>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="text-right mt-5">
//           <Link href="/blog-updates" legacyBehavior>
//             <a className="text-[#9CCF30] hover:underline">View More&gt;&gt;&gt;</a>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedBlogCard;



"use client";

// components/FeaturedBlogCard.js

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { client } from "@/sanityClient";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const BLOG_BASE = "/blog-updates";

const BLOGS_QUERY = `*[_type == "blog" && defined(slug.current)] | order(publishedAt desc) [0...4] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "image": mainImage.asset->url,
  "lqip": mainImage.asset->metadata.lqip
}`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");

const img = (url, w) => (url ? `${url}?w=${w}&q=75&auto=format&fit=max` : "");

const formatDate = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
        new Date(iso)
      )
    : "";

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

/* Fixed-frame cover image: can never stretch the card, whatever its size. */
function Cover({ post, width, className }) {
  return (
    <div className={cn("relative overflow-hidden bg-slate-100", className)}>
      {post.image ? (
        <img
          src={img(post.image, width)}
          alt=""
          loading="lazy"
          decoding="async"
          style={post.lqip ? { backgroundImage: `url(${post.lqip})`, backgroundSize: "cover" } : undefined}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#061956] to-[#0a2472]" />
      )}
    </div>
  );
}

function PostDate({ iso, className }) {
  if (!iso) return null;
  return (
    <time
      dateTime={iso}
      className={cn("inline-flex items-center gap-1.5 text-xs font-medium text-slate-500", className)}
    >
      <CalendarDaysIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      {formatDate(iso)}
    </time>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FeaturedBlogCard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, shown] = useReveal();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await client.fetch(BLOGS_QUERY);
        if (!cancelled) setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && posts.length === 0) return null;

  const [lead, ...rest] = posts;

  return (
    <section
      id="latest-updates"
      aria-labelledby="latest-updates-title"
      className="bg-white py-24 sm:py-32"
    >
      <BlogStyles />

      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ---------- Heading row ---------- */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className={cn(
                "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FB000]",
                shown ? "blog-in" : "opacity-0"
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
              Blog &amp; Updates
            </p>
            <h2
              id="latest-updates-title"
              className={cn(
                "mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#061956] sm:text-5xl lg:text-6xl",
                shown ? "blog-in" : "opacity-0"
              )}
              style={{ "--d": "100ms" }}
            >
              Latest from <span className="blog-gradient-text">HDP.</span>
            </h2>
            <p
              className={cn(
                "mt-4 max-w-md text-base leading-relaxed text-slate-500",
                shown ? "blog-in" : "opacity-0"
              )}
              style={{ "--d": "200ms" }}
            >
              Stories, teachings and news from our church family.
            </p>
          </div>

          <Link
            href={BLOG_BASE}
            className={cn(
              "group inline-flex w-fit items-center gap-2 rounded-full border border-[#061956]/15 px-5 py-2.5 text-sm font-semibold text-[#061956] transition-all duration-300 hover:border-[#061956] hover:bg-[#061956] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]",
              shown ? "blog-in" : "opacity-0"
            )}
            style={{ "--d": "250ms" }}
          >
            View all posts
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* ---------- Loading skeleton ---------- */}
        {loading && (
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="animate-pulse lg:col-span-7">
              <div className="aspect-[16/10] rounded-3xl bg-slate-100" />
              <div className="mt-6 h-8 w-3/4 rounded-lg bg-slate-100" />
              <div className="mt-3 h-4 w-full rounded bg-slate-100" />
            </div>
            <div className="space-y-6 lg:col-span-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex animate-pulse gap-5">
                  <div className="aspect-square w-28 shrink-0 rounded-2xl bg-slate-100 sm:w-32" />
                  <div className="flex-1 space-y-3 pt-2">
                    <div className="h-3 w-24 rounded bg-slate-100" />
                    <div className="h-5 w-full rounded bg-slate-100" />
                    <div className="h-5 w-2/3 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Posts ---------- */}
        {!loading && (
          <div className={cn("mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12", !rest.length && "lg:grid-cols-1")}>
            {/* Lead post */}
            <article
              className={cn(rest.length ? "lg:col-span-7" : "", shown ? "blog-in" : "opacity-0")}
              style={{ "--d": "300ms" }}
            >
              <Link
                href={`${BLOG_BASE}/${lead.slug}`}
                className="group block focus:outline-none"
              >
                <div className="relative">
                  <Cover post={lead} width={1400} className="aspect-[16/10] rounded-3xl" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#98CE2F] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#061956]">
                    Latest
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#061956] shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#98CE2F]"
                  >
                    <ArrowUpRightIcon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="pointer-events-none absolute inset-0 rounded-3xl ring-[#98CE2F] ring-offset-4 group-focus-visible:ring-2" />
                </div>
                <PostDate iso={lead.publishedAt} className="mt-6" />
                <h3 className="mt-2 line-clamp-2 text-2xl font-extrabold leading-tight tracking-tight text-[#061956] transition-colors duration-300 group-hover:text-[#5E8A00] sm:text-3xl">
                  {lead.title}
                </h3>
                {lead.excerpt && (
                  <p className="mt-3 line-clamp-2 max-w-2xl text-base leading-relaxed text-slate-500">
                    {lead.excerpt}
                  </p>
                )}
              </Link>
            </article>

            {/* Supporting posts */}
            {rest.length > 0 && (
              <ul className="divide-y divide-slate-200 lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-12">
                {rest.map((post, i) => (
                  <li
                    key={post._id}
                    className={cn("py-6 first:pt-0 last:pb-0", shown ? "blog-in" : "opacity-0")}
                    style={{ "--d": `${400 + i * 120}ms` }}
                  >
                    <article>
                      <Link
                        href={`${BLOG_BASE}/${post.slug}`}
                        className="group flex gap-5 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-4"
                      >
                        <Cover post={post} width={400} className="aspect-square w-24 shrink-0 rounded-2xl sm:w-32" />
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <PostDate iso={post.publishedAt} />
                          <h3 className="mt-1.5 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-[#061956] transition-colors duration-300 group-hover:text-[#5E8A00]">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-1.5 hidden line-clamp-2 text-sm leading-relaxed text-slate-500 sm:block">
                              {post.excerpt}
                            </p>
                          )}
                          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#061956] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                            Read
                            <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                          </span>
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function BlogStyles() {
  return (
    <style>{`
      .blog-gradient-text {
        background: linear-gradient(100deg, #7FB000 0%, #98CE2F 45%, #DAB24B 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .blog-in {
        animation: blogUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes blogUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .blog-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}