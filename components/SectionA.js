"use client"
import React from 'react';
import { useRouter } from 'next/navigation';


const OverlappingBoxes = () => {
  const router = useRouter();

  const handleBoxClick = (link) => {
    router.push(link);
  };

  return (
    <div className='m-20'>
      <h2 className="text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text">Our </span>
            <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text">Creed</span>
        </h2>
      <div className="relative -top-[50%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="bg-[#BF9930] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box1')}
        >
          <h2 className="text-2xl font-bold mb-4">We believe </h2>
          <p>In the triune nature of God: Father, Son, and Holy Spirit, existing eternally in perfect unity and equality.</p>
        </div>
        <div
          className="bg-[#98CE33] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box2')}
        >
          <h2 className="text-2xl font-bold mb-4">We believe</h2>
          <p>In the deity of Jesus Christ, His virgin birth, sinless life, sacrificial death, bodily resurrection, ascension to heaven, and imminent return in power and glory.</p>
        </div>
        <div
          className="bg-[#BF9930] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box3')}
        >
          <h2 className="text-2xl font-bold mb-4">We believe</h2>
          <p>In the empowering work of the Holy Spirit, who convicts, regenerates, sanctifies, and empowers believers for Christian service and holy living.</p>
        </div>
        <div
          className="bg-[#98CE33] text-black px-6 py-8 rounded-lg shadow-lg min-h-[300px] cursor-pointer"
          onClick={() => handleBoxClick('/box4')}
        >
          <h2 className="text-2xl font-bold mb-4">We believe</h2>
          <p>In the authority and inspiration of the Bible as the infallible Word of God, providing guidance, instruction, and revelation for faith and practice in the life of the believer and the church.</p>
        </div>
      </div>
    </div>
  );
};

export default OverlappingBoxes;