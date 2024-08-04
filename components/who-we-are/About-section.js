// components/AboutUsSection.js
import React from 'react';
import Image from 'next/image';

const AboutUsSection = () => {
  return (
    <section className=" max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:space-x-8 space-y-8 md:space-y-0">
        <div className="md:hidden">
          <Image
            src="/images/psd.png" // Replace with the actual path to the pastor's image
            alt="Pastor"
            width={500}
            height={500}
            className="rounded-tl-[50px] rounded-br-[50px] object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-3xl font-handwriting text-[#9CCF30] mb-4">Welcome to RRCG - His Dwelling Place</h3>
          <p className="text-lg text-gray-700 mb-4">
          Hey there, and welcome to HDPLACE! We’re absolutely thrilled to have you with us. Whether you’re here for the worship, the community, or just the snacks, we’ve got you covered. 
          </p>
          <p className="text-lg text-gray-700 mb-4">
          Our mission?
          To raise kingdom role models who will dominate all spheres of influence

          </p>
          <p className="text-lg text-gray-700 mb-4">
          At HDPLACE, we’re all about creating a supportive and inclusive vibe where everyone can grow in their spiritual journey—and have some fun while we’re at it. We believe church should be a place where you feel right at home, and we’re dedicated to making sure you do.  </p>
            <p className="text-lg text-gray-700 mb-4">
            Don’t be shy—jump right in and get involved! Whether you’ve got a knack for singing, a talent for organizing, or just love meeting new people, there’s a place for you here. We’re a big family, and we can’t wait to see how you’ll add to the awesomeness.

            So, sit back, relax, and let’s make some incredible memories together. And remember, at HDPLACE, you’re not just a visitor—you’re family. Let’s grow, laugh, and spread some love together!


          </p>
        <p className="text-xl font-handwriting text-[#9CCF30]">Pastor Sam & Sade Doh<br></br>
          Lead Pastor, RCCG, HIS DWELLING PLACE, MEGA YOUTH CHURCH.</p>
        </div>
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/images/psd.png" // Replace with the actual path to the pastor's image
            alt="Pastor"
            width={500}
            height={500}
            className="rounded-tl-[50px] rounded-br-[50px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
