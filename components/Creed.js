"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Creed = () => {
  const router = useRouter();

  const handleBoxClick = (link) => {
    router.push(link);
  };

  return (
    <div className='my-20'>
      <h2 className="text-3xl md:text-3xl lg:text-5xl  font-bold text-center mb-10">
        <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Mission &</span>
        <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text" style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}>Vision</span>
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        {/* First Row */}
        <div
          className="bg-[#BF9930] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box1')}
        >
          <h2 className="text-2xl font-bold mb-4">To make heaven.</h2>
          <p>To accomplish this objective, holiness will be our lifestyle.</p>
        </div>
        <div
          className="bg-[#98CE33] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box2')}
        >
          <h2 className="text-2xl font-bold mb-4">To take as many people with us.</h2>
          <p>We will accomplish this by evangelism and discipleship.</p>
        </div>
        <div
          className="bg-[#BF9930] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box3')}
        >
          <h2 className="text-2xl font-bold mb-4">To have a member of RCCG in every family of all nations.</h2>
          <p>We will accomplish this by planting churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.</p>
        </div>
        {/* Second Row */}
        <div
          className="bg-[#98CE33] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box4')}
        >
          <h2 className="text-2xl font-bold mb-4">To accomplish No. 1 above, holiness will be our lifestyle.</h2>
          <p>Holiness will be our lifestyle.</p>
        </div>
        <div
          className="bg-[#BF9930] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box5')}
        >
          <h2 className="text-2xl font-bold mb-4">We will pursue these objectives until every Nation in the world is reached for the Lord Jesus Christ.</h2>
          <p>Every nation will be reached for the Lord Jesus Christ.</p>
        </div>
        <div
          className="bg-[#98CE33] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box6')}
        >
          <h2 className="text-2xl font-bold mb-4">To plant churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.</h2>
          <p>Church planting strategy for all cities and towns.</p>
        </div>
      </div>
    
    </div>
  );
};

export default Creed;


