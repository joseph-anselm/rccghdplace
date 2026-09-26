// // pages/blog/[slug].js
// import React from 'react';
// import { useRouter } from 'next/router';
// import { client } from '@/sanityClient';
// import BlockContent from '@sanity/block-content-to-react';

// const SingleBlogPage = ({ blog }) => {
//   const router = useRouter();
  
//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container max-w-4xl mx-auto px-4">
//         <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">{blog.title}</h1>
//         <div className="mb-6">
//           <img src={blog.mainImage.asset.url} alt={blog.title} className="w-full h-auto rounded" />
//         </div>
//         <div className="prose lg:prose-xl">
//           <BlockContent blocks={blog.body} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export async function getStaticPaths() {
//   const query = `*[_type == "blog"]{ "slug": slug.current }`;
//   const blogs = await client.fetch(query);

//   const paths = blogs.map((blog) => ({
//     params: { slug: blog.slug },
//   }));

//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const query = `*[_type == "blog" && slug.current == $slug][0]{
//     _id,
//     title,
//     mainImage{
//       asset->{
//         url
//       }
//     },
//     body
//   }`;
//   const blog = await client.fetch(query, { slug });

//   return {
//     props: { blog },
//   };
// }

// export default SingleBlogPage;



// pages/blog-updates/[slug].js — single blog post

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
  LinkIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { client } from "@/sanityClient";
import SubHeader from "@/components/SubHeader";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const BLOG_BASE = "/blog-updates"; // must match the folder this file lives in
const SITE_URL = "https://rccghdplace.org";
const SITE_NAME = "RCCG His Dwelling Place";

