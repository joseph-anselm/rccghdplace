"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <footer className="bg-gray-600 text-white mt-8">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4">
            <div className="mb-4 flex flex-col items-start">
              <Link href="/" legacyBehavior>
                <a className="mb-4">
                  <Image
                    src="/images/rccghdp-logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-auto h-20"
                  />
                </a>
              </Link>
              
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              eget ligula et nisi egestas placerat.
            </p>
            <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <FaInstagram size={20} />
                </a>
              </div>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Blogs</h2>
            <ul className="list-unstyled">
              <li>
                <Link href="/blog/1" legacyBehavior>
                  <a className="text-gray-400 hover:text-gray-500">Blog 1</a>
                </Link>
              </li>
              <li>
                <Link href="/blog/2" legacyBehavior>
                  <a className="text-gray-400 hover:text-gray-500">Blog 2</a>
                </Link>
              </li>
              <li>
                <Link href="/blog/3" legacyBehavior>
                  <a className="text-gray-400 hover:text-gray-500">Blog 3</a>
                </Link>
              </li>
              <li>
                <Link href="/blog/3" legacyBehavior>
                  <a className="text-gray-400 hover:text-gray-500">Blog 4</a>
                </Link>
              </li>
              <li>
                <Link href="/blog/3" legacyBehavior>
                  <a className="text-gray-400 hover:text-gray-500">Blog 5</a>
                </Link>
              </li>
              <li>
                <Link href="/blog/3" legacyBehavior>
                  <a className="text-gray-400 hover:text-gray-500">Blog 6</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Contact</h2>
            <p className="mb-2">Address: Ajebo Building, New Market, Ijebu Ode</p>
            <p className="mb-2">
              <AiOutlineMail className="inline mr-1" />
              <span className="text-gray-400">info@rccghdp.org</span>
            </p>
            <p className="mb-2">Phone: (+234) 803-2516519</p>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h2 className="mb-4 text-lg font-semibold">Subscribe - We don&apos;t spam</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#9ACD35] hover:bg-[#8db440] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-white text-center py-2 mt-4">
        Copyright © 2024 RCCG - His Dwelling Place. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;