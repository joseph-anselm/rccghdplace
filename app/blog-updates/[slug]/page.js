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
import SubHeader from '@/components/SubHeaderpost'; 

const SingleBlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        try {
          const query = `*[_type == "blog" && slug.current == $slug][0]{
            _id,
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
            body,
            tags
          }`;
          const data = await client.fetch(query, { slug });
          setBlog(data);
          setLoading(false);

          // Fetch related posts based on tags
          const relatedPostsQuery = `*[_type == "blog" && $slug != slug.current && count(tags[@ in $tags]) > 0]{
            title,
            slug,
            mainImage{
              asset->{
                url
              }
            }
          }`;
          const relatedData = await client.fetch(relatedPostsQuery, { tags: data.tags, slug });
          setRelatedPosts(relatedData);

          // Fetch comments
          const commentsQuery = `*[_type == "comment" && post._ref == $postId]{
            name,
            comment,
            _createdAt
          } | order(_createdAt desc)`;
          const commentsData = await client.fetch(commentsQuery, { postId: data._id });
          setComments(commentsData);
        } catch (error) {
          console.error('Error fetching blog:', error);
          setError(error.message);
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !blog?._id) return;

    const commentData = {
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: blog._id,
      },
      comment: newComment,
      name: isAnonymous ? 'Anonymous' : username,
      email: isAnonymous ? null : email,
    };

    try {
      await client.create(commentData);

      setNewComment('');
      setUsername('');
      setEmail('');
      setIsAnonymous(false);

      // Refresh comments
      const commentsQuery = `*[_type == "comment" && post._ref == $postId]{
        name,
        comment,
        _createdAt
      } | order(_createdAt desc)`;
      const commentsData = await client.fetch(commentsQuery, { postId: blog._id });
      setComments(commentsData);
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Error submitting comment. Please try again.');
    }
  };

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

      {/* Comments Section */}
      <section className="bg-white py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            {!isAnonymous && (
              <>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded-md mb-4"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md mb-4"
                  placeholder="Your Email"
                  required
                />
              </>
            )}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-4 border rounded-md"
              placeholder="Write your comment..."
              rows="4"
              required
            ></textarea>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="mr-2"
              />
              <label>Comment Anonymously</label>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit Comment
            </button>
          </form>
          <div className="mt-8">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="border-b py-4">
                  <p className="text-gray-600">
                    <strong>{comment.name}</strong> - {new Date(comment._createdAt).toLocaleString()}
                  </p>
                  <p>{comment.comment}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="bg-gray-100 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.length > 0 ? (
              relatedPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    width={400}
                    height={200}
                    objectFit="cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <a href={`/blog-updates/${post.slug.current}`} className="text-blue-500">
                      Read More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No related posts found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleBlogPage;
