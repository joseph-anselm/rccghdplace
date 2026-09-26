"use client"
// app/blog-updates/[slug]/page.js
// pages/blog-updates/[slug].js
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { client } from '@/sanityClient';
// import Image from 'next/image';
// import BlockContent from '@sanity/block-content-to-react';

// const SingleBlogPage = () => {
//   const router = useRouter();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     if (router.isReady) {
//       const { slug } = router.query;
//       if (slug) {
//         const fetchBlog = async () => {
//           const query = `*[_type == "blog" && slug.current == $slug][0]{
//             title,
//             slug,
//             publishedAt,
//             mainImage{
//               asset->{
//                 url
//               }
//             },
//             body,
//             author->{
//               name,
//               image{
//                 asset->{
//                   url
//                 }
//               }
//             }
//           }`;
//           const data = await client.fetch(query, { slug });
//           setBlog(data);
//         };
//         fetchBlog();
//       }
//     }
//   }, [router.isReady, router.query]);

//   if (!blog) return <div>Loading...</div>;

//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container max-w-7xl mx-auto px-4">
//         <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//         {blog.mainImage && (
//           <div className="w-full h-64 relative mb-4">
//             <Image
//               src={blog.mainImage.asset.url}
//               alt={blog.title}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg"
//             />
//           </div>
//         )}
//         {blog.author && (
//           <div className="mb-4 flex items-center">
//             <div className="w-16 h-16 relative mr-4">
//               <Image
//                 src={blog.author.image.asset.url}
//                 alt={blog.author.name}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-full"
//               />
//             </div>
//             <p className="text-gray-600">
//               By <strong>{blog.author.name}</strong>
//             </p>
//           </div>
//         )}
//         <div className="prose">
//           <BlockContent blocks={blog.body} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SingleBlogPage;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { client } from '@/sanityClient';
// import Image from 'next/image';
// import BlockContent from '@sanity/block-content-to-react';

// const SingleBlogPage = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (slug) {
//       const fetchBlog = async () => {
//         try {
//           const query = `*[_type == "blog" && slug.current == $slug][0]{
//             title,
//             publishedAt,
//             mainImage{
//               asset->{
//                 url
//               }
//             },
//             author->{
//               name,
//               image{
//                 asset->{
//                   url
//                 }
//               }
//             },
//             body
//           }`;
//           const data = await client.fetch(query, { slug });
//           setBlog(data);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching blog:', error);
//           setError(error.message);
//           setLoading(false);
//         }
//       };

//       fetchBlog();
//     }
//   }, [slug]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <section className="bg-gray-100 py-8">
//         <div className="container max-w-7xl mx-auto px-4">
//           <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//           {blog.mainImage && (
//             <div className="w-full h-64 relative mb-4">
//               <Image
//                 src={blog.mainImage.asset.url}
//                 alt={blog.title}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-lg"
//               />
//             </div>
//           )}
//           {blog.author && (
//             <div className="mb-4 flex items-center">
//               <div className="w-16 h-16 relative mr-4">
//                 <Image
//                   src={blog.author.image.asset.url}
//                   alt={blog.author.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-full"
//                 />
//               </div>
//               <p className="text-gray-600">
//                 By <strong>{blog.author.name}</strong>
//               </p>
//             </div>
//           )}
//           <div className="prose">
//             <BlockContent blocks={blog.body} />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SingleBlogPage;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { client } from '@/sanityClient';
// import Image from 'next/image';
// import BlockContent from '@sanity/block-content-to-react';
// import SubHeader from '@/components/SubHeaderpost'; 

// const SingleBlogPage = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [relatedPosts, setRelatedPosts] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [isAnonymous, setIsAnonymous] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (slug) {
//       const fetchBlog = async () => {
//         try {
//           const query = `*[_type == "blog" && slug.current == $slug][0]{
//             _id,
//             title,
//             publishedAt,
//             mainImage{
//               asset->{
//                 url
//               }
//             },
//             author->{
//               name,
//               image{
//                 asset->{
//                   url
//                 }
//               }
//             },
//             body,
//             tags
//           }`;
//           const data = await client.fetch(query, { slug });
//           setBlog(data);
//           setLoading(false);

