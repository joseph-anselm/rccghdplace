// components/Give.js
import React from 'react';

const Give = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Church Account Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Purpose: Donations</h3>
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="md:w-1/3">
              <p className="font-medium">Bank Name:</p>
            </div>
            <div className="md:w-2/3">
              <p>Zenith Bank</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="md:w-1/3">
              <p className="font-medium">Account Number:</p>
            </div>
            <div className="md:w-2/3">
              <p>1017398926</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/3">
              <p className="font-medium">Account Name:</p>
            </div>
            <div className="md:w-2/3">
              <p>RCCG His Dwelling Place</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Purpose: Donations</h3>
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="md:w-1/3">
              <p className="font-medium">Bank Name:</p>
            </div>
            <div className="md:w-2/3">
              <p>Zenith Bank</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="md:w-1/3">
              <p className="font-medium">Account Number:</p>
            </div>
            <div className="md:w-2/3">
              <p>017398919</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/3">
              <p className="font-medium">Account Name:</p>
            </div>
            <div className="md:w-2/3">
              <p>RCCG His Dwelling Place Project</p>
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Thank you for your generous donations. Your support helps us continue our mission and reach out to more people. Always Ensure to include a reference / give purpose when sending to the account numbers 
        </p>
      </div>
    </div>
  );
};

export default Give;
