// // pages/blog/index.js
// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { client } from '@/sanityClient';

// const BlogPage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 20;

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const query = `*[_type == "blog"] | order(publishedAt desc) {
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

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {currentBlogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden"
//             >
//               {blog.mainImage && (
//                 <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
//                   <a>
//                     <div className="w-full h-48 relative">
//                       <Image
//                         src={blog.mainImage.asset.url}
//                         alt={blog.title}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-t-lg"
//                       />
//                     </div>
//                   </a>
//                 </Link>
//               )}
//               <div className="flex flex-col flex-1 p-4">
//                 <h3 className="text-lg font-bold mb-2">
//                   <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
//                     <a className="hover:underline">{blog.title}</a>
//                   </Link>
//                 </h3>
//                 <p className="text-gray-600 mb-4 flex-1">{blog.excerpt}</p>
//                 <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
//                   <a className="text-[#9CCF30] hover:underline mt-auto">Read More...</a>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-8">
//           {[...Array(Math.ceil(blogs.length / blogsPerPage)).keys()].map((number) => (
//             <button
//               key={number + 1}
//               className={`mx-1 px-3 py-1 rounded ${
//                 currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
//               }`}
//               onClick={() => paginate(number + 1)}
//             >
//               {number + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogPage;



"use client";

// Blog & Updates listing page

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ArrowPathIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { client } from "@/sanityClient";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const BLOG_BASE = "/blog-updates";
const PAGE_SIZE = 9; // cards revealed per "Load more" (fills a 3-column grid)
const MAX_TAGS = 8; // most-used tags shown as filters

const BLOGS_QUERY = `*[_type == "blog" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  tags,
  "image": mainImage.asset->url,
  "lqip": mainImage.asset->metadata.lqip,
  "author": author->name
}`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const img = (url, w) => (url ? `${url}?w=${w}&q=75&auto=format&fit=max` : "");
const formatDate = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso))
    : "";
