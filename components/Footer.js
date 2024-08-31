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


// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { AiOutlineMail } from 'react-icons/ai';
// import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube, FaSpotify } from 'react-icons/fa';
// import { fetchLatestBlogs } from '@/sanityClient';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
// import { client } from '@/sanityClient';

// const Footer = () => {
//   const [email, setEmail] = useState('');
//   const [latestBlogs, setLatestBlogs] = useState([]);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

//   useEffect(() => {
//     const getLatestBlogs = async () => {
//       const blogs = await fetchLatestBlogs();
//       setLatestBlogs(blogs);
//     };
//     getLatestBlogs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await client.create({
//         _type: 'emailsubs',
//         emailAddress: email,
//       });
//       setIsSubscribed(true);
//       setIsLightboxOpen(true);
//       setEmail('');
//     } catch (error) {
//       console.error('Error submitting email:', error);
//     }
//   };

//   return (
//     <footer className="bg-gray-600 text-white mt-8">
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
//               RCCG HDPlace is a lively youth church in Ijebu Ode, Ogun State, Nigeria. It focuses on dynamic worship, Bible studies, and youth programs, aiming to inspire and empower believers in their faith and community.
//             </p>
//             <div className="flex space-x-4 mt-4">
//               <a href="https://www.facebook.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaFacebook size={20} />
//               </a>
//               <a href="https://x.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaTwitter size={20} />
//               </a>
//               <a href="https://www.instagram.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaInstagram size={20} />
//               </a>
//               <a href="https://youtube.com/@rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaYoutube size={20} />
//               </a>
//               <a href="https://open.spotify.com/show/7BsRmm2DPUdl1TbGwpmYEF?si=NzwPCk26Q8ShVGrG1uzIHg" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaSpotify size={20} />
//               </a>
//             </div>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Blogs</h2>
//             <ul className="list-disc list-inside">
//               {latestBlogs.map((blog) => (
//                 <li key={blog._id}>
//                   <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
//                     <a className="text-gray-400 hover:text-gray-500 capitalize">{blog.title}</a>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Contact</h2>
//             <p className="mb-2 flex items-center">
//               <FaMapMarkerAlt className="inline mr-2" />
//               2nd Floor Ajebo Building Adjacent Akintonde Arcade New Market Road, IJEBU-ODE, Ogun.
//             </p>
//             <p className="mb-2 flex items-center">
//               <FaPhoneAlt className="inline mr-2" />
//               (+234) 813-9462728
//             </p>
//             <p className="text-gray-400 mb-2 flex items-center">
//               <FaPhoneAlt className="inline mr-2" />
//               (+234) 706-4700115
//             </p>
//             <p className="mb-2 flex items-center">
//               <AiOutlineMail className="inline mr-2" />
//               <span className="text-gray-400">info@rccghdplace.org</span>
//             </p>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Subscribe - We don&apos;t spam</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   name="emailsubs"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full px-3 py-2 placeholder-gray-400 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
//       {isLightboxOpen && (
//         <Lightbox
//           mainSrc=""
//           onCloseRequest={() => setIsLightboxOpen(false)}
//           toolbarButtons={[
//             <button
//               key="confirmation"
//               onClick={() => setIsLightboxOpen(false)}
//               className="text-white bg-green-500 px-4 py-2 rounded-md"
//             >
//               Thank you for subscribing to RCCG His Dwelling Place newsletter
//             </button>,
//           ]}
//         />
//       )}
//     </footer>
//   );
// };

// export default Footer;

// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { AiOutlineMail } from 'react-icons/ai';
// import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube, FaSpotify } from 'react-icons/fa';
// import { fetchLatestBlogs } from '@/sanityClient';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';

// const Footer = () => {
//   const [email, setEmail] = useState('');
//   const [latestBlogs, setLatestBlogs] = useState([]);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const getLatestBlogs = async () => {
//       const blogs = await fetchLatestBlogs();
//       setLatestBlogs(blogs);
//     };
//     getLatestBlogs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     setError('');

//     try {
//       const response = await fetch('/api/subscribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to subscribe');
//       }

//       setIsSubscribed(true);
//       setIsLightboxOpen(true);
//       setEmail('');
//     } catch (error) {
//       console.error('Error submitting email:', error);
//       setError('Error submitting email. Please try again.');
//     }
//   };