//           // Fetch related posts based on tags
//           const relatedPostsQuery = `*[_type == "blog" && $slug != slug.current && count(tags[@ in $tags]) > 0]{
//             title,
//             slug,
//             mainImage{
//               asset->{
//                 url
//               }
//             }
//           }`;
//           const relatedData = await client.fetch(relatedPostsQuery, { tags: data.tags, slug });
//           setRelatedPosts(relatedData);

//           // Fetch comments
//           const commentsQuery = `*[_type == "comment" && post._ref == $postId]{
//             name,
//             comment,
//             _createdAt
//           } | order(_createdAt desc)`;
//           const commentsData = await client.fetch(commentsQuery, { postId: data._id });
//           setComments(commentsData);
//         } catch (error) {
//           console.error('Error fetching blog:', error);
//           setError(error.message);
//           setLoading(false);
//         }
//       };

//       fetchBlog();
//     }
//   }, [slug]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim() || !blog?._id) return;

//     const commentData = {
//       _type: 'comment',
//       post: {
//         _type: 'reference',
//         _ref: blog._id,
//       },
//       comment: newComment,
//       name: isAnonymous ? 'Anonymous' : username,
//       email: isAnonymous ? null : email,
//     };

//     try {
//       await client.create(commentData);

//       setNewComment('');
//       setUsername('');
//       setEmail('');
//       setIsAnonymous(false);

//       // Refresh comments
//       const commentsQuery = `*[_type == "comment" && post._ref == $postId]{
//         name,
//         comment,
//         _createdAt
//       } | order(_createdAt desc)`;
//       const commentsData = await client.fetch(commentsQuery, { postId: blog._id });
//       setComments(commentsData);
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//       setError('Error submitting comment. Please try again.');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {blog.mainImage && (
//         <SubHeader title={blog.title} imageUrl={blog.mainImage.asset.url} />
//       )}
//       <section className="bg-gray-100 py-8">
//         <div className="container max-w-7xl mx-auto px-4">
//           <div className="prose">
//             <BlockContent blocks={blog.body} />
//           </div>
//           {blog.author && (
//             <div className="mt-8 flex items-center">
//               {blog.author.image && (
//                 <div className="w-16 h-16 relative mr-4">
//                   <Image
//                     src={blog.author.image.asset.url}
//                     alt={blog.author.name}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-full"
//                   />
//                 </div>
//               )}
//               <p className="text-gray-600">
//                 By <strong>{blog.author.name}</strong>
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Comments Section */}
//       <section className="bg-white py-8">
//         <div className="container max-w-7xl mx-auto px-4">
//           <h2 className="text-2xl font-semibold mb-6">Comments</h2>
//           <form onSubmit={handleCommentSubmit}>
//             {!isAnonymous && (
//               <>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full p-2 border rounded-md mb-4"
//                   placeholder="Your Name"
//                   required
//                 />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full p-2 border rounded-md mb-4"
//                   placeholder="Your Email"
//                   required
//                 />
//               </>
//             )}
//             <textarea
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               className="w-full p-4 border rounded-md"
//               placeholder="Write your comment..."
//               rows="4"
//               required
//             ></textarea>
//             <div className="flex items-center mt-4">
//               <input
//                 type="checkbox"
//                 checked={isAnonymous}
//                 onChange={(e) => setIsAnonymous(e.target.checked)}
//                 className="mr-2"
//               />
//               <label>Comment Anonymously</label>
//             </div>
//             <button
//               type="submit"
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
//             >
//               Submit Comment
//             </button>
//           </form>
//           <div className="mt-8">
//             {comments.length > 0 ? (
//               comments.map((comment, index) => (
//                 <div key={index} className="border-b py-4">
//                   <p className="text-gray-600">
//                     <strong>{comment.name}</strong> - {new Date(comment._createdAt).toLocaleString()}
//                   </p>
//                   <p>{comment.comment}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No comments yet.</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Related Posts Section */}
//       <section className="bg-gray-100 py-8">
//         <div className="container max-w-7xl mx-auto px-4">
//           <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {relatedPosts.length > 0 ? (
//               relatedPosts.map((post, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <Image
//                     src={post.mainImage.asset.url}
//                     alt={post.title}
//                     width={400}
//                     height={200}
//                     objectFit="cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold">{post.title}</h3>
//                     <a href={`/blog-updates/${post.slug.current}`} className="text-blue-500">
//                       Read More
//                     </a>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No related posts found.</p>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SingleBlogPage;


