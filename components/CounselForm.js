// components/CounselForm.js
import React, { useState } from 'react';

const CounselForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    setError('');
    try {
      const response = await fetch('/api/sendCounselRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Error submitting counsel request:', error);
      setError('Error submitting request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700">Message</label>
        <textarea
          className="w-full px-4 py-2 border rounded-md"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-[#9CCF30] hover:bg-[#86b829] text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default CounselForm;