// Images inside the body get their URL resolved here, so no extra Sanity
// config is needed to render them.
const POST_QUERY = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "author": coalesce(author->name, author),
  "image": mainImage.asset->url,
  "lqip": mainImage.asset->metadata.lqip,
  body[]{
    ...,
    _type == "image" => { ..., "url": asset->url }
  }
}`;

const MORE_QUERY = `*[_type == "blog" && defined(slug.current) && slug.current != $slug] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "image": mainImage.asset->url
}`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const img = (url, w) => (url ? `${url}?w=${w}&q=80&auto=format&fit=max` : "");

const formatDate = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(iso)
      )
    : "";

// Plain text of the body — used for reading time and a fallback description.
const bodyText = (blocks = []) =>
  blocks
    .filter((b) => b?._type === "block" && Array.isArray(b.children))
    .map((b) => b.children.map((c) => c.text || "").join(""))
    .join(" ");

/* ------------------------------------------------------------------ */
/*  Rich-text serializers (styled to match the site)                   */
/* ------------------------------------------------------------------ */

const serializers = {
  types: {
    image: ({ node }) =>
      node?.url ? (
        <figure className="my-10">
          <img
            src={img(node.url, 1600)}
            alt={node.alt || node.caption || ""}
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl"
          />
          {node.caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-500">{node.caption}</figcaption>
          )}
        </figure>
      ) : null,
  },
  marks: {
    link: ({ mark, children }) => {
      const href = mark?.href || "#";
      const external = /^https?:\/\//.test(href) && !href.includes("rccghdplace");
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Reading progress bar                                               */
/* ------------------------------------------------------------------ */

function ReadingProgress({ targetId }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const done = Math.min(Math.max(-rect.top / (total > 0 ? total : 1), 0), 1);
      setProgress(done);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#98CE2F] to-[#DAB24B]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Share buttons                                                      */
/* ------------------------------------------------------------------ */

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ShareButtons({ url, title, vertical = false }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  const targets = [
    { name: "WhatsApp", href: `https://wa.me/?text=${text}%20${link}`, icon: FaWhatsapp },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${link}`, icon: FaFacebookF },
    { name: "X", href: `https://x.com/intent/tweet?text=${text}&url=${link}`, icon: XIcon },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#061956] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#98CE2F] hover:bg-[#98CE2F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]";

  return (
    <div className={cn("flex items-center gap-2.5", vertical && "flex-col")}>
      <span
        className={cn(
          "text-xs font-bold uppercase tracking-[0.2em] text-slate-400",
          vertical ? "mb-1" : "mr-1"
        )}
      >
        Share
      </span>
      {targets.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          title={`Share on ${name}`}
          className={btn}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
        className={cn(btn, copied && "border-[#98CE2F] bg-[#98CE2F]")}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <LinkIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SingleBlogPage({ blog, morePosts, readingMinutes, description }) {
  const url = `${SITE_URL}${BLOG_BASE}/${blog.slug}`;
  const pageTitle = `${blog.title} | ${SITE_NAME}`;
  const ogImage = blog.image ? img(blog.image, 1200) : `${SITE_URL}/images/hdplogo.png`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description,
    image: ogImage,
    datePublished: blog.publishedAt || undefined,
    author: { "@type": blog.author ? "Person" : "Organization", name: blog.author || SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: url,
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      </Head>

      <ReadingProgress targetId="post-body" />

      <SubHeader
        title={blog.title}
        eyebrow="Blog & Updates"
        backgroundImage={blog.image ? img(blog.image, 2000) : undefined}
        crumbs={[{ label: "Blog & Updates", href: BLOG_BASE }, { label: blog.title }]}
      />

      <article className="bg-white">
        {/* ---------- Meta bar ---------- */}
        <div className="border-b border-slate-200">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              {blog.author && (
                <li className="flex items-center gap-2">
                  <UserCircleIcon className="h-5 w-5 text-[#98CE2F]" aria-hidden="true" />
                  <span className="font-semibold text-[#061956]">{blog.author}</span>
                </li>
              )}
              {blog.publishedAt && (
                <li className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-5 w-5 text-[#98CE2F]" aria-hidden="true" />
                  <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                </li>
              )}
              {readingMinutes > 0 && (
                <li className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-[#98CE2F]" aria-hidden="true" />
                  {readingMinutes} min read
                </li>
              )}
            </ul>
            <ShareButtons url={url} title={blog.title} />
          </div>
        </div>

        {/* ---------- Body ---------- */}
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-12">
          {/* Sticky share rail (desktop) */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-32">
              <ShareButtons url={url} title={blog.title} vertical />
            </div>
          </aside>

          <div id="post-body" className="min-w-0 lg:col-span-8 lg:col-start-3">
            {blog.excerpt && (
              <p className="mb-10 border-l-4 border-[#98CE2F] pl-5 text-xl font-medium leading-relaxed text-[#061956] sm:text-2xl">
                {blog.excerpt}
              </p>
            )}

            <div
              className={cn(
                "prose prose-lg max-w-none prose-slate",
                "prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[#061956]",
                "prose-p:leading-[1.85] prose-p:text-slate-700",
                "prose-a:font-semibold prose-a:text-[#061956] prose-a:decoration-[#98CE2F] prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-[#5E8A00]",
                "prose-strong:text-[#061956]",
                "prose-blockquote:border-l-[#98CE2F] prose-blockquote:bg-[#F6F8FB] prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:text-[#061956]",
                "prose-li:marker:text-[#98CE2F]",
                "prose-img:rounded-2xl"
              )}
            >
              <BlockContent blocks={blog.body || []} serializers={serializers} />
            </div>

            {/* End of post */}
            <div className="mt-16 flex flex-col gap-6 rounded-3xl bg-[#F6F8FB] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-lg font-bold text-[#061956]">Was this a blessing to you?</p>
                <p className="mt-1 text-sm text-slate-500">Share it with someone who needs it today.</p>
              </div>
              <ShareButtons url={url} title={blog.title} />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={BLOG_BASE}
                className="group inline-flex items-center gap-2 rounded-full border border-[#061956]/15 px-5 py-2.5 text-sm font-semibold text-[#061956] transition-all duration-300 hover:border-[#061956] hover:bg-[#061956] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
              >
                <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                All posts
              </Link>
              <Link
                href="/testimony-feedback"
                className="inline-flex items-center gap-2 rounded-full bg-[#98CE2F] px-5 py-2.5 text-sm font-bold text-[#061956] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A9DD3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2"
              >
                Share your testimony
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* ---------- More posts ---------- */}
      {morePosts.length > 0 && (
        <section aria-labelledby="more-posts-title" className="bg-[#F6F8FB] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FB000]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
                  Keep reading
                </p>
                <h2 id="more-posts-title" className="mt-3 text-3xl font-extrabold tracking-tight text-[#061956] sm:text-4xl">
                  More from HDP.
                </h2>
              </div>
              <Link
                href={BLOG_BASE}
                className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-[6px] hover:text-[#5E8A00]"
              >
                View all posts
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>

            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {morePosts.map((p) => (
                <li key={p._id}>
                  <Link
                    href={`${BLOG_BASE}/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(6,25,86,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {p.image ? (
                        <img
                          src={img(p.image, 800)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#061956] to-[#0a2472]" />
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#061956] shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#98CE2F]"
                      >
                        <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {p.publishedAt && (
                        <time dateTime={p.publishedAt} className="text-xs font-medium text-slate-500">
                          {formatDate(p.publishedAt)}
                        </time>
                      )}
                      <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-[#061956] transition-colors group-hover:text-[#5E8A00]">
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{p.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "blog" && defined(slug.current)].slug.current`);
  return {
    paths: (slugs || []).map((slug) => ({ params: { slug } })),
    // New posts are built on first visit — no "Loading..." flash for readers.
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const [blog, morePosts] = await Promise.all([
    client.fetch(POST_QUERY, { slug }),
    client.fetch(MORE_QUERY, { slug }),
  ]);

  if (!blog) return { notFound: true, revalidate: 60 };

  const text = bodyText(blog.body);
  const words = text.split(/\s+/).filter(Boolean).length;
  const readingMinutes = words ? Math.max(1, Math.round(words / 200)) : 0;
  const description = (blog.excerpt || text).slice(0, 160).trim();

  return {
    props: { blog, morePosts: morePosts || [], readingMinutes, description },
    // Edits in Sanity show up on the live post within a minute, no redeploy.
    revalidate: 60,
  };
}