"use client";

// app/blog-updates/[slug]/page.js — single blog post

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  CalendarDaysIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  LinkIcon,
  CheckIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { client } from "@/sanityClient";
import SubHeader from "@/components/SubHeader";

/* ------------------------------------------------------------------ */
/*  Queries                                                            */
/* ------------------------------------------------------------------ */

const BLOG_BASE = "/blog-updates";

const POST_QUERY = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  publishedAt,
  "image": mainImage.asset->url,
  author->{ name, "image": image.asset->url },
  body[]{
    ...,
    _type == "image" => { ..., "url": asset->url, "lqip": asset->metadata.lqip }
  },
  tags
}`;

// Posts sharing a tag first; falls back to the latest posts so the section is never empty.
const RELATED_QUERY = `{
  "byTag": *[_type == "blog" && slug.current != $slug && defined(slug.current) && count((tags[])[@ in $tags]) > 0]
    | order(publishedAt desc)[0...3]{ _id, title, "slug": slug.current, publishedAt, "image": mainImage.asset->url },
  "latest": *[_type == "blog" && slug.current != $slug && defined(slug.current)]
    | order(publishedAt desc)[0...3]{ _id, title, "slug": slug.current, publishedAt, "image": mainImage.asset->url }
}`;

const COMMENTS_QUERY = `*[_type == "comment" && post._ref == $postId] | order(_createdAt desc){
  _id, name, comment, _createdAt
}`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cn = (...c) => c.filter(Boolean).join(" ");
const img = (url, w) => (url ? `${url}?w=${w}&q=80&auto=format&fit=max` : "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_COMMENT = 1000;

const formatDate = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso))
    : "";

const timeAgo = (iso) => {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of units) {
    if (s >= secs) {
      const n = Math.floor(s / secs);
      return `${n} ${unit}${n > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

const readingTime = (blocks = []) => {
  const words = blocks
    .filter((b) => b?._type === "block")
    .flatMap((b) => b.children || [])
    .map((c) => c.text || "")
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "?";

/* ------------------------------------------------------------------ */
/*  Rich text styling (no Tailwind typography plugin needed)           */
/* ------------------------------------------------------------------ */

const ptComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 text-lg leading-[1.8] text-slate-700 first:mt-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 scroll-mt-28 text-3xl font-extrabold tracking-tight text-[#061956]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 scroll-mt-28 text-2xl font-bold tracking-tight text-[#061956]">{children}</h3>
    ),
    h4: ({ children }) => <h4 className="mt-8 text-xl font-bold text-[#061956]">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-4 border-[#98CE2F] bg-[#98CE2F]/[0.07] py-5 pl-6 pr-5 text-xl font-semibold leading-relaxed text-[#061956] sm:rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 space-y-3 pl-1">{children}</ul>,
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg marker:font-bold marker:text-[#7FB000]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-lg leading-[1.7] text-slate-700">
        <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#98CE2F]" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="pl-2 leading-[1.7] text-slate-700">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#061956]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-[#061956]">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-semibold text-[#061956] underline decoration-[#98CE2F] decoration-2 underline-offset-4 transition-colors hover:text-[#5E8A00]"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="my-10">
          <img
            src={img(value.url, 1600)}
            alt={value.alt || ""}
            loading="lazy"
            decoding="async"
            style={value.lqip ? { backgroundImage: `url(${value.lqip})`, backgroundSize: "cover" } : undefined}
            className="w-full rounded-2xl"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-500">{value.caption}</figcaption>
          )}
        </figure>
      ) : null,
  },
};

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#98CE2F] to-[#DAB24B] transition-[width] duration-150 ease-out"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

