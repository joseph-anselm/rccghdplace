import React from 'react';
import Link from 'next/link';

const AboutUsHeader = () => {
  return (
    <div className="relative h-64 md:h-96">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://source.unsplash.com/1600x900/?nature,landscape" // Replace with your image URL
          alt="About Us Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4">
        <nav className="text-sm mb-2">
          <Link href="/" legacyBehavior>
            <a className="hover:underline">Home</a>
          </Link>
          <span className="mx-2">/</span>
          <span>About Us</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-bold text-center">About Us</h1>
      </div>
    </div>
  );
};

export default AboutUsHeader;
