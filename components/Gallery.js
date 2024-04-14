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

import React from 'react';
import Link from 'next/link';

const ImageGallery = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Featured </span>
            <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Moment</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-0">
          {[...Array(18)].map((_, index) => (
            <div key={index} className="relative overflow-hidden">
              <img
                src={`https://source.unsplash.com/800x600/?children,${index}`}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
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
    </section>
  );
};

export default ImageGallery;



