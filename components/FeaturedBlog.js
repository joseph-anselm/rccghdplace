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

"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/sanityClient';

const FeaturedBlogCard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const query = `*[_type == "blog"] | order(publishedAt desc) [0...4] {
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

  return (
    <section className="bg-gray-100 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
          <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Featured </span>
          <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Blogs</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={blog.mainImage.asset.url}
                alt={blog.title}
                className="w-full h-48 object-cover rounded"
              />
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
        <div className="text-right mt-5">
          <Link href="/blog" legacyBehavior>
            <a className="text-[#9CCF30] hover:underline">View More&gt;&gt;&gt;</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogCard;
