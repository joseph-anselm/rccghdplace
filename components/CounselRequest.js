'use client'
import React, { useState } from 'react';

const CounselingRequestPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    whatsapp: '',
    message: '',
    timeToReach: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/sendCounselRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setSuccessMessage('Your request has been submitted successfully!');
      setFormData({
        name: '',
        email: '',
        telephone: '',
        whatsapp: '',
        message: '',
        timeToReach: '',
      });
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto max-w-lg px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Request Counseling</h2>
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="telephone">
              Telephone
            </label>
            <input
              type="tel"
              name="telephone"
              id="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="whatsapp">
              WhatsApp Number
            </label>
            <input
              type="tel"
              name="whatsapp"
              id="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="timeToReach">
              Best Time to Reach You
            </label>
            <input
              type="text"
              name="timeToReach"
              id="timeToReach"
              value={formData.timeToReach}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#9CCF30] text-white rounded-lg hover:bg-[#86b829] focus:outline-none focus:ring-2 focus:ring-[#9CCF30]"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CounselingRequestPage;
