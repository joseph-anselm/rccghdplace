// sanity.js
import { createClient } from "@sanity/client"
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'actqvavr',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-05-12', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

export const fetchLatestBlogs = async () => {
  const query = `*[_type == "blog"] | order(_createdAt desc)[0...6] {
    _id,
    title,
    slug
  }`;
  const blogs = await client.fetch(query);
  return blogs;
};
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;