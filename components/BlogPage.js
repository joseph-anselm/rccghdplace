// "use client"
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
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
//         <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">All Blogs</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {currentBlogs.map((blog) => (
//             <div key={blog._id} className="bg-white rounded-lg shadow-md p-4">
//               <img
//                 src={blog.mainImage.asset.url}
//                 alt={blog.title}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
//                 <p className="text-gray-600 mb-4">{blog.excerpt}</p>
//                 <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
//                   <a className="text-[#9CCF30] hover:underline">Read More...</a>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-8">
//           {[...Array(Math.ceil(blogs.length / blogsPerPage)).keys()].map((number) => (
//             <button
//               key={number + 1}
//               className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
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


// pages/blog/index.js
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanityClient';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 20;

  useEffect(() => {
    const fetchBlogs = async () => {
      const query = `*[_type == "blog"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage{
          asset->{
            url
          }
        }
      }`;
      const data = await client.fetch(query);
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bg-gray-100 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">All Blogs</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentBlogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md p-4">
              {blog.mainImage && (
                <div className="w-full h-48 relative">
                  <Image
                    src={blog.mainImage.asset.url}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
                  <a className="text-[#9CCF30] hover:underline">Read More...</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {[...Array(Math.ceil(blogs.length / blogsPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
