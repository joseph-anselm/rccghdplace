import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { client } from '@/sanityClient';
import Image from 'next/image';
import BlockContent from '@sanity/block-content-to-react';

const SingleBlogPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        const query = `*[_type == "blog" && slug.current == $slug][0]{
          title,
          slug,
          publishedAt,
          mainImage{
            asset->{
              url
            }
          },
          body,
          author->{
            name,
            image{
              asset->{
                url
              }
            }
          }
        }`;
        const data = await client.fetch(query, { slug });
        setBlog(data);
      };
      fetchBlog();
    }
  }, [slug]);

  if (!blog) return <div>Loading...</div>;

  return (
    <section className="bg-gray-100 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">{blog.title}</h1>
        {blog.mainImage && (
          <div className="w-full h-64 relative mb-4">
            <Image
              src={blog.mainImage.asset.url}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        {blog.author && (
          <div className="mb-4">
            <p className="text-gray-600">
              By <strong>{blog.author.name}</strong>
            </p>
            {blog.author.image && (
              <div className="w-16 h-16 relative">
                <Image
                  src={blog.author.image.asset.url}
                  alt={blog.author.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        )}
        <div className="prose">
          <BlockContent blocks={blog.body} />
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
