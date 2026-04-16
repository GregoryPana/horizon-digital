import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'rnod6h69', // Must match the studio project ID
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-04-16', // use a UTC date string
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
