"use client"
import React from 'react';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 my-8">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        <div className="relative w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="relative h-64">
            <Image
              src="/images/rccghdp-banner3.jpg"
              alt="Church 1"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 w-40 lg:h-56 lg:w-56">
            <Image
              src="/images/rccghdp-banner2.jpg"
              alt="Church 2"
              layout="fill"
              objectFit="cover"
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-1">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Get in Touch</h3>
            <p className="text-gray-700">We&apos;d love to hear from you! Please reach out with any questions or concerns.</p>
            <p><strong>Phone:</strong> +234 706 4700115</p>
            <p><strong>Email:</strong> contact@rccghdplace.org</p>
            <p><strong>Address:</strong> 2nd Floor Ajebo Building Adjacent Akintonde Arcade New Market Road, Ijebu-Ode, Ogun.</p>
          </div>
        </div>
      </div>
      <div className="w-full h-96 my-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6217010647874!2d3.9102890252004454!3d6.815781993181863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103968adb2b78415%3A0xc1ab6664f7169e74!2sAjebo%20Building%20Ijebu%20Ode!5e0!3m2!1sen!2sng!4v1717258869611!5m2!1sen!2sn"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;

