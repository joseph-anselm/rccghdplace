"use client"

import Creed from '@/components/Creed';
import FeaturedBlogCard from '@/components/FeaturedBlog';
import FeaturedGallery from '@/components/Gallery';
import Header from '@/components/Header';
import ChurchServices from '@/components/Services';
import HDPVision from '@/components/hdpVision';
import React from 'react';
import ThreeColumnSection from '@/components/ThreeColumn';




const Home = () => {
  return (
    <div >
     <Header />
     <Creed />
     <HDPVision />
     <ChurchServices />
     <FeaturedGallery />
     <FeaturedBlogCard />
     <ThreeColumnSection />    
    </div>
  );
};

export default Home;

