import React from 'react';
import SubHeader from '@/components/SubHeader';
import ImageGallery from '@/components/GalleryGroup';

const Gallery = () => {
  return (
    <div>
      <SubHeader
        title="Gallery and Moments"
        backgroundImage="https://source.unsplash.com/1600x900/?joyful-youth-christians-Africans" // Replace with your image URL
      />
   <ImageGallery />
    </div>
  );
};

export default Gallery;