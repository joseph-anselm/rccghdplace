// "use client"

// import { useState, useEffect } from 'react';
// import { Disclosure } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import Image from 'next/image';


// const navigation = [
//   { name: 'Home', href: '/', current: true },
//   { name: 'Program and Events', href: '/program-events', current: false },
//   { name: 'Who we are', href: '/who-we-are', current: false },
//   { name: 'Contact us', href: '/contact-us', current: false },
//   { name: 'Gallery', href: '/gallery', current: false },
//   { name: 'Blogs and updates', href: '/blog-updates', current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export default function Navbar() {
//   const [scrolling, setScrolling] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const isScrolling = scrollTop > 50;
//       setScrolling(isScrolling);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <Disclosure as="nav" className={`fixed top-0 left-0 right-0 z-50 ${scrolling ? 'bg-[#AC861B] shadow-md' : 'bg-transparent'}`}>
//       {({ open }) => (
//         <>
//           <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-28">
//               <div className="flex-shrink-0">
//                 <Image
//                   className="h-12 w-auto"
//                   src="/images/hdplogo.png"
//                   alt="RCCG His Dwelling Place"
//                   width={100}
//                   height={100}
//                 />
//               </div>
//               <div className="hidden sm:flex items-center space-x-4">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className={classNames(
//                       'font-semibold',
//                       scrolling ? 'text-[#061956] hover:text-green-500' : 'text-white hover:text-[#061956]',
//                       'px-3 py-2 rounded-md text-sm'
//                     )}
//                     aria-current={item.current ? 'page' : undefined}
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//               <div className="flex items-center space-x-4">
//               <Link href="/give" passHref>
//                 <button
//                   type="button"
//                   className={`block w-full text-left px-4 py-2 rounded-md ${
//                     scrolling ? 'bg-green-500 text-white' : 'bg-[#98CE2F] text-white'
//                   } hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white`}
//                 >
//                   Give
//                 </button>
//               </Link>
//                 <div className="sm:hidden">
//                   <Disclosure.Button className="text-gray-400 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                     {open ? (
//                       <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//                     )}
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className={classNames(
//                     'font-semibold',
//                     scrolling ? 'text-[#061956] hover:text-green-500' : 'text-white hover:text-[#7FB000]',
//                     'block px-3 py-2 rounded-md text-base'
//                   )}
//                   aria-current={item.current ? 'page' : undefined}
//                 >
//                   {item.name}
//                 </a>
//               ))}
//                  <Link href="/give" passHref>
//                   <button
//                       type="button"
//                       className={`block w-full text-left px-4 py-2 rounded-md ${
//                         scrolling ? 'bg-green-500 text-white' : 'bg-[#98CE2F] text-white'
//                       } hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white`}
//                     >
//                       Give
//                   </button>
//                 </Link>
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }


"use client"

import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Program and Events', href: '/program-events', current: false },
  { name: 'Who we are', href: '/who-we-are', current: false },
  { name: 'Contact us', href: '/contact-us', current: false },
  { name: 'Gallery', href: '/gallery', current: false },
  { name: 'Blogs and updates', href: '/blog-updates', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/images/hdplogo.png');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isScrolling = scrollTop > 50;
      setScrolling(isScrolling);
      setLogoSrc(isScrolling ? '/images/hdplogoinv.png' : '/images/hdplogo.png');
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Disclosure as="nav" className={`fixed top-0 left-0 right-0 z-50 ${scrolling ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-28">
              <div className="flex-shrink-0">
                <Image
                  className="h-12 w-auto"
                  src={logoSrc}
                  alt="RCCG His Dwelling Place"
                  width={100}
                  height={100}
                />
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      'font-semibold',
                      scrolling ? 'text-[#061956] hover:text-green-500' : 'text-white hover:text-[#061956]',
                      'px-3 py-2 rounded-md text-sm'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/give" passHref>
                  <button
                    type="button"
                    className={`block w-full text-left px-4 py-2 rounded-md ${
                      scrolling ? 'bg-green-500 text-white' : 'bg-[#98CE2F] text-white'
                    } hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white`}
                  >
                    Give
                  </button>
                </Link>
                <div className="sm:hidden">
                  <Disclosure.Button className="text-gray-400 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className={`sm:hidden ${open ? 'bg-white' : ''}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    'font-semibold',
                    scrolling ? 'text-[#061956] hover:text-green-500' : 'text-[#061956] hover:text-[#7FB000]',
                    'block px-3 py-2 rounded-md text-base'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
              <Link href="/give" passHref>
                <button
                  type="button"
                  className={`block w-full text-left px-4 py-2 rounded-md ${
                    scrolling ? 'bg-green-500 text-white' : 'bg-[#98CE2F] text-white'
                  } hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white`}
                >
                  Give
                </button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
