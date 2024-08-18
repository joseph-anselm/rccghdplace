// components/SubHeader.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SubHeader = ({ title, imageUrl }) => {
  return (
    <div className="relative h-80 w-full">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-2xl md:text-4xl sm:text-2xl font-bold">{title}</h1>
        <Link href="/blog-updates" legacyBehavior>
            <a className="hover:underline">Blogs and Updates &gt;&gt;&gt;</a>
          </Link>
      </div>
    </div>
  );
};

export default SubHeader;
