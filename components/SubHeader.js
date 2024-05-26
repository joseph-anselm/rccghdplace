"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import capitalize from 'lodash/capitalize';

const SubHeader = ({ title, backgroundImage }) => {
  const router = useRouter();

  // Function to create breadcrumb items from the path
  const createBreadcrumbs = () => {
    if (!router.pathname) return [];
    const pathParts = router.pathname.split('/').filter(part => part);
    const breadcrumbs = pathParts.map((part, index) => {
      const href = '/' + pathParts.slice(0, index + 1).join('/');
      return {
        label: capitalize(part.replace(/-/g, ' ')),
        href: href
      };
    });

    return breadcrumbs;
  };

  const breadcrumbs = createBreadcrumbs();

  return (
    <div className="relative h-64 md:h-96">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={`${title} Background`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4">
        <nav className="text-sm mb-2">
          <Link href="/" legacyBehavior>
            <a className="hover:underline">Home</a>
          </Link>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <span className="mx-2">/</span>
              {index < breadcrumbs.length - 1 ? (
                <Link href={item.href} legacyBehavior>
                  <a className="hover:underline">{item.label}</a>
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="text-3xl md:text-5xl font-bold text-center">{title}</h1>
      </div>
    </div>
  );
};

export default SubHeader;

