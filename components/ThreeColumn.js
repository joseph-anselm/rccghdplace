// components/ThreeColumnSection.js
import Link from 'next/link';
import React from 'react';
import { FaPray, FaComment, FaHandsHelping } from 'react-icons/fa';

const ThreeColumnSection = () => {
  return (
    <section className="bg-gray-200 py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Get Counsel */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaPray className="text-4xl text-[#9CCF30] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Get Counsel</h3>
            <p className="text-gray-600 mb-4">
              Need guidance or prayer? Our pastors and counselors are here to help you navigate life&apos;s challenges.
            </p>
            <button className="bg-[#9CCF30] text-white py-2 px-6 rounded-full hover:bg-[#86b829]">
              Learn More
            </button>
          </div>

          {/* Testimonies or Feedback */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaComment className="text-4xl text-[#9CCF30] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Testimonies or Feedback</h3>
            <p className="text-gray-600 mb-4">
              Share your story or provide feedback to help us grow together as a community of faith.
            </p>
            <Link href='/testimony-feedback'>
            <button className="bg-[#9CCF30] text-white py-2 px-6 rounded-full hover:bg-[#86b829]">
              Share Your Story
            </button>
            </Link>
          </div>

          {/* Opportunities */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaHandsHelping className="text-4xl text-[#9CCF30] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Jobs / Opportunities</h3>
            <p className="text-gray-600 mb-4">
            Discover opportunities, from volunteering and well-paying jobs to career advancement and more.
            </p>
            <Link href="/job-opportunities">
            <button className="bg-[#9CCF30] text-white py-2 px-6 rounded-full hover:bg-[#86b829]">
              See Openings
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeColumnSection;