const norm = (s = "") => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Keep search + tag in the address bar so a filtered view can be shared or bookmarked.
const readParams = () => {
  if (typeof window === "undefined") return { q: "", tag: "" };
  const p = new URLSearchParams(window.location.search);
  return { q: p.get("q") || "", tag: p.get("tag") || "" };
};
const writeParams = ({ q, tag }) => {
  const url = new URL(window.location.href);
  q ? url.searchParams.set("q", q) : url.searchParams.delete("q");
  tag ? url.searchParams.set("tag", tag) : url.searchParams.delete("tag");
  window.history.replaceState(null, "", url);
};

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function Cover({ post, width, className, eager }) {
  return (
    <div className={cn("relative overflow-hidden bg-slate-100", className)}>
      {post.image ? (
        <img
          src={img(post.image, width)}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={post.lqip ? { backgroundImage: `url(${post.lqip})`, backgroundSize: "cover" } : undefined}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#061956] to-[#0a2472]">
          <DocumentTextIcon className="h-10 w-10 text-white/20" strokeWidth={1.5} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

function Meta({ post, light }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium", light ? "text-white/60" : "text-slate-500")}>
      {post.publishedAt && (
        <time dateTime={post.publishedAt} className="inline-flex items-center gap-1.5">
          <CalendarDaysIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {formatDate(post.publishedAt)}
        </time>
      )}
      {post.author && (
        <>
          <span aria-hidden="true" className={light ? "text-white/30" : "text-slate-300"}>•</span>
          <span>{post.author}</span>
        </>
      )}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState("loading"); // loading | ready | error
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const searchRef = useRef(null);

  const load = async () => {
    setState("loading");
    try {
      const data = await client.fetch(BLOGS_QUERY);
      setPosts(Array.isArray(data) ? data : []);
      setState("ready");
    } catch (err) {
      console.error("Failed to load posts:", err);
      setState("error");
    }
  };

  useEffect(() => {
    const p = readParams();
    setQuery(p.q);
    setTag(p.tag);
    load();
  }, []);

  // Press "/" anywhere to jump to the search box
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement?.tagName || "")) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const topTags = useMemo(() => {
    const counts = {};
    posts.forEach((p) => (p.tags || []).forEach((t) => t && (counts[t] = (counts[t] || 0) + 1)));
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_TAGS)
      .map(([t]) => t);
  }, [posts]);

  const filtering = Boolean(query.trim() || tag);

  const results = useMemo(() => {
    const q = norm(query.trim());
    return posts.filter((p) => {
      if (tag && !(p.tags || []).includes(tag)) return false;
      if (!q) return true;
      return norm(`${p.title} ${p.excerpt || ""} ${(p.tags || []).join(" ")}`).includes(q);
    });
  }, [posts, query, tag]);

  // The newest post is featured on the unfiltered view
  const featured = !filtering ? results[0] : null;
  const grid = featured ? results.slice(1) : results;
  const shown = grid.slice(0, visible);
  const remaining = grid.length - shown.length;

  const updateQuery = (q) => {
    setQuery(q);
    setVisible(PAGE_SIZE);
    writeParams({ q: q.trim(), tag });
  };
  const updateTag = (t) => {
    const next = t === tag ? "" : t;
    setTag(next);
    setVisible(PAGE_SIZE);
    writeParams({ q: query.trim(), tag: next });
  };
  const clearAll = () => {
    setQuery("");
    setTag("");
    setVisible(PAGE_SIZE);
    writeParams({ q: "", tag: "" });
  };

  return (
    <section aria-label="Blog posts" className="bg-white py-16 sm:py-20">
      <BlogListStyles />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ---------- Search + tags ---------- */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full lg:max-w-md">
            <label htmlFor="blog-search" className="sr-only">
              Search posts
            </label>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" strokeWidth={2} aria-hidden="true" />
            <input
              ref={searchRef}
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Search posts…"
              autoComplete="off"
              className="w-full rounded-full border border-slate-200 bg-[#F6F8FB] py-3.5 pl-12 pr-20 text-base text-[#061956] placeholder:text-slate-400 transition-colors focus:border-[#98CE2F] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#98CE2F]/15 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  updateQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-[#061956]"
              >
                <XMarkIcon className="h-4 w-4" strokeWidth={2.4} />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-xs text-slate-400 sm:block">
                /
              </kbd>
            )}
          </form>

          {topTags.length > 0 && (
            <div className="blog2-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:pb-0" role="group" aria-label="Filter by topic">
              <button
                type="button"
                onClick={() => updateTag("")}
                aria-pressed={!tag}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]",
                  !tag ? "border-[#061956] bg-[#061956] text-white" : "border-slate-200 text-slate-600 hover:border-[#061956]/30 hover:text-[#061956]"
                )}
              >
                All
              </button>
              {topTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => updateTag(t)}
                  aria-pressed={tag === t}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]",
                    tag === t ? "border-[#061956] bg-[#061956] text-white" : "border-slate-200 text-slate-600 hover:border-[#061956]/30 hover:text-[#061956]"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results summary when filtering */}
        {state === "ready" && filtering && (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500" aria-live="polite">
            <span>
              <span className="font-semibold text-[#061956]">{results.length}</span>{" "}
              {results.length === 1 ? "post" : "posts"}
              {query.trim() && (
                <>
                  {" "}for “<span className="font-semibold text-[#061956]">{query.trim()}</span>”
                </>
              )}
              {tag && (
                <>
                  {" "}in <span className="font-semibold capitalize text-[#061956]">{tag}</span>
                </>
              )}
            </span>
            <button type="button" onClick={clearAll} className="font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-4 hover:text-[#5E8A00]">
              Clear filters
            </button>
          </div>
        )}

        {/* ---------- Loading ---------- */}
        {state === "loading" && (
          <div className="mt-12">
            <div className="grid animate-pulse gap-8 lg:grid-cols-2">
              <div className="aspect-[16/10] rounded-3xl bg-slate-100" />
              <div className="space-y-4 py-6">
                <div className="h-4 w-32 rounded bg-slate-100" />
                <div className="h-10 w-full rounded-lg bg-slate-100" />
                <div className="h-10 w-3/4 rounded-lg bg-slate-100" />
                <div className="h-4 w-full rounded bg-slate-100" />
              </div>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/10] rounded-3xl bg-slate-100" />
                  <div className="mt-5 h-3 w-24 rounded bg-slate-100" />
                  <div className="mt-3 h-6 w-full rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Error ---------- */}
        {state === "error" && (
          <div className="mx-auto mt-16 max-w-md text-center">
            <p className="text-lg font-semibold text-[#061956]">We couldn&apos;t load the posts.</p>
            <p className="mt-1 text-slate-500">Please check your connection and try again.</p>
            <button type="button" onClick={load} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#061956] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2472]">
              <ArrowPathIcon className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {/* ---------- Empty ---------- */}
        {state === "ready" && results.length === 0 && (
          <div className="mx-auto mt-16 max-w-md rounded-3xl border border-dashed border-slate-300 px-6 py-14 text-center">
            <MagnifyingGlassIcon className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-[#061956]">
              {filtering ? "No posts match your search" : "No posts yet"}
            </p>
            <p className="mt-1 text-slate-500">
              {filtering ? "Try a different word or topic." : "Check back soon for stories and updates."}
            </p>
            {filtering && (
              <button type="button" onClick={clearAll} className="mt-6 rounded-full border border-[#061956]/20 px-6 py-3 text-sm font-semibold text-[#061956] hover:bg-slate-50">
                View all posts
              </button>
            )}
          </div>
        )}

        {/* ---------- Featured (newest) post ---------- */}
        {state === "ready" && featured && (
          <article className="blog2-in mt-12">
            <Link
              href={`${BLOG_BASE}/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl bg-[#061956] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-4 lg:grid-cols-2"
            >
              <div className="relative">
                <Cover post={featured} width={1400} eager className="aspect-[16/10] h-full lg:aspect-auto lg:min-h-[420px]" />
                <span className="absolute left-5 top-5 rounded-full bg-[#98CE2F] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#061956]">
                  Latest
                </span>
              </div>
              <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#98CE2F]/20 blur-[90px]" />
                <Meta post={featured} light />
                <h2 className="relative mt-4 line-clamp-3 text-3xl font-extrabold leading-tight tracking-tight text-white transition-colors group-hover:text-[#C8E86A] sm:text-4xl">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="relative mt-4 line-clamp-3 text-base leading-relaxed text-white/70 sm:text-lg">
                    {featured.excerpt}
                  </p>
                )}
                <span className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#98CE2F] px-6 py-3 text-sm font-bold text-[#061956] transition-all duration-300 group-hover:bg-[#A9DD3F]">
                  Read the story
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>
        )}

        {/* ---------- Grid ---------- */}
        {state === "ready" && shown.length > 0 && (
          <>
            {featured && (
              <div className="mt-20 flex items-center gap-4">
                <h2 className="shrink-0 text-sm font-bold uppercase tracking-[0.2em] text-[#061956]">More stories</h2>
                <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-[#061956]/20 to-transparent" />
              </div>
            )}

            <ul key={`${query}|${tag}`} className={cn("grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", featured ? "mt-10" : "mt-10")}>
              {shown.map((post, i) => (
                <li key={post._id} className="blog2-in" style={{ "--d": `${(i % PAGE_SIZE) * 50}ms` }}>
                  <article className="h-full">
                    <Link
                      href={`${BLOG_BASE}/${post.slug}`}
                      className="group flex h-full flex-col rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-4"
                    >
                      <div className="relative">
                        <Cover post={post} width={800} className="aspect-[16/10] rounded-3xl" />
                        <span
                          aria-hidden="true"
                          className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-[#061956] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:rotate-45 group-hover:bg-[#98CE2F] group-hover:opacity-100"
                        >
                          <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2.4} />
                        </span>
                        {post.tags?.[0] && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-[#061956] backdrop-blur-sm">
                            {post.tags[0]}
                          </span>
                        )}
                      </div>
                      <div className="mt-5 flex flex-1 flex-col">
                        <Meta post={post} />
                        <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-snug tracking-tight text-[#061956] transition-colors group-hover:text-[#5E8A00]">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 line-clamp-2 flex-1 text-[0.95rem] leading-relaxed text-slate-500">{post.excerpt}</p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#061956]">
                          Read more
                          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>

            {remaining > 0 && (
              <div className="mt-16 flex flex-col items-center gap-3">
                <p className="text-sm text-slate-500">
                  Showing <span className="font-semibold text-[#061956]">{shown.length + (featured ? 1 : 0)}</span> of{" "}
                  {results.length} posts
                </p>
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-full bg-[#061956] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0a2472] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2"
                >
                  Load more posts
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

function BlogListStyles() {
  return (
    <style>{`
      .blog2-scroll { scrollbar-width: none; }
      .blog2-scroll::-webkit-scrollbar { display: none; }

      .blog2-in {
        animation: blog2Up 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        animation-delay: var(--d, 0ms);
      }
      @keyframes blog2Up {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        .blog2-in { animation-duration: 0.01ms; }
      }
    `}</style>
  );
}