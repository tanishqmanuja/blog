import { POSTS_PER_PAGE } from "@/config";
import { getCollection, type CollectionEntry } from "astro:content";
import { slugifyAll } from "./slugify";

export function isPublishable(post: CollectionEntry<"blog">) {
  return !post.data.draft;
}

export function isFeatured(post: CollectionEntry<"blog">) {
  return post.data.featured;
}

export function sortByDate(
  a: CollectionEntry<"blog">,
  b: CollectionEntry<"blog">,
) {
  return (
    Math.floor(new Date(b.data.date).getTime() / 1000) -
    Math.floor(new Date(a.data.date).getTime() / 1000)
  );
}

export async function getTotalPageCount() {
  const posts = await getCollection("blog");
  return Math.ceil(posts.length / POSTS_PER_PAGE);
}

export function getPostsByTag(posts: CollectionEntry<"blog">[], tag: string) {
  return posts.filter(post => slugifyAll(post.data.tags).includes(tag));
}
