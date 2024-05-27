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


import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { client } from '@/sanityClient';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';
import SubHeader from '@/components/SubHeaderpost'; // Ensure the correct path

const SingleBlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        try {
          const query = `*[_type == "blog" && slug.current == $slug][0]{
            title,
            publishedAt,
            mainImage{
              asset->{
                url
              }
            },
            author->{
              name,
              image{
                asset->{
                  url
                }
              }
            },
            body
          }`;
          const data = await client.fetch(query, { slug });
          setBlog(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching blog:', error);
          setError(error.message);
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blog.mainImage && (
        <SubHeader title={blog.title} imageUrl={blog.mainImage.asset.url} />
      )}
      <section className="bg-gray-100 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="prose">
            <BlockContent blocks={blog.body} />
          </div>
          {blog.author && (
            <div className="mt-8 flex items-center">
              {blog.author.image && (
                <div className="w-16 h-16 relative mr-4">
                  <Image
                    src={blog.author.image.asset.url}
                    alt={blog.author.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              )}
              <p className="text-gray-600">
                By <strong>{blog.author.name}</strong>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SingleBlogPage;

