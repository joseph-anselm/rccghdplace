// "use client"
// import { useState, useEffect } from 'react';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
// import { client } from '@/sanityClient';


// const tabs = [
//   { name: 'All', category: '' },
//   { name: 'Featured Moments', category: 'featured' },
//   { name: 'Sunday Services', category: 'sunday' },
//   { name: 'Midweek', category: 'midweek' },
//   { name: 'Special Programs', category: 'special' },
// ];

// const fetchImages = async (category) => {
//   const query = `*[_type == "imageGallery" ${category ? `&& category == "${category}"` : ''}]{
//     _id,
//     title,
//     "imageUrl": image.asset->url
//   }`;
//   const images = await client.fetch(query);
//   return images;
// };

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [activeTab, setActiveTab] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [imagesPerPage] = useState(8);
//   const [lightboxIndex, setLightboxIndex] = useState(-1);

//   useEffect(() => {
//     const getImages = async () => {
//       const fetchedImages = await fetchImages(activeTab);
//       setImages(fetchedImages);
//     };
//     getImages();
//   }, [activeTab]);

//   useEffect(() => {
//     const indexOfLastImage = currentPage * imagesPerPage;
//     const indexOfFirstImage = indexOfLastImage - imagesPerPage;
//     setFilteredImages(images.slice(indexOfFirstImage, indexOfLastImage));
//   }, [images, currentPage, imagesPerPage]);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-center mb-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.name}
//             className={`mx-2 px-4 py-2 rounded ${activeTab === tab.category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => {
//               setActiveTab(tab.category);
//               setCurrentPage(1);
//             }}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {filteredImages.map((image, index) => (
//           <div key={image._id} className="relative">
//             <img
//               src={image.imageUrl}
//               alt={image.title}
//               className="object-cover w-full h-full cursor-pointer"
//               onClick={() => setLightboxIndex(index)}
//             />
//           </div>
//         ))}
//       </div>
//       {lightboxIndex >= 0 && (
//         <Lightbox
//           mainSrc={filteredImages[lightboxIndex].imageUrl}
//           nextSrc={filteredImages[(lightboxIndex + 1) % filteredImages.length].imageUrl}
//           prevSrc={filteredImages[(lightboxIndex + filteredImages.length - 1) % filteredImages.length].imageUrl}
//           onCloseRequest={() => setLightboxIndex(-1)}
//           onMovePrevRequest={() =>
//             setLightboxIndex((lightboxIndex + filteredImages.length - 1) % filteredImages.length)
//           }
//           onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
//         />
//       )}
//       <div className="flex justify-center mt-4">
//         {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map((number) => (
//           <button
//             key={number + 1}
//             className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => paginate(number + 1)}
//           >
//             {number + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;

// "use client"
// import { useState, useEffect } from 'react';
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
// import { client } from '@/sanityClient';

// const tabs = [
//   { name: 'All', category: '' },
//   { name: 'Featured Moments', category: 'featured' },
//   { name: 'Sunday Services', category: 'sunday' },
//   { name: 'Midweek', category: 'midweek' },
//   { name: 'Special Programs', category: 'special' },
// ];

// const fetchImages = async (category) => {
//   const query = `*[_type == "imageGallery" ${category ? `&& category == "${category}"` : ''}]{
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

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [activeTab, setActiveTab] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [imagesPerPage] = useState(8);
//   const [lightboxIndex, setLightboxIndex] = useState(-1);

//   useEffect(() => {
//     const getImages = async () => {
//       const fetchedImages = await fetchImages(activeTab);
//       setImages(fetchedImages);
//     };
//     getImages();
//   }, [activeTab]);

//   useEffect(() => {
//     const indexOfLastImage = currentPage * imagesPerPage;
//     const indexOfFirstImage = indexOfLastImage - imagesPerPage;
//     setFilteredImages(images.slice(indexOfFirstImage, indexOfLastImage));
//   }, [images, currentPage, imagesPerPage]);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container px-4 py-8 max-w-7xl mx-auto">
//       <div className="flex justify-center mb-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.name}
//             className={`mx-2 px-4 py-2 rounded ${activeTab === tab.category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => {
//               setActiveTab(tab.category);
//               setCurrentPage(1);
//             }}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>
//       <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
//         {filteredImages.map((image, index) => (
//           <div key={image.galleryId + index} className="relative">
//             <img
//               src={image.asset.url}
//               alt={image.caption || image.title}
//               className="object-cover w-full h-full cursor-pointer"
//               onClick={() => setLightboxIndex(index)}
//             />
//           </div>
//         ))}
//       </div>
//       {lightboxIndex >= 0 && (
//         <Lightbox
//           mainSrc={filteredImages[lightboxIndex].asset.url}
//           nextSrc={filteredImages[(lightboxIndex + 1) % filteredImages.length].asset.url}
//           prevSrc={filteredImages[(lightboxIndex + filteredImages.length - 1) % filteredImages.length].asset.url}
//           onCloseRequest={() => setLightboxIndex(-1)}
//           onMovePrevRequest={() =>
//             setLightboxIndex((lightboxIndex + filteredImages.length - 1) % filteredImages.length)
//           }
//           onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
//         />
//       )}
//       <div className="flex justify-center mt-4">
//         {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map((number) => (
//           <button
//             key={number + 1}
//             className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => paginate(number + 1)}
//           >
//             {number + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;


"use client";
import { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { client } from "@/sanityClient";

const tabs = [
  { name: "All", category: "" },
  { name: "Featured Moments", category: "featured" },
  { name: "Sunday Services", category: "sunday" },
  { name: "Midweek", category: "midweek" },
  { name: "Special Programs", category: "special" },
];

const fetchImages = async (category) => {
  const query = `*[_type == "imageGallery" ${
    category ? `&& category == "${category}"` : ""
  }]{
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
  const images = galleries.flatMap((gallery) =>
    gallery.images.map((image) => ({
      ...image,
      title: gallery.title,
      galleryId: gallery._id,
    }))
  );
  return images;
};

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const getImages = async () => {
      const fetchedImages = await fetchImages(activeTab);
      setImages(fetchedImages);
    };
    getImages();
  }, [activeTab]);

  useEffect(() => {
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    setFilteredImages(images.slice(indexOfFirstImage, indexOfLastImage));
  }, [images, currentPage, imagesPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-center mb-4 space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`mx-2 mb-2 px-4 py-2 rounded ${
              activeTab === tab.category ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab(tab.category);
              setCurrentPage(1);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredImages.map((image, index) => (
          <div key={image.galleryId + index} className="relative">
            <img
              src={image.asset.url}
              alt={image.caption || image.title}
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            />
          </div>
        ))}
      </div>
      {lightboxIndex >= 0 && (
        <Lightbox
          mainSrc={filteredImages[lightboxIndex].asset.url}
          nextSrc={
            filteredImages[(lightboxIndex + 1) % filteredImages.length].asset
              .url
          }
          prevSrc={
            filteredImages[
              (lightboxIndex + filteredImages.length - 1) % filteredImages.length
            ].asset.url
          }
          onCloseRequest={() => setLightboxIndex(-1)}
          onMovePrevRequest={() =>
            setLightboxIndex(
              (lightboxIndex + filteredImages.length - 1) %
                filteredImages.length
            )
          }
          onMoveNextRequest={() =>
            setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
          }
        />
      )}
      <div className="flex justify-center mt-4 space-x-1">
        {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === number + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
