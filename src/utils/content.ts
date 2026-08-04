import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const publishedPosts = (posts: BlogPost[]) =>
  posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const readingTime = (body = '') => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
};

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

export const tagSlug = (tag: string) =>
  tag.toLowerCase() === 'c#'
    ? 'c-sharp'
    : tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const allTags = (posts: BlogPost[]) =>
  [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b));
