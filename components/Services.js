import React from 'react';

const ChurchServices = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container p-1 border border-gray-300 rounded-lg max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center mb-10">
          <span
            className="bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text"
            style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}
          >
            Church </span>
          <span
            className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text"
            style={{ textStroke: "1px rgba(0,0,0,0.5)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}
          >Services</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Sunday Worship</h3>
            <p className="text-gray-600">Join us every Sunday for a time of worship and fellowship.</p>
            <p className="text-lg font-bold text-gray-800 mt-2">Time: 08:00 AM & 10:00 AM</p>
            <button className="bg-[#9ACD35] text-white px-4 py-2 rounded-lg mt-4">Worship With Us</button>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Wednesday Service</h3>
            <p className="text-gray-600">Join us for our midweek service for a time of prayer and reflection.</p>
            <p className="text-lg font-bold text-gray-800 mt-2">Time: 6:00 PM - 8:00 PM</p>
            <button className="bg-[#9ACD35] text-white px-4 py-2 rounded-lg mt-4">Worship With Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchServices;

