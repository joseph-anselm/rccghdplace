"use client"
import React, { useState } from 'react';

const departments = [
  {
    name: 'Music Department',
    head: 'Precious Timekoru',
    phone: '123-456-7890',
    description: 'By the agency of the Holy Spirit, we create an atmosphere of true worship, lead and teach congregations new and seasoned songs, and select songs that align with the sermon themes.'
  },
  {
    name: 'Media Department',
    head: 'Eluyode Victor A',
    phone: '234-567-8901',
    description: 'We have 3 main units that are responsible for projecting the church on the media space namely, Photography and Graphics Design, Content Creation, and Videography.'
  },
  {
    name: 'Finance and Internal Control Department',
    head: 'Pastor Wale Adeneye',
    phone: '345-678-9012',
    description: 'The department is comprised of 4 Units namely, Finance, Ushering, Greeters, and Protocols.'
  },
//   {
//     name: 'Creativity and Interior Decorations',
//     head: 'Mary Major',
//     phone: '456-789-0123',
//     description: 'Designs and decorates the church interior for various events.'
//   },
  {
    name: 'Sounds and Technical Department',
    head: 'Adams Moses',
    phone: '567-890-1234',
    description: 'We are responsible for sound management; sound equipment purchases and other related assignment.'
  },
  {
    name: 'Transport and Logistics Department',
    head: 'Godbless Emmanuel ',
    phone: '678-901-2345',
    description: 'We are responsible for transporting members from different locations to church and ensuring members arrive on time for services.'
  },
//   {
//     name: 'Sanitation Department',
//     head: 'Michael Bay',
//     phone: '789-012-3456',
//     description: 'Ensures the church premises are clean and well-maintained.'
//   },
  {
    name: 'Children Affairs Department',
    head: 'Otame Kehinde',
    phone: '890-123-4567',
    description: 'Raising God-fearing children that will dominate in all spheres of influence.'
  },
  {
    name: 'Training Department',
    head: 'Deacon Sadiq Isaiah',
    phone: '901-234-5678',
    description: 'Our primary assignment is to focus on ministering the word to individuals, nurture them from the grassroots to all levels of discipleship and maturity, and develop a deliberate strategy for complementing and reinforcing the spiritual quality of members of the Church.'
  },
  {
    name: 'Establishment Department',
    head: 'Mayowa Osibeluwo',
    phone: '012-345-6789',
    description: 'This comprises a prayer hub and follow-up unit. The responsibility of the prayer hub is to raise incense and intercessory cries for the prosperity and advancement of the church across the landscape. The follow-up unit is responsible for contacting first-time worshippers and converts during services and evangelism.'
  },
  {
    name: 'Welfare and Hospitality Department',
    head: 'Pastor (Mrs.) Sade Doh',
    phone: '123-456-7890',
    description: "We're responsible for the general welfare of first-timers, members, and workers in the church"
  },
//   {
//     name: 'Medical Department',
//     head: 'Thomas Knight',
//     phone: '234-567-8901',
//     description: 'Provides medical support and organizes health programs.'
//   },
//   {
//     name: 'Family Affairs Department',
//     head: 'Sarah Duke',
//     phone: '345-678-9012',
//     description: 'Manages programs and support for families within the church.'
//   },
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
        {/* <p className="text-gray-800"><strong>Contact Number:</strong> {departments[activeTab].phone}</p> */}
        <p className="text-gray-600 mt-4">{departments[activeTab].description}</p>
      </div>
    </div>
  );
};

export default DepartmentsTabs;
