"use client"
import React, { useState } from 'react';

const departments = [
  {
    name: 'Music Department',
    head: 'John Doe',
    phone: '123-456-7890',
    description: 'Responsible for all musical activities and choir management.'
  },
  {
    name: 'Media Department',
    head: 'Jane Smith',
    phone: '234-567-8901',
    description: 'Handles all media-related tasks, including video and audio recording.'
  },
  {
    name: 'Finance and Internal Control Department',
    head: 'Richard Roe',
    phone: '345-678-9012',
    description: 'Manages church finances and ensures internal controls are in place.'
  },
  {
    name: 'Creativity and Interior Decorations',
    head: 'Mary Major',
    phone: '456-789-0123',
    description: 'Designs and decorates the church interior for various events.'
  },
  {
    name: 'Sounds and Technical Department',
    head: 'James Minor',
    phone: '567-890-1234',
    description: 'Takes care of the sound systems and technical equipment.'
  },
  {
    name: 'Transport and Logistics Department',
    head: 'Patricia Lane',
    phone: '678-901-2345',
    description: 'Organizes transportation and logistics for church events.'
  },
  {
    name: 'Sanitation Department',
    head: 'Michael Bay',
    phone: '789-012-3456',
    description: 'Ensures the church premises are clean and well-maintained.'
  },
  {
    name: 'Children Affairs Department',
    head: 'Anna Bell',
    phone: '890-123-4567',
    description: 'Oversees activities and programs for children in the church.'
  },
  {
    name: 'Training Department',
    head: 'David King',
    phone: '901-234-5678',
    description: 'Provides training and development programs for church members.'
  },
  {
    name: 'Establishment Department',
    head: 'Victor Queen',
    phone: '012-345-6789',
    description: 'Handles the establishment and infrastructure of the church.'
  },
  {
    name: 'Welfare and Hospitality Department',
    head: 'Emily Crown',
    phone: '123-456-7890',
    description: 'Responsible for the welfare and hospitality of church members and visitors.'
  },
  {
    name: 'Medical Department',
    head: 'Thomas Knight',
    phone: '234-567-8901',
    description: 'Provides medical support and organizes health programs.'
  },
  {
    name: 'Family Affairs Department',
    head: 'Sarah Duke',
    phone: '345-678-9012',
    description: 'Manages programs and support for families within the church.'
  },
];

const DepartmentsTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Church Departments</h2>
      <div className="flex flex-wrap justify-center mb-4">
        {departments.map((department, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 m-2 text-white rounded ${
              activeTab === index ? 'bg-green-500' : 'bg-[#98CE2F]'
            } focus:outline-none`}
          >
            {department.name}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">{departments[activeTab].name}</h3>
        <p className="text-gray-800"><strong>Person in Charge:</strong> {departments[activeTab].head}</p>
        <p className="text-gray-800"><strong>Contact Number:</strong> {departments[activeTab].phone}</p>
        <p className="text-gray-600 mt-4">{departments[activeTab].description}</p>
      </div>
    </div>
  );
};

export default DepartmentsTabs;
