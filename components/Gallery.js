// import React from 'react';
// import Link from 'next/link';

// const ImageGallery = () => {
//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-8">Image Gallery</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[...Array(6)].map((_, index) => (
//             <div key={index} className="relative overflow-hidden rounded-lg">
//               <img
//                 src={`https://source.unsplash.com/800x600/?nature,${index}`}
//                 alt={`Image ${index}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="text-center mt-8">
//           <Link href="/gallery" legacyBehavior>
//             <a className="text-blue-500 hover:underline">View More</a>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ImageGallery;

// import Link from 'next/link';

// const ImageGallery = () => {
//   return (
//     <section className="bg-gray-100 py-12">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
//           {Array.from({ length: 12 }, (_, i) => (
//             <div key={i} className="relative overflow-hidden">
//               <img
//                 src={`https://via.placeholder.com/500x500?text=Image+${i + 1}`}
//                 alt={`Image ${i + 1}`}
//                 className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="mt-8 text-center">
//           <Link href="/gallery" legacyBehavior>
//             <a className="text-blue-500 hover:underline font-semibold">View More</a>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ImageGallery;

// import React from 'react';
// import Link from 'next/link';

// const ImageGallery = () => {
//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-8">Image Gallery</h2>
//         <div className="grid grid-cols-6 gap-1">
//           {[...Array(12)].map((_, index) => (
//             <div key={index} className="relative overflow-hidden rounded-lg">
//               <img
//                 src={`https://source.unsplash.com/800x600/?nature,${index}`}
//                 alt={`Image ${index}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="text-center mt-8">
//           <Link href="/gallery" legacyBehavior>
//             <a className="text-blue-500 hover:underline">View More</a>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ImageGallery;

// import React from 'react';
// import Link from 'next/link';

// const ImageGallery = () => {
//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container mx-auto">
//         <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
//             <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Featured </span>
//             <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Moment</span>
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-0">
//           {[...Array(18)].map((_, index) => (
//             <div key={index} className="relative overflow-hidden">
//               <img
//                 src={`https://source.unsplash.com/800x600/?children,${index}`}
//                 alt={`Image ${index}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="text-right mt-8 max-w-7xl mx-auto px-4">
//           <Link href="/gallery" legacyBehavior>
//             <a className="text-[#9CCF30] hover:underline">View More &gt;&gt;&gt;</a>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ImageGallery;

"use client"
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { client } from '@/sanityClient';

// const fetchFeaturedImages = async () => {
//   const query = `*[_type == "imageGallery" && category == "featured"][0...18]{
//     _id,
//     title,
//     images[]{
//       asset->{
//         url
//       },
//       caption
//     }
//   }`;
//   const galleries = await client.fetch(query);
//   const images = galleries.flatMap(gallery => gallery.images.map(image => ({
//     ...image,
//     title: gallery.title,
//     galleryId: gallery._id,
//   })));
//   return images;
// };

// const FeaturedImages = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const getImages = async () => {
//       const fetchedImages = await fetchFeaturedImages();
//       setImages(fetchedImages);
//     };
//     getImages();
//   }, []);

//   return (
//     <section className="bg-gray-100 py-8">
//       <div className="container mx-auto">
//         <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
//           <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Featured </span>
//           <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Moment</span>
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-0">
//           {images.slice(0, 18).map((image, index) => (
//             <div key={index} className="relative overflow-hidden">
//               <img
//                 src={image.asset.url}
//                 alt={image.caption || `Image ${index}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="text-right mt-8 max-w-7xl mx-auto px-4">
//           <Link href="/gallery" legacyBehavior>
//             <a className="text-[#9CCF30] hover:underline">View More &gt;&gt;&gt;</a>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedImages;

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { client } from '@/sanityClient';

const fetchFeaturedImages = async () => {
  const query = `*[_type == "imageGallery" && category == "featured"][0...18]{
    _id,
    title,
    images[]{
      asset->{
        url
      },
      caption
    }
  }`;
  const galleries = await client.fetch(query);
  const images = galleries.flatMap(gallery => gallery.images.map(image => ({
    ...image,
    title: gallery.title,
    galleryId: gallery._id,
  })));
  return images;
};

const FeaturedGallery = () => {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const getImages = async () => {
      const fetchedImages = await fetchFeaturedImages();
      setImages(fetchedImages);
    };
    getImages();
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
          <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Featured </span>
          <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Moment</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-0.5">
          {images.slice(0, 18).map((image, index) => (
            <div key={index} className="relative overflow-hidden group cursor-pointer" onClick={() => openLightbox(index)}>
              <img
                src={image.asset.url}
                alt={image.caption || `Image ${index}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        <div className="text-right mt-8 max-w-7xl mx-auto px-4">
          <Link href="/gallery" legacyBehavior>
            <a className="text-[#9CCF30] hover:underline">View More &gt;&gt;&gt;</a>
          </Link>
        </div>
      </div>
      {lightboxOpen && (
        <Lightbox
          slides={images.map((img) => ({ src: img.asset.url, alt: img.caption }))}
          open={lightboxOpen}
          index={lightboxIndex}
          close={() => setLightboxOpen(false)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </section>
  );
};

export default FeaturedGallery;