//   return (
//     <footer className="bg-gray-600 text-white mt-8">
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="flex flex-wrap -mx-4">
//           <div className="w-full md:w-1/4 px-4">
//             <div className="mb-4 flex flex-col items-start">
//               <Link href="/" legacyBehavior>
//                 <a className="mb-4">
//                   <Image
//                     src="/images/hdplogo.png"
//                     alt="Logo"
//                     width={100}
//                     height={100}
//                     className="w-auto h-20"
//                   />
//                 </a>
//               </Link>
//             </div>
//             <p className="text-sm text-gray-200">
//               RCCG HDPlace is a lively youth church in Ijebu Ode, Ogun State, Nigeria. It focuses on dynamic worship, Bible studies, and youth programs, aiming to inspire and empower believers in their faith and community.
//             </p>
//             <div className="flex space-x-4 mt-4">
//               <a href="https://www.facebook.com/rccghdplace" target="_blank" className="text-gray-200 hover:text-gray-500">
//                 <FaFacebook size={20} />
//               </a>
//               <a href="https://x.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaTwitter size={20} />
//               </a>
//               <a href="https://www.instagram.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaInstagram size={20} />
//               </a>
//               <a href="https://youtube.com/@rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaYoutube size={20} />
//               </a>
//               <a href="https://open.spotify.com/show/7BsRmm2DPUdl1TbGwpmYEF?si=NzwPCk26Q8ShVGrG1uzIHg" target="_blank" className="text-gray-400 hover:text-gray-500">
//                 <FaSpotify size={20} />
//               </a>
//             </div>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Blogs</h2>
//             <ul className="list-disc list-inside">
//               {latestBlogs.map((blog) => (
//                 <li key={blog._id}>
//                   <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
//                     <a className="text-gray-200 hover:text-gray-500 Uppercase">{blog.title}</a>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Contact</h2>
//             <p className="mb-2 flex items-center text-gray-200">
//               <FaMapMarkerAlt className="inline mr-2" />
//               RCCG His Dwelling Place, Ijebu Ode, Nigeria.
//             </p>
//             <p className="mb-2 flex items-center text-gray-200">
//               <FaPhoneAlt className="inline mr-2" />
//               (+234) 813-9462728
//             </p>
//             <p className=" mb-2 flex items-center text-gray-200">
//               <FaPhoneAlt className="inline mr-2" />
//               (+234) 706-4700115
//             </p>
//             <p className="mb-2 flex items-center text-gray-200">
//               <AiOutlineMail className="inline mr-2" />
//               <span className="text-gray-200">info@rccghdplace.org</span>
//             </p>
//           </div>
//           <div className="w-full md:w-1/4 px-4">
//             <h2 className="mb-4 text-lg font-semibold">Subscribe - We don&apos;t spam</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   name="emailsubs"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full px-3 py-2 placeholder-gray-400 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
//       {isLightboxOpen && (
//         <Lightbox
//           mainSrc=""
//           onCloseRequest={() => setIsLightboxOpen(false)}
//           toolbarButtons={[
//             <button
//               key="confirmation"
//               onClick={() => setIsLightboxOpen(false)}
//               className="text-white bg-green-500 px-4 py-2 rounded-md text-center"
//             >
//               Thank you for subscribing to RCCG His Dwelling Place newsletter
//             </button>,
//           ]}
//         />
//       )}
//     </footer>
//   );
// };

// export default Footer

"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube, FaSpotify } from 'react-icons/fa';
import { fetchLatestBlogs } from '@/sanityClient';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getLatestBlogs = async () => {
      const blogs = await fetchLatestBlogs();
      setLatestBlogs(blogs);
    };
    getLatestBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


//  Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSubscribed(true);
      setIsLightboxOpen(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
      setError('Error submitting email. Please try again.');
    }
  };


  return (
    <footer className="bg-gray-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4">
            <div className="mb-4 flex flex-col items-start">
              <Link href="/" legacyBehavior>
                <a className="mb-4">
                  <Image
                    src="/images/hdplogo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-auto h-20"
                  />
                </a>
              </Link>
            </div>
            <p className="text-sm text-gray-200">
              RCCG HDPlace is a lively youth church in Ijebu Ode, Ogun State, Nigeria. It focuses on dynamic worship, Bible studies, and youth programs, aiming to inspire and empower believers in their faith and community.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/rccghdplace" target="_blank" className="text-gray-200 hover:text-gray-500">
                <FaFacebook size={20} />
              </a>
              <a href="https://x.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com/@rccghdplace" target="_blank" className="text-gray-400 hover:text-gray-500">
                <FaYoutube size={20} />
              </a>
              <a href="https://open.spotify.com/show/7BsRmm2DPUdl1TbGwpmYEF?si=NzwPCk26Q8ShVGrG1uzIHg" target="_blank" className="text-gray-400 hover:text-gray-500">
                <FaSpotify size={20} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Blogs</h2>
            <ul className="list-none space-y-1">
              {latestBlogs.map((blog) => (
                <li key={blog._id} className="list-disc capitalize">
                  <Link href={`/blog-updates/${blog.slug.current}`} legacyBehavior>
                    <a className="text-gray-200 hover:text-gray-500 block truncate">
                      {blog.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Contact</h2>
            <p className="mb-2 flex items-center text-gray-200">
              <FaMapMarkerAlt className="inline mr-2" />
              RCCG His Dwelling Place, Ijebu Ode, Nigeria.
            </p>
            <p className="mb-2 flex items-center text-gray-200">
              <FaPhoneAlt className="inline mr-2" />
              (+234) 813-9462728
            </p>
            <p className=" mb-2 flex items-center text-gray-200">
              <FaPhoneAlt className="inline mr-2" />
              (+234) 706-4700115
            </p>
            <p className="mb-2 flex items-center text-gray-200">
              <AiOutlineMail className="inline mr-2" />
              <span className="text-gray-200">info@rccghdplace.org</span>
            </p>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Subscribe - We don&apos;t spam</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="emailsubs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 placeholder-gray-400 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
      {isLightboxOpen && (
        <Lightbox
          mainSrc=""
          onCloseRequest={() => setIsLightboxOpen(false)}
          toolbarButtons={[
            <button
              key="confirmation"
              onClick={() => setIsLightboxOpen(false)}
              className="text-white bg-green-500 px-4 py-2 rounded-md text-center"
            >
              Thank you for subscribing to RCCG His Dwelling Place newsletter
            </button>,
          ]}
        />
      )}
    </footer>
  );
};

export default Footer;

