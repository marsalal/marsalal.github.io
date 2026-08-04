import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { publishedPosts } from '../utils/content';

export async function GET(context) {
  const posts = publishedPosts(await getCollection('blog'));
  return rss({
    title: 'Marco Salazar — Writing',
    description: 'Software engineering, leadership, and lessons learned along the way.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/post/${post.id}/`,
    })),
  });
}
