import React from 'react';
import SubHeader from '@/components/SubHeader';
import ImageGallery from '@/components/GalleryGroup';

const Gallery = () => {
  return (
    <div>
      <SubHeader
        title="Gallery and Moments"
        backgroundImage="/Images/Gallery.jpg" 
      />
   <ImageGallery />
    </div>
  );
};

export default Gallery;