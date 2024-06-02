"use client"
// // components/Header.js
// import React from 'react';
// import { Navigation, Pagination } from 'swiper/modules';
// // import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import SwiperCore from 'swiper/core';
// import {Swiper, SwiperSlide } from 'swiper/react';



// SwiperCore.use([Pagination]);

// const Header = () => {
//   return (
//     <Swiper
        
//       slidesPerView={1}
//       pagination={{ clickable: true }}
//       loop={true}
//       autoplay={{ delay: 5000 }}
//       className="relative h-screen"
//     >
//       <SwiperSlide
//         style={{
//           backgroundImage: 'url("/images/excella-img1.jpg")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center text-white">
//             <h1 className="text-4xl font-bold mb-4">
//               Your Header Title 1
//             </h1>
//             <p className="text-lg mb-6">
//               Your header subtitle or description goes here.
//             </p>
//             <div className="flex space-x-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded">
//                 CTA Button 1
//               </button>
//               <button className="bg-white text-blue-500 px-4 py-2 rounded">
//                 CTA Button 2
//               </button>
//             </div>
//           </div>
//         </div>
//       </SwiperSlide>


//       <SwiperSlide
//         style={{
//           backgroundImage: 'url("/images/excella-img1.jpg")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center text-white">
//             <h1 className="text-4xl font-bold mb-4 justify-center">
//               Your Header Title 2
//             </h1>
//             <p className="text-lg mb-6">
//               Your header subtitle or description goes here.
//             </p>
//             <div className="flex space-x-4 justify-center">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded">
//                 CTA Button 1
//               </button>
//               <button className="bg-white text-blue-500 px-4 py-2 rounded">
//                 CTA Button 2
//               </button>
//             </div>
//           </div>
//         </div>        
//       </SwiperSlide>
//       <SwiperSlide
//         style={{
//           backgroundImage: 'url("/images/excella-img1.jpg")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center text-white">
//             <h1 className="text-4xl font-bold mb-4">
//               Your Header Title 3
//             </h1>
//             <p className="text-lg mb-6">
//               Your header subtitle or description goes here.
//             </p>
//             <div className="flex space-x-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded">
//                 CTA Button 1
//               </button>
//               <button className="bg-white text-blue-500 px-4 py-2 rounded">
//                 CTA Button 2
//               </button>
//             </div>
//           </div>
//         </div>        
//       </SwiperSlide>

//       <SwiperSlide
//         style={{
//           backgroundImage: 'url("/images/excella-img1.jpg")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center text-white">
//             <h1 className="text-4xl font-bold mb-4">
//               Your Header Title 4
//             </h1>
//             <p className="text-lg mb-6">
//               Your header subtitle or description goes here.
//             </p>
//             <div className="flex space-x-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded">
//                 CTA Button 1
//               </button>
//               <button className="bg-white text-blue-500 px-4 py-2 rounded">
//                 CTA Button 2
//               </button>
//             </div>
//           </div>
//         </div>        
//       </SwiperSlide>


      

//       {/* Repeat the above structure for the remaining slides */}

//     </Swiper>
//   );
// };

// export default Header;

// import React, { useEffect } from 'react';
// import SwiperCore from 'swiper/core';
// import { Navigation, Pagination, Autoplay, EffectFlip } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { EffectFade, Flip } from 'swiper/modules';
// import 'swiper/css/effect-fade';

// SwiperCore.use([Autoplay, Navigation, Pagination]);

// const Header = () => {
//   const slidesData = [
//     {
//       title: 'Excella - Energy Excellence',
//       subtitle: 'Where innovation meets reliability in oil and gas services. Welcome to a future of excellence.',
//       imgSrc: '/images/excella-img4.jpg',
//     },
//     {
//       title: 'Precision Filtration for Efficiency.',
//       subtitle: 'Maximize operations with advanced filtration.',
//       imgSrc: '/images/excella-img2.jpg',
//     },
//     {
//       title: 'Insights Below: Mud Logging Excellence',
//       subtitle: 'Real-time data for informed drilling decisions.',
//       imgSrc: '/images/excella-img3.jpg',
//     },
//     {
//       title: 'Revitalize Wells with Expert Cleaning',
//       subtitle: 'Enhance efficiency and extend reservoir life.',
//       imgSrc: '/images/excella-img1.jpg',
//     },
//     // Add more slides as needed
//   ];

//   useEffect(() => {
//     // Any initialization logic if needed
//   }, []); 

//   return (
//     <Swiper
//       slidesPerView={1}
//       pagination={{ clickable: true }}
//       loop={true}
//       autoplay={{ delay: 5000, disableOnInteraction: false, reverseDirection: false, stopOnLastSlide: false, waitForTransition: true }}
//       className="relative h-screen"
//       initialSlide={0}
//       speed={2000}
//       modules={[EffectFlip]} 
//       effect="flip"
      
