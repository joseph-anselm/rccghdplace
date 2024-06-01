// components/Services.js
"use client"
import React, { useState, useEffect } from 'react';
import client, { urlFor } from '@/sanityClient';
import Image from 'next/image';



const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const query = `*[_type == "service"] | order(date asc) {
        _id,
        title,
        date,
        time,
        description,
        thumbnail{
          asset->{
            _id,
            url
          }
        }
      }`;
      const data = await client.fetch(query);
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Services & Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-6 rounded-lg shadow-md">
            {service.thumbnail && (
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={urlFor(service.thumbnail).url()}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-2">{new Date(service.date).toLocaleDateString()} at {service.time}</p>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
