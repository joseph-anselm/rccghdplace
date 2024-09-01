// components/Modal.js
import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-end sm:items-center">
      <div className="bg-gray-500 bg-opacity-75 transition-opacity fixed inset-0" aria-hidden="true" />

      <div className="bg-white rounded-t-lg sm:rounded-lg overflow-hidden shadow-xl transform transition-all w-full sm:max-w-lg sm:my-8">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
