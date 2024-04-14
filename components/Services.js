import React from 'react';

const ChurchServices = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container p-4 border border-gray-300 rounded-lg max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 border-b-2 border-gray-300 pb-2">Church Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Sunday Worship</h3>
            <p className="text-gray-600">Join us every Sunday for a time of worship and fellowship.</p>
            <button className="bg-[#9ACD35] text-white px-4 py-2 rounded-lg mt-4">Worship With Us</button>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Midweek Service</h3>
            <p className="text-gray-600">Join us for our midweek service for a time of prayer and reflection.</p>
            <button className="bg-[#9ACD35] text-white px-4 py-2 rounded-lg mt-4">Worship With Us</button>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Youth Group</h3>
            <p className="text-gray-600">Our youth group meets every Friday for fun activities and learning.</p>
            <button className="bg-[#9ACD35] text-white px-4 py-2 rounded-lg mt-4">Worship With Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchServices;
