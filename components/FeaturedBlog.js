import React from 'react';
import Link from 'next/link';

const FeaturedBlogCard = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={`https://source.unsplash.com/800x600/?blog,${index}`}
                alt={`Blog ${index}`}
                className="w-full h-48 object-cover rounded"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Blog Title</h3>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link href="/blog" legacyBehavior>
                  <a className="text-blue-500 hover:underline">Read More...</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className='text-right mt-5'>
        <Link href="/blog" legacyBehavior>
                  <a className="text-blue-500 hover:underline">View More&gt;&gt;&gt;</a>
                </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogCard;
