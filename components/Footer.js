// "use client"
// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { AiOutlineMail } from 'react-icons/ai';
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// const Footer = () => {
//   const [email, setEmail] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//   };

//   return (
//     <footer className="bg-gray-600 text-white mt-8 ">
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="flex flex-wrap -mx-4">
//           <div className="w-full md:w-1/4 px-4">
//             <div className="mb-4 flex flex-col items-start">
//               <Link href="/" legacyBehavior>
//                 <a className="mb-4">
//                   <Image
//                     src="/images/rccghdp-logo.png"
//                     alt="Logo"
//                     width={100}
//                     height={100}
//                     className="w-auto h-20"
//                   />
//                 </a>
//               </Link>
              
//             </div>
//             <p className="text-sm">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
//               eget ligula et nisi egestas placerat.
//             </p>
//             <div className="flex space-x-4 mt-4">
//                 <a href="#" className="text-gray-400 hover:text-gray-500">
//                   <FaFacebook size={20} />
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-gray-500">
//                   <FaTwitter size={20} />
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-gray-500">
//                   <FaInstagram size={20} />
//                 </a>
//               </div>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Blogs</h2>
//             <ul className="list-unstyled">
//               <li>
//                 <Link href="/blog/1" legacyBehavior>
//                   <a className="text-gray-400 hover:text-gray-500">Blog 1</a>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/blog/2" legacyBehavior>
//                   <a className="text-gray-400 hover:text-gray-500">Blog 2</a>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/blog/3" legacyBehavior>
//                   <a className="text-gray-400 hover:text-gray-500">Blog 3</a>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/blog/3" legacyBehavior>
//                   <a className="text-gray-400 hover:text-gray-500">Blog 4</a>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/blog/3" legacyBehavior>
//                   <a className="text-gray-400 hover:text-gray-500">Blog 5</a>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/blog/3" legacyBehavior>
//                   <a className="text-gray-400 hover:text-gray-500">Blog 6</a>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Contact</h2>
//             <p className="mb-2">Address: Ajebo Building, New Market, Ijebu Ode</p>
//             <p className="mb-2">
//               <AiOutlineMail className="inline mr-1" />
//               <span className="text-gray-400">info@rccghdp.org</span>
//             </p>
//             <p className="mb-2">Phone: (+234) 803-2516519</p>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Subscribe - We don&apos;t spam</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-[#9ACD35] hover:bg-[#8db440] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-800 text-white text-center py-2 mt-4">
//         Copyright © 2024 RCCG - His Dwelling Place. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client"
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube, FaSpotify } from 'react-icons/fa';
import { fetchLatestBlogs } from '@/sanityClient';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const getLatestBlogs = async () => {
      const blogs = await fetchLatestBlogs();
      setLatestBlogs(blogs);
    };
    getLatestBlogs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <footer className="bg-gray-600 text-white mt-8">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4">
            <div className="mb-4 flex flex-col items-start">
              <Link href="/" legacyBehavior>
                <a className="mb-4">
                  <Image
                    src="/images/rccghdp-logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-auto h-20"
                  />
                </a>
              </Link>
            </div>
            <p className="text-sm">
            RCCG HDPlace is a lively youth church in Ijebu Ode, Ogun State, Nigeria. It focuses on dynamic worship, Bible studies, and youth programs, aiming to inspire and empower believers in their faith and community.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaSpotify size={20} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Blogs</h2>
            <ul className="list-disc list-inside">
              {latestBlogs.map((blog) => (
                <li key={blog._id}>
                  <Link href={`/blog/${blog.slug.current}`} legacyBehavior>
                    <a className="text-gray-400 hover:text-gray-500 capitalize">{blog.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Contact</h2>
            <p className="mb-2 flex items-center">
              <FaMapMarkerAlt className="inline mr-2" />
              Ajebo Building, New Market, Ijebu Ode
            </p>
            <p className="mb-2 flex items-center">
              <FaPhoneAlt className="inline mr-2" />
              (+234) 803-2516519
            </p>
            <p className="mb-2 flex items-center">
              <FaPhoneAlt className="inline mr-2" />
              (+234) 803-2516519
            </p>
            <p className="mb-2 flex items-center">
              <AiOutlineMail className="inline mr-2" />
              <span className="text-gray-400">info@rccghdp.org</span>
            </p>
            
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Subscribe - We don&apos;t spam</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#9ACD35] hover:bg-[#8db440] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-white text-center py-2 mt-4">
        Copyright © 2024 RCCG - His Dwelling Place. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
