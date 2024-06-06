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
  token: 'sk0k4DpUxCCjZ805cAxrATabBCsb3wvySS4WdfBzFVxo4GXG0XoAxS7Lme0N4MoVX210y5UJwkFfpbFWGQJoq0k8LrUjxzGNHkc7sAD0HwMNvtgjybL5Vfo5rKexfRJf3CqJiRhI0CuLa8pzRDC9xKrir05XJymoC56A5JnpdaoXHdTA3SeB',
  ignoreBrowserTokenWarning: true
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