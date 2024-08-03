// pages/blog/[slug].js
import React from 'react';
import { useRouter } from 'next/router';
import { client } from '@/sanityClient';
import BlockContent from '@sanity/block-content-to-react';

const SingleBlogPage = ({ blog }) => {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-gray-100 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 mt-8">{blog.title}</h1>
        <div className="mb-6">
          <img src={blog.mainImage.asset.url} alt={blog.title} className="w-full h-auto rounded" />
        </div>
        <div className="prose lg:prose-xl">
          <BlockContent blocks={blog.body} />
        </div>
      </div>
    </section>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "blog"]{ "slug": slug.current }`;
  const blogs = await client.fetch(query);

  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    mainImage{
      asset->{
        url
      }
    },
    body
  }`;
  const blog = await client.fetch(query, { slug });

  return {
    props: { blog },
  };
}

export default SingleBlogPage;