function ShareButtons({ title, vertical }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);

  const enc = encodeURIComponent;
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, icon: FaWhatsapp },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, icon: FaFacebookF },
    {
      name: "X",
      href: `https://x.com/intent/post?text=${enc(title)}&url=${enc(url)}`,
      icon: (p) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  const copy = async () => {
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#061956] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#98CE2F] hover:bg-[#98CE2F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]";

  return (
    <ul className={cn("flex gap-2", vertical && "lg:flex-col")} aria-label="Share this post">
      {links.map(({ name, href, icon: Icon }) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`} title={`Share on ${name}`} className={btn}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      ))}
      <li>
        <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} title="Copy link" className={cn(btn, copied && "border-[#98CE2F] bg-[#98CE2F]")}>
          {copied ? <CheckIcon className="h-4 w-4" strokeWidth={2.4} /> : <LinkIcon className="h-4 w-4" strokeWidth={2.2} />}
        </button>
      </li>
      <li className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </li>
    </ul>
  );
}

function Avatar({ name, src, size = "h-11 w-11", text = "text-sm" }) {
  return src ? (
    <img src={img(src, 160)} alt="" className={cn(size, "shrink-0 rounded-full object-cover")} />
  ) : (
    <span aria-hidden="true" className={cn(size, text, "flex shrink-0 items-center justify-center rounded-full bg-[#061956] font-bold text-[#98CE2F]")}>
      {initials(name)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Comments                                                           */
/* ------------------------------------------------------------------ */

function Comments({ postId, comments, setComments }) {
  const [form, setForm] = useState({ name: "", email: "", comment: "", website: "" });
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status === "error" || status === "success") setStatus("idle");
  };

  const submit = async (e) => {
    e.preventDefault();
    const text = form.comment.trim();
    if (!text) return fail("Please write a comment.");
    if (!anonymous) {
      if (!form.name.trim()) return fail("Please enter your name, or tick “Post anonymously”.");
      if (!EMAIL_RE.test(form.email.trim())) return fail("Please enter a valid email address.");
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          comment: text,
          name: anonymous ? "" : form.name.trim(),
          email: anonymous ? "" : form.email.trim(),
          anonymous,
          website: form.website, // honeypot — real people leave this empty
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not post your comment.");

      setComments((c) => [data.comment, ...c]);
      setForm((f) => ({ ...f, comment: "" }));
      setStatus("success");
      setMessage("Thank you! Your comment has been posted.");
    } catch (err) {
      fail(err.message || "Something went wrong. Please try again.");
    }
  };

  function fail(msg) {
    setStatus("error");
    setMessage(msg);
  }

  const input =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-[#061956] placeholder:text-slate-400 transition-colors focus:border-[#98CE2F] focus:outline-none focus:ring-4 focus:ring-[#98CE2F]/15 disabled:opacity-60";

  return (
    <section id="comments" aria-labelledby="comments-title" className="scroll-mt-28">
      <div className="flex items-center gap-3">
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-[#7FB000]" strokeWidth={1.8} aria-hidden="true" />
        <h2 id="comments-title" className="text-2xl font-extrabold tracking-tight text-[#061956] sm:text-3xl">
          Comments <span className="text-slate-400">({comments.length})</span>
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={submit} noValidate className="mt-8 rounded-3xl border border-slate-200 bg-[#F6F8FB] p-5 sm:p-7">
        <label htmlFor="c-text" className="text-sm font-semibold text-[#061956]">
          Join the conversation
        </label>
        <textarea
          id="c-text"
          rows={4}
          maxLength={MAX_COMMENT}
          value={form.comment}
          onChange={update("comment")}
          placeholder="Share your thoughts, a testimony or a question…"
          disabled={status === "loading"}
          className={cn(input, "mt-2 resize-y")}
        />
        <p className="mt-1 text-right text-xs tabular-nums text-slate-400">
          {form.comment.length}/{MAX_COMMENT}
        </p>

        {/* Name + email collapse away when posting anonymously */}
        <div
          className={cn(
            "grid overflow-hidden transition-all duration-300",
            anonymous ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
          )}
          aria-hidden={anonymous}
        >
          <div className="min-h-0">
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="sr-only">Your name</label>
                <input id="c-name" type="text" autoComplete="name" value={form.name} onChange={update("name")} placeholder="Your name" disabled={status === "loading" || anonymous} tabIndex={anonymous ? -1 : 0} className={input} />
              </div>
              <div>
                <label htmlFor="c-email" className="sr-only">Your email</label>
                <input id="c-email" type="email" autoComplete="email" inputMode="email" value={form.email} onChange={update("email")} placeholder="Your email (never shown)" disabled={status === "loading" || anonymous} tabIndex={anonymous ? -1 : 0} className={input} />
              </div>
            </div>
          </div>
        </div>

        {/* Honeypot: hidden from people, bots fill it in */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex cursor-pointer select-none items-center gap-3 text-sm text-slate-600">
            <span className="relative inline-flex">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="peer sr-only" />
              <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-[#98CE2F] peer-focus-visible:ring-2 peer-focus-visible:ring-[#98CE2F] peer-focus-visible:ring-offset-2" />
              <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </span>
            Post anonymously
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#061956] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0a2472] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-80"
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Posting…
              </>
            ) : (
              <>
                Post comment
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </>
            )}
          </button>
        </div>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "mt-4 flex items-center gap-2 text-sm",
            !message && "hidden",
            status === "success" && "text-[#5E8A00]",
            status === "error" && "text-red-600"
          )}
        >
          {status === "success" && <CheckCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />}
          {status === "error" && <ExclamationCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />}
          {message}
        </p>
      </form>

      {/* List */}
      {comments.length > 0 ? (
        <ul className="mt-10 divide-y divide-slate-200">
          {comments.map((c) => (
            <li key={c._id} className="flex gap-4 py-6 first:pt-0">
              <Avatar name={c.name} />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-bold text-[#061956]">{c.name || "Anonymous"}</span>
                  <time dateTime={c._createdAt} title={formatDate(c._createdAt)} className="text-xs text-slate-400">
                    {timeAgo(c._createdAt)}
                  </time>
                </p>
                <p className="mt-1.5 whitespace-pre-line break-words leading-relaxed text-slate-700">{c.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 px-6 py-8 text-center text-slate-500">
          No comments yet — be the first to share your thoughts.
        </p>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SingleBlogPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [state, setState] = useState("loading"); // loading | ready | notfound | error

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setState("loading");

    (async () => {
      try {
        const data = await client.fetch(POST_QUERY, { slug });
        if (cancelled) return;
        if (!data) return setState("notfound");

        setPost(data);
        setState("ready");
        document.title = `${data.title} | RCCG His Dwelling Place`;

        const [rel, comms] = await Promise.all([
          client.fetch(RELATED_QUERY, { slug, tags: data.tags || [] }),
          client.fetch(COMMENTS_QUERY, { postId: data._id }),
        ]);
        if (cancelled) return;
        setRelated(rel?.byTag?.length ? rel.byTag : rel?.latest || []);
        setComments(comms || []);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const minutes = useMemo(() => readingTime(post?.body), [post]);

  /* ---------- Loading ---------- */
  if (state === "loading") {
    return (
      <div className="bg-white">
        <div className="h-[420px] animate-pulse bg-[#061956]" />
        <div className="mx-auto max-w-3xl space-y-4 px-5 py-16">
          {[100, 92, 97, 80, 95, 60].map((w, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-slate-100" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  /* ---------- Not found / error ---------- */
  if (state === "notfound" || state === "error") {
    return (
      <div className="bg-white">
        <SubHeader
          title={state === "notfound" ? "Post not found" : "Something went wrong"}
          crumbs={[{ label: "Blog & Updates", href: BLOG_BASE }, { label: state === "notfound" ? "Not found" : "Error" }]}
        />
        <div className="mx-auto max-w-xl px-5 py-20 text-center">
          <p className="text-lg text-slate-600">
            {state === "notfound"
              ? "This post may have been moved or removed."
              : "We couldn't load this post. Please check your connection and try again."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {state === "error" && (
              <button type="button" onClick={() => window.location.reload()} className="rounded-full border border-[#061956]/20 px-6 py-3 text-sm font-semibold text-[#061956] hover:bg-slate-50">
                Try again
              </button>
            )}
            <Link href={BLOG_BASE} className="rounded-full bg-[#061956] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2472]">
              Browse all posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Post ---------- */
  return (
    <div className="bg-white">
      <ReadingProgress />

      <SubHeader
        title={post.title}
        subtitle={post.excerpt}
        eyebrow="Blog & Updates"
        backgroundImage={post.image ? img(post.image, 2000) : undefined}
        crumbs={[{ label: "Blog & Updates", href: BLOG_BASE }, { label: post.title }]}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-10">
          {/* ---------- Sticky share rail (desktop) ---------- */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-32 flex flex-col items-center gap-3">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400">Share</span>
              <ShareButtons title={post.title} vertical />
            </div>
          </aside>

          {/* ---------- Article ---------- */}
          <article className="min-w-0 lg:col-span-8 lg:col-start-3">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-slate-200 pb-8">
              {post.author?.name && (
                <div className="flex items-center gap-3">
                  <Avatar name={post.author.name} src={post.author.image} />
                  <div>
                    <p className="text-xs text-slate-400">Written by</p>
                    <p className="font-bold text-[#061956]">{post.author.name}</p>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt} className="inline-flex items-center gap-1.5">
                    <CalendarDaysIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    {formatDate(post.publishedAt)}
                  </time>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {minutes} min read
                </span>
                <a href="#comments" className="inline-flex items-center gap-1.5 hover:text-[#061956]">
                  <ChatBubbleLeftRightIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {comments.length} {comments.length === 1 ? "comment" : "comments"}
                </a>
              </div>
            </div>

            {/* Body */}
            <div className="mt-10 max-w-[68ch]">
              {Array.isArray(post.body) && post.body.length > 0 ? (
                <PortableText value={post.body} components={ptComponents} />
              ) : (
                <p className="text-lg text-slate-500">This post has no content yet.</p>
              )}
            </div>

            {/* Tags + mobile share */}
            <div className="mt-14 flex flex-col gap-6 border-y border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between">
              {post.tags?.length > 0 ? (
                <ul className="flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((t) => (
                    <li key={t} className="rounded-full bg-[#98CE2F]/15 px-3.5 py-1.5 text-xs font-semibold text-[#061956]">
                      #{t}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-3 lg:hidden">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Share</span>
                <ShareButtons title={post.title} />
              </div>
            </div>

            {/* Author card */}
            {post.author?.name && (
              <div className="mt-10 flex items-center gap-5 rounded-3xl bg-[#061956] p-6 text-white sm:p-8">
                <Avatar name={post.author.name} src={post.author.image} size="h-16 w-16" text="text-lg" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98CE2F]">About the author</p>
                  <p className="mt-1 text-xl font-extrabold">{post.author.name}</p>
                  <p className="mt-1 text-sm text-white/60">RCCG His Dwelling Place</p>
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="mt-16">
              <Comments postId={post._id} comments={comments} setComments={setComments} />
            </div>
          </article>
        </div>
      </div>

      {/* ---------- Related posts ---------- */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-[#F6F8FB] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FB000]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#98CE2F]" />
                  Keep reading
                </p>
                <h2 id="related-title" className="mt-3 text-3xl font-extrabold tracking-tight text-[#061956] sm:text-4xl">
                  More from HDP
                </h2>
              </div>
              <Link
                href={BLOG_BASE}
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#061956]/15 px-5 py-2.5 text-sm font-semibold text-[#061956] transition-all duration-300 hover:border-[#061956] hover:bg-[#061956] hover:text-white"
              >
                <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.2} aria-hidden="true" />
                All posts
              </Link>
            </div>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r._id}>
                  <Link href={`${BLOG_BASE}/${r.slug}`} className="group block h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(6,25,86,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CE2F]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {r.image ? (
                        <img src={img(r.image, 800)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#061956] to-[#0a2472]" />
                      )}
                      <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#061956] shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#98CE2F]">
                        <ArrowUpRightIcon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                    </div>
                    <div className="p-6">
                      {r.publishedAt && (
                        <time dateTime={r.publishedAt} className="text-xs font-medium text-slate-500">
                          {formatDate(r.publishedAt)}
                        </time>
                      )}
                      <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-[#061956] transition-colors group-hover:text-[#5E8A00]">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}