//     >
//       {slidesData.map((slide, index) => (
//         <SwiperSlide
//           key={index}
//           style={{
//             backgroundImage: `url("${slide.imgSrc}")`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         >
//           <div className="absolute inset-0 bg-black opacity-40"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center text-white">
//               <h1 className="text-6xl font-bold mb-4">{slide.title}</h1>
//               <p className="text-lg mb-6">{slide.subtitle}</p>
//               <div className="flex justify-center space-x-4">
//                 <button className="bg-[#7FB000] text-white px-4 py-2 rounded">
//                   Get a Quote
//                 </button>
//                 <button className="bg-white text-[#7FB000] px-4 py-2 rounded">
//                   Service Overview
//                 </button>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default Header;


// import React, { useEffect } from 'react';
// import SwiperCore from 'swiper/core';
// import { Navigation, Pagination, Autoplay, EffectFlip } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { EffectFade, Fade } from 'swiper/modules';
// import 'swiper/css/effect-fade';


// SwiperCore.use([Autoplay, Navigation, Pagination]);

// const Header = () => {
//   const slidesData = [
//     {
//       title: 'Joy Unleashed:, Dive into the Depths of Joyful Worship!',
//       subtitle: 'WWhere every step is a dance of faith, and every smile is the echo of unleashed Joy.',
//       imgSrc: '/images/rccghdp-banner1.jpg',
//     },
//     {
//       title: 'Word Alive:, Dive Deep into Gods Living Truth!',
//       subtitle: 'Illuminating hearts, transforming lives, and guiding souls on an eternal journey of faith',
//       imgSrc: '/images/rccghdp-banner2.jpg',
//     },
//     {
//       title: 'Spirit-Led Living:, Embrace the Journey!',
//       subtitle: `Begin a journey guided by the Holy Spirit's whispers, leading to a purposeful and peaceful life.`,
//       imgSrc: '/images/rccghdp-banner3.jpg',
//     },
//     {
//       title: 'Prayer Power:, Ignite Your Spiritual Connection!',
//       subtitle: 'In the quiet whispers of prayer lies the boundless power to move mountains.',
//       imgSrc: '/images/rccghdp-banner4.jpg',
//     },
//     // Add more slides as needed
//   ];

//   useEffect(() => {
//     // Any initialization logic if needed
//   }, []); 

//   return (
//     <Swiper
//       slidesPerView={1}
//       pagination={{ clickable: true }}
//       loop={true}
//       autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: false, stopOnLastSlide: false, waitForTransition: true }}
//       className="relative h-screen"
//       initialSlide={0}
//       speed={3000}
//       modules={[EffectFade]} 
//       effect="fade"
//     >
//       {slidesData.map((slide, index) => {
//         // Splitting the title into words
//         const words = slide.title.split(',');

//         // Wrapping the first word in a span with green color
//         const titleWithGreenText = (
//           <>
//             <span className="text-[#DAB24B]">{words[0]} </span>
//             {words.slice(1).join(',')}
//           </>
//         );

//         return (
//           <SwiperSlide
//             key={index}
//             style={{
//               backgroundImage: `url("${slide.imgSrc}")`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           >
//             <div className="absolute inset-0 bg-black opacity-40"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center text-white px-4">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
//                     {titleWithGreenText}
//               </h1>
//                 <p className="text-lg mb-6">{slide.subtitle}</p>
//                 <div className="flex justify-center space-x-4">
//                   <button className="bg-[#98CE2F] text-white px-4 py-2 rounded">
//                     Join Us Onine
//                   </button>
//                   <button className="bg-white text-[#98CE2F] px-4 py-2 rounded">
//                     Visit Us
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         );
//       })}
//     </Swiper>
//   );
// };

// export default Header;


// components/Header.js

import React, { useEffect, useState } from 'react';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, Autoplay, EffectFlip, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { client, urlFor } from '@/sanityClient';

SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

const Header = () => {
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const query = `*[_type == "headerSlide"]{
        title,
        subtitle,
        "imgSrc": imgSrc.asset->url,
        ctaOneText,
        ctaOneLink,
        ctaTwoText,
        ctaTwoLink
      }`;
      const slides = await client.fetch(query);
      setSlidesData(slides);
    };
    fetchSlides();
  }, []);

  return (
    <Swiper
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="relative h-screen"
      initialSlide={0}
      speed={3000}
      modules={[EffectFade]}
      effect="fade"
    >
      {slidesData.map((slide, index) => {
        const words = slide.title.split(',');
        const titleWithGreenText = (
          <>
            <span className="text-[#DAB24B]">{words[0]}</span>
            {words.slice(1).join(',')}
          </>
        );

        return (
          <SwiperSlide
            key={index}
            style={{
              backgroundImage: `url("${slide.imgSrc}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  {titleWithGreenText}
                </h1>
                <p className="text-lg mb-6">{slide.subtitle}</p>
                <div className="flex justify-center space-x-4">
                  <a href={slide.ctaOneLink} className="bg-[#98CE2F] text-white px-4 py-2 rounded">
                    {slide.ctaOneText}
                  </a>
                  <a href={slide.ctaTwoLink} className="bg-white text-[#98CE2F] px-4 py-2 rounded">
                    {slide.ctaTwoText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Header;
