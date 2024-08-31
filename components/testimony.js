"use client";
import React, { useState, useEffect } from 'react';
import { client } from '@/sanityClient';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid'; 

const TestimoniesPage = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageType: 'testimony',
    message: '',
    anonymous: false,
  });

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const query = `*[_type == "testimonyFeedback" && messageType == "testimony"] | order(_createdAt desc) {
          _id,
          name,
          message,
          anonymous,
          _createdAt
        }`;
        const data = await client.fetch(query);
        setTestimonies(data);
      } catch (error) {
        console.error('Error fetching testimonies:', error);
      }
    };
    fetchTestimonies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.create({
        _type: 'testimonyFeedback',
        ...formData,
      });
      setFormData({
        name: '',
        email: '',
        messageType: 'testimony',
        message: '',
        anonymous: false,
      });
      // Refresh testimonies list after submission
      const updatedTestimonies = await client.fetch(`*[_type == "testimonyFeedback" && messageType == "testimony"] | order(_createdAt desc)`);
      setTestimonies(updatedTestimonies);
    } catch (error) {
      console.error('Error submitting testimony:', error);
    }
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Testimonies</h2>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-md mb-8">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full md:w-1/5 p-2 border border-gray-300 rounded mb-4 md:mb-0 mr-[2px]"
            disabled={formData.anonymous}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full md:w-1/5 p-2 border border-gray-300 rounded mb-4 md:mb-0"
            disabled={formData.anonymous}
            required
          />
          <textarea
            placeholder="Your Testimony or Feedback"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full md:w-2/5 p-2 border border-gray-300 rounded mb-6 md:mb-0"
            required
          ></textarea>
          <div className="w-full md:w-1/5 flex items-center">
            <input
              type="checkbox"
              checked={formData.anonymous}
              onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
              className="mr-2"
            />
            <label>Submit Anonymously</label>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto mt-6 md:mt-0 px-4 py-2 bg-[#9CCF30] text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
        </form>

        {/* Testimonies List */}
        {testimonies.length > 0 ? (
          <div className="space-y-4 bg-white">
            {testimonies.map((testimony) => (
              <Disclosure key={testimony._id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gold bg-gold-light rounded-lg hover:bg-gold-dark focus:outline-none focus-visible:ring focus-visible:ring-gold focus-visible:ring-opacity-75">
                      <span>
                        {testimony.anonymous ? 'Anonymous' : testimony.name} - {new Date(testimony._createdAt).toLocaleDateString()}
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gold`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                      {testimony.message}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No testimonies found.</div>
        )}
      </div>
    </section>
  );
};

export default TestimoniesPage